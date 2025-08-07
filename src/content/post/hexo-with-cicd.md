---
title: "使用 CI/CD 自動部署 Hexo"
pubDate: 2023-07-23 01:30:58
heroImage: "/hexo-cicd-result.png"
tags:
  - CI/CD
  - Hexo
---

## 前言

最近在研究關於 CI/CD 的操作，突然想到自己也會把 blog 的 source 等等推上 git
既然如此，就來研究一下要怎麼使用 CI/CD 自動化部署 Hexo 好了，順便練一下 CI/CD 的使用

另外順便提一下，大概在這一兩年，GitHub Pages 也將網站更新做成 CI/CD 的自動化部署了
我也是在做完 source repo 的 CI/CD 才注意到這件事

> 雖然在寫 Hexo 文章前就來寫自動化部署有點怪，但是 Hexo 相關的文章好長不想寫QQ

## CI/CD 是什麼

在講解 CI/CD 之前，先來簡單了解 DevOps

通常開發（Development）與維運（Operations）之間會因為立場不同造成意見上的衝突
而 DevOps 的概念辨識為了讓整體開發工作能夠同時堅固速度與品質，所產生的一套自動化方式
CI/CD 工具也是為了此概念而產生的，透過兩邊人員的溝通以及合作，將測試以及部署的流程自動化
使得開發人員在開發階段便能偵測到問題，並且在通過測試後直接部署到伺服器上

說回 CI/CD，CI/CD 是由兩部分組成的：`持續整合 Continuous Integration` 以及 `持續部署 Continuous Deployment`
顧名思義，持續整合（Continuous Integration, CI）即是當開發人員完成一個階段性的程式碼後，便交由自動化工具測試、偵錯，並且建置出即將部署的版本
而持續部署（Continuous Deployment, CD）則是 CI 的下個階段，在當前程式碼版本經過 CI 的驗證以及建構後，再藉由 CD 工具部署上伺服器

## GitHub Action

市面上常見的 CI/CD 工具有以下幾種

1. GitHub Action
   由 Git Server 網站 GitHub 提供的 CI/CD 服務，與 GitHub 本身整合能夠輕鬆的達成版控以及自動化部署
2. GitLab CI/CD Pipeline
   由同為 Git Server 的 GitLab 提供的 CI/CD 工具，也是與 GitLab 自身整合，輕鬆達成版控和自動化佈署
3. Anthos
   Anthos 是由 Google 提供的工具，其特點是能迅速的部署混合雲架構和跨雲管理平台
   若是有許多雲平台需要維護，可使用 Anthos 減少於不同平台 deploy 時所需要的調整

因為我的 source repo 以及網站分別放在 GitHub 以及 GitHub Pages 上，這邊我是選擇使用 GitHub Action 作為我的 CI/CD 工具

> 我知道 source 以及 GitHub Pages 可以放在同一個 repo 不同 branch 中，不過寫 blog 的這幾年中都是分開放，用到現在也習慣了有點懶得改 blog 的 config，所以這邊都還是放在不同的 repo 中

## 設定 CI/CD

### 準備 ssh key

我們的網站在 deploy 時，會將資料 push 上 GitHub Pages 所在的 repo 上，而現在 GitHub 不開放使用 http remote
而且你也不想把 GitHub 帳密直接存在 repo 中，也不能每次跑 CI/CD 都敲一次密碼（這樣我們做 CI/CD 就沒意義了XD
因此這邊要改成用 ssh remote，同時準備一組 ssh key 讓他們之間可以連線

```sh
ssh-keygen -t rsa -C "<your email>" -f deploy
```

Enter passpharase 留空跳過就好

之後就會產生兩個檔案 `deploy.pub` 以及 `deploy`，分別為公鑰以及私鑰

### 將 ssh key 放上 GitHub

首先我們先將 GitHub Pages 的 repo 放上公鑰
路徑如下：Settings > Deploy keys > Add deploy key
Title 留你喜歡的就好
Key 的部分就是把公鑰 deploy.pub 裡面的內容貼過來
記得下面的 `Allow write access` 要打勾，不然等等 Hexo 要 push 網站進來時會吃到 permission denied

![](/pub_key.png)

然後再去 source repo 放私鑰
路徑如下：Settings > Secrets and variables > Actions > New repository secret
Name 的部分也是留喜歡的就好，這邊是以目前這個網站（Coder MiohitoKiri）為範例，所以留 `CODE_SEC`
Secret 也是把私鑰 deploy 貼上來

![](/sec_key.png)

### 設定 GitHub Action

![](/action-default.png)

到 source repo 那邊點 Actions，並且點下面的 set up a workflow yourself

然後這邊是我的 CI/CD 設定，可以直接複製貼上
不過要注意最後一行的 `CODE-SEC` 要替換成你設定的私鑰名稱，以及第二大項的觸發條件，要改成你的 branch 名稱

> 因為我兩個 blog source 是放在同一個 repo 不同 branch，有不同的設定，兩個網站的 CI/CD 沒有寫在一起
> 有空再來把他們整合起來

```yml
name: Auto Deploy to GitHub Pages

on:
  push:
    branches: ["mio"]
  pull_request:
    branches: ["mio"]

  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set Time Zone
        run: sudo timedatectl set-timezone 'Asia/Taipei'

      - name: Add GitHub into ssh_known
        run: |
          mkdir -p ~/.ssh
          ssh-keyscan github.com >> ~/.ssh/known_hosts

      - name: Node.js Setup
        uses: actions/setup-node@v2
        with:
          node-version: "13.0.0"
          cache: "npm"

      - name: Node.js Package install
        run: npm i -g hexo-cli && npm i

      - name: Deploy
        uses: sma11black/hexo-action@v1.0.3
        with:
          deploy_key: ${{ secrets.CODE_SEC }}
```

簡單講解一下步驟：

1. 將專案 checkout 下來
2. 設定 Timezone
   這些流程都會在 container 上執行，而這些 container 都在國外，為了避免文章日期因為時差跑掉跑掉，這邊把 time zone 設定回 Asia/Taipei
3. 將 ssh key 加入目前這個 container 中
4. 設定 Node.js 環境
   我的套件都還沒更新上去（每次更新都多一堆坑要補，後來懶了就都不更新了），所以這邊要將 Node.js 的版本設定回 13.0.0
5. 安裝套件
6. 部署網站
   網站這邊我是用別人寫好的 action 腳本，只要提供私鑰給他就好了

![](/cicd-running.png)

然後就是把文章 push 上去，觸發 CI/CD 看他執行啦
