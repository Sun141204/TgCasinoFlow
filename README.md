# BaccaratFlow Automation Framework 🎲

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()  
[![License](https://img.shields.io/badge/license-MIT-blue)]()

---

## Table of Contents
- [Objective](#objective)  
- [Project Overview](#project-overview)  
- [Requirements](#requirements)  
- [Folder Structure](#folder-structure)  
- [Setup Instructions](#setup-instructions)  
- [Environment Configuration](#environment-configuration)  
- [Test Flow](#test-flow)  
- [Running the Tests](#running-the-tests)  
- [Validations & Expected Results](#validations--expected-results)  
- [Notes & Best Practices](#notes--best-practices)  

---

## Objective
The purpose of this project is to demonstrate the ability to:  

- Understand a **basic test flow** for TG Baccarat  
- Automate the flow using **Playwright (TypeScript)**  
- Utilize **environment variables and configuration** effectively  
- Write **clear, maintainable test code** with proper documentation  

---

## Project Overview
This framework automates a Baccarat betting flow on [TG999 VIP](https://tg999.vip/) including:  

1. Login with a test member account  
2. Enter a Baccarat table using `TABLE_ID` and `GROUP_ID`  
3. Place a bet on the **Banker** side with a specified amount  
4. Handle table availability and retry logic when betting is closed  

A **watcher helper** continuously monitors tables to ensure safe betting.

---

## Requirements
- Node.js >= 18  
- Playwright >= 1.45  
- TypeScript >= 5.0  

**Test credentials:**  

---

## Setup Instructions
1. Clone the repository:
```bash
git clone https://github.com/<your-username>/BaccaratFlow.git
cd BaccaratFlow
2. Install Dependencies
npm install
3. Install Playwright browser
npx playwright install


