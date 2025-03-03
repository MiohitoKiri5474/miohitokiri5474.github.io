---
title: "ITGZ USB4 硬碟盒使用心得"
pubDate: 2024-05-14 19:38:18
heroImage: "https://cdn.thewirecutter.com/wp-content/media/2024/04/mechanicalkeyboards-2048px-1353-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp"
tags:
  - SSD
draft: true
---

## 為什麼不升級 SSD 容量

去年年底隨著 M4 mini 發售，終於跟上 Apple Silicon 這班車
雖然手邊的 2020 Intel i5 MBP 還算堪用，但蠻多時候明顯感覺得到效能已經不夠用了
像是我平常工作用 NeoVim 開大概 200 行左右的程式，在上下滾頁面時明顯感覺得到 lag
（這個我猜應該是我掛太多套件了，使用 LSP 相關功能的時候被卡住
或是背景開一兩台 VM 做測試時也會有點卡
更不用說同時開複數 electron base 的應用程式（Spotify, Discord 等等）也會有明顯的卡頓感
因此看到 M4 mini 這麼高 CP 值，也跟著訂了一台

⋯⋯但那精美的 SSD 升級價格是真的捏不下去
所以在下訂的時候就已經決定要外接 SSD 來存資料了
畢竟就算買 Samsung T7 1TB 也才 5000 左右，花 7000 才升到 512GB 實在不划算
反正我也沒有剪片等需要高讀寫場景的需求，所以就決定要用外接硬碟解決容量不夠的問題

## SSD 選擇

不過就在物色 SSD 的時候，發現多數 SSD 的速度都到讀寫1000 MB/s
雖然是說不用多快，但還是希望可以到至少 2500 MB/s，於是開始把歪腦筋動上 PCIe 外接盒
做了點研究後，大概有以下整理

1. USB 3 的外接盒/SSD 在 M4 mini 上只能跑到 10Gbps，這邊直接淘汰
2. USB4 極限可以達到 40Gbps 的傳輸速度（其中 PCIe 可到 32Gbps

基於以上理由，最後決定買 USB4 的外接盒，並搭配 PCIe Gen4 x4 M.2 2280 的 SSD

不過 USB4 + PCIe Gen4 x4 這個組合的發熱量較高，因此多數廠商都有主動散熱
⋯⋯除了我手上這款 ITGZ 的，因為是最早發售的產品，廠商可能低估了發熱量因此沒有加上主動散熱
不過在看完網路上的橫評影片，發現主動散熱的作用有些雞肋，還不如自己土炮貼散熱器或是拿電風扇對著吹
因此最後買了最便宜的 ITGZ，速度雖然稍低了一點也沒有主動散熱
但也能達到至少 2500 MB/s 的讀寫速度，夠用了
除了鋁合金製的盒子本體以外，還有一條 USB4 的線、10 個小散熱貼、對應的螺絲、一個小螺絲起子

SSD 則是選擇 ADATA LEGEND 900 1TB，ADATA 官網說裝在主板上可到讀 7000 MB/s 寫 5400 MB/s
本來在想說要不要買 Gen 3 的 SSD 就好，想說外接而已也跑不滿 Gen 4 的速度
但看到價格只差 200 塊，好像沒有不買 Gen4 的理由XD

## 安裝過程

SSD 安裝過程還蠻簡單的，將 SSD 插入後將相對應的螺絲鎖上
貼完導熱貼後蓋上蓋子，鎖完螺絲後就能插上使用了
（建議貼上導熱貼，雖然這樣會讓外接盒變得有點燙手，不過這樣代表有將 SSD 的發熱引導到外殼上散熱
（注意這邊要將 SSD 插在 M4 mini 後的 type-c 才能跑到 USB4 的速度

拿到手份量還挺足的，實測跑分能達到讀寫 3000 MB/s，略高於丐版的讀 2900 MB/s 寫 2800 MB/s
所以便決定試著將這個外接 SSD 當系統碟來使用
製作過程也蠻簡單的，沒有像是其他教學上面寫的那麼麻煩
只要先將硬碟格式化成 APFS 格式後，在關機狀態下長按開機鍵直到出現蘋果 Logo 進入 Recover Mode
並在 Recover Mode 中選擇重新安裝 macOS，並將安裝位置選為外接硬碟，等下載 + 重新安裝就好了
整個過程大概一個半小時，安裝完重新開機就會用外接 SSD 開機了，後面的設定步驟和拿到一台新 Mac 一樣
同時可以直接在設定中，將內建 SSD 的設定直接複製到外接 SSD 中
這邊就能感受到 3000 MB/s 的威力了，大概用了 180GB 的 SSD 可以在十分鐘內複製 + 設置完畢

唯一美中不足的是無法使用 Apple Intelligence，雖然也有看到其他人在使用外接 SSD 的系統中成功使用 Apple Intelligence，至少我不行
不確定是設定或是相容性問題，但目前也沒有使用 Apple Intelligence 的需求，暫時先不處理了

最後提一下散熱，沒有主動散熱導致外接盒有一點燙手，我自己的使用上覺得高於體溫、可能大概 40 出頭度左右
手邊沒有紅外線溫度計沒辦法測量，但跟我家電子熱水器設定 42 度的熱水比較起來沒有燙多少
如果對於有疑慮得話這邊有三種方法

1. 土炮加散熱器，看要拆舊電腦的塔散 + 散熱膏或是直接去電子材料行買散熱鰭片貼都可以
2. 拿電風扇對著吹
3. 購買主動散熱款

我自己是直接把外接盒丟在 M4 mini 上，用它的外殼幫助散熱
效果還不錯，比較之下溫度從原本使用時的 51 度下降到 46 度，即便拿來打遊戲也沒有高於 55 度過（用 iStat 監測
雖然我玩的遊戲都不怎麼吃效能就是了XD
但考慮到現在是冬天，可能到夏天溫度會更高
如果夏天太熱的話考慮去電子材料行買個幾個散熱鰭片來貼
或是自己嘗試用 3D 列印搞一個架子 + 靜音 USB 風扇來自製散熱系統

大概就這樣，雖然沒辦法比不上 Mac 完全體內建的 SSD，但也比丐版略快一些
更重要的是在同樣 7000 塊錢的價格上創造出更多的空間，同樣的價格用外接的方式可以購買到 2TB 的大小
反正 M4 mini 基本上都是在定點使用，多掛顆 SSD 也不造成什麼影響
