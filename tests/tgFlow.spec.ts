import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';

dotenv.config();

const api = axios.create({
  timeout: 10000,
});

test.describe('TG Baccarat Automation Flow', () => {
  let accessToken: string;

  test('Full Baccarat flow: login → enter table → place bet', async () => {
    // --------------------
    // Step 1: Login
    // --------------------
    try {
      const loginResp = await api.post(
        'https://k8newaaap.com/kkr-games-orchestration-center/auth/login',
        {
          username: process.env.USERNAME,
          password: process.env.PASSWORD,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*',
            Origin: 'https://tg999.vip',
            Referer: 'https://tg999.vip/',
            Host: 'k8newaaap.com',
            MerchantCode: 'M76934',
            Currency: 'USD',
            'X-Time-Zone': 'UTC+6',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:143.0) Gecko/20100101 Firefox/143.0',
          },
        }
      );

      if (loginResp.status !== 200 || !loginResp.data?.token) {
        throw new Error('Login failed: no token returned.');
      }

      accessToken = loginResp.data.token;
      console.log(' Access Token:', accessToken);

      fs.writeFileSync('tokens.csv', `token\n${accessToken}\n`, { flag: 'w' });
    } catch (error: any) {
      console.error(' Login error:', error.response?.data || error.message);
      throw error;
    }

    // --------------------
    // Step 2: Ready Table List (Watcher Mock)
    // --------------------
    const readyTables = [
      {
        gameId: 5,
        placeId: 1,
        tableNo: 'DT807',
        currency: 'USD',
        group: 'default',
        sequence: 123456,
        remainMs: 17000,
        lastUpdateMs: 1000,
        status: 'StartBetting',
      },
    ];

    if (readyTables.length === 0) {
      console.log('No ready tables. Waiting 0.2s...');
      await new Promise((r) => setTimeout(r, 200));
    }

    const tableSelected = readyTables[0];

    if (
      tableSelected.status !== 'StartBetting' ||
      tableSelected.remainMs < 15000 ||
      tableSelected.lastUpdateMs > 2000
    ) {
      throw new Error('Selected table is not ready.');
    }

    // --------------------
    // Step 3: Enter Table
    // --------------------
    try {
      const enterResp = await api.post(
        'https://k8newaaap.com/kkr-games-orchestration-center/game/enterTable',
        {
          gameId: tableSelected.gameId,
          placeId: tableSelected.placeId,
          tableNo: tableSelected.tableNo,
          currency: tableSelected.currency,
          group: tableSelected.group,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      expect(enterResp.status).toBe(200);
      console.log(' Enter Table:', enterResp.data);
    } catch (error: any) {
      console.error(' Enter Table failed:', error.response?.data || error.message);
      throw error;
    }

    // --------------------
    // Step 4: Place Bet
    // --------------------
    try {
      const placeBetResp = await api.post(
        'https://k8newaaap.com/kkr-games-orchestration-center/game/placeBet',
        {
          tableNo: tableSelected.tableNo,
          sequence: tableSelected.sequence,
          bets: [{ side: 'Banker', amount: Number(process.env.BET_AMOUNT) }],
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      console.log('Place Bet response:', placeBetResp.data);

      if (placeBetResp.status === 200) {
        const betId = placeBetResp.data?.betId;
        expect(betId).toBeTruthy();
        console.log(' Bet placed successfully. Bet ID:', betId);
      } else if (
        ['BETTING_CLOSED', 'ROUND_CHANGED', 'INVALID_STATUS'].includes(
          placeBetResp.data?.error
        )
      ) {
        console.log(' Betting closed/round changed, pick another table.');
      } else if (placeBetResp.data?.error === 'INSUFFICIENT_BALANCE') {
        console.log(' Insufficient balance, skip or top-up.');
      } else {
        console.log(' Unknown error, retry once or pick another table.');
      }
    } catch (error: any) {
      console.error(' Place Bet failed:', error.response?.data || error.message);
      throw error;
    }
  });
});






