---
title: "Mio's M4 Mac mini Environment Build"
pubDate: 2025-01-20 20:00:00
heroImage: "https://cdn.thewirecutter.com/wp-content/media/2024/04/mechanicalkeyboards-2048px-1353-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp"
---

## Why M4 Mac mini

不是說 14 吋 M4 Macbook Pro 不好，只是因為以下原因所以我沒有買 MBP：

1. 我在家主要是用外接螢幕，筆電螢幕太小了不實用
2. 除非沒有插座需要用電池電力，不然多數時候電池續航不是很大的問題
3. 螢幕色彩並不是一個很大的吸引力
4. 很貴，mio 錢錢

~~真的不是因為貴所以沒有買 M4 MBP 啦~~

基本上我就是看上 M4 這顆晶片的效能才購置新設備的，不然在這之前其實我的 MBP 都勉強堪用
之所以說是勉強，是因為有些我不好處理的小毛病

1. 用 NeoVim 滾動頁面時容易 lag，估計是 LSP 太重拖慢效能
2. 跑一些測試的時候真的很慢
3. 看影片畫質調到 2K 以上風扇就會開始爆轉
4. 簡單的 zsh 也要 loading 很久

其中 NeoVim 算是我可以解決的，推測應該是我裝太多插件所以運行效能低落，不過我已經用最快速的 plugin manager Lazy.nvim，也有好好設定 lazyload，能做的好像也不多
zsh 嚴格來說也是我可以處理的，但我已經用幾乎是最快的 zsh plugin manager (zinit) 了，也沒有裝一坨插件，只有裝最基礎的六七個 plugin，還會卡其實不太正常

最後是看到教育價只要 16400，於是我就決定要買了

這篇文章算是簡單記錄一下，有哪些套件是我必裝的
同時算是做個紀錄，過陣子有空應該也會把 MBP 洗掉重裝環境，幫它瘦身

## HomeBrew

HomeBrew 應該是我拿到一台新的 Mac 時候第一個會裝的套件
Mac 並沒有原生的 package manager，通常比較主流的 package manager 是 MacPorts 和 HomeBrew
按照我的觀察，HomeBrew 比較多人使用，我也是使用 HomeBrew
HomeBrew 主要的套件安裝方式有兩種，分別為 `formula` 和 `bottle`，其中 `formula` 指的是一系列指令，例如下載原始碼並編譯或是同時安裝 dependency 等等；而 `bottle` 則是下載別人已經編譯好的執行檔

從 [HomeBrew 官網](https://brew.sh/) 可以找到一行安裝指令，複製下來貼上 Terminal 執行就好了，過程中需要輸入密碼

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

後面就能使用 brew 來安裝各種套件了

## iTerm2

再來是下載一個比較好用——不對是好用很多——的 terminal emulator，畢竟內建 Terminal 真的太難用了嘔嘔嘔
選擇還蠻多的，比較主要的有
1. iTerm2
2. Alacritty
3. WezTerm

我自己是用 iTerm2，雖然 config 比較難帶，不過用來用去還是覺得 iTerm2 用起來最順手
可能是因為習慣用 tmux 切畫面了，懶得重新適應另一種方式
而且通常我的 iTerm2 都是掛在背景的，啟動速度對我來說不是一個很大的誘因

用 brew 安裝就好
```sh
brew install --cask iterm2
```

## Zsh

再來是設定 zsh，畢竟 zsh 原生介面無法有效的顯示一些資訊
我是看過蠻多人推薦 Starship 的，不過我自己是用 Oh My Posh

> 說個笑話，當初我就是覺得 Starship 看起來太空用起來沒 fu（當時我是用 powerlevel10k
> 最後自己設定的 Oh My Posh 卻是走極簡風，甚至比 Starship 還要極簡