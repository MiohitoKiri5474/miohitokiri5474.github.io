---
title: "所有 Mac user 都應該要裝的小工具們"
pubDate: 2025-12-10 12:00:00
heroImage: "/Mac-plugins/cover.jpg"
---

## 近況

大概四個月前搞了台 Lendovo M720Q 架起 homelab 來，也寫了兩篇踩坑紀錄，而且收尾在準備架服務的地方
過了這麼久肯定是要寫 part 2 來架服務了吧
⋯⋯嗎？
後來因為事情太多太忙，沒空仔細記錄每個服務的架設與設定，而且中間搞爆其中幾個服務，又修修補補調整設定
到現在我也不知道該從何寫起了，所以就發懶到現在 :p

不過剛剛（撰文當下是 Dec 9th 11:00 左右），偶然發現 Boring Notch 這個好用的插件，想了一下好像也能分享一下我很喜歡的插件們
特別是今年七月換 M4 MBP 之後新增了一些插件，還有付費支持一下寫這些插件的作者，不然有些插件我都當蠻久的免費仔了

> 像是 Maccy 我在他剛出來的時候就在用，後來作者都關掉 beta 載點、完整版也上 App Store 了，我都還是從備份中把這東西拉出來用，連當初 M4 mini 上也都是都在用舊架構版本 XD

這些插件都是我使用很久、或是一用就覺得應該會長久使用的插件們

## Maccy

![](/Mac-plugins/Maccy.jpg)

既然都提到 Maccy 了，乾脆從他開始吧XD

Maccy 是一個在 macOS 上的剪貼簿插件，忘記當初是誰告訴有這個小工具的，印象中應該是從高中就開始用到現在
剪貼簿方便的部分在於有複數段落需要複製貼上，或者像是我平常在執行測試時有不同的測資需要輸入測試
這時候有剪貼簿就很方便了，不用在不同來源不斷切換，可以按個快捷鍵叫出剪貼簿後直接選取
同時 Maccy 也支援搜尋功能可以快速找到對應的已複製內容，除了關鍵字查詢以外也支援模糊查詢和正則表達式
其他常見的剪貼簿功能 Maccy 也支援，像是 black list、保留/移除格式等等功能
如果複製的內容是檔案也會記錄在剪貼簿中，這些功能如果不想啟用也能個別關閉

## Boring Notch

![](/Mac-plugins/BoringNotch-NowPlaying.jpg)

Borning Notch 是我近期的新寵兒，不如說就是因為太喜歡了才跑來寫這個文章（？
其中我最喜歡的是有提供當前的播放動態，身為一個工作時幾乎音樂不離耳（？）的人，能抬頭看到現在正在播放的音樂非常棒

![](/Mac-plugins/BoringNotch-temp.jpg)

另一個功能是檔案的暫存區，有時候想要將檔案拖拉到另一個位置，可以先放到這邊暫存，開啟對應的位置後再把檔案拖過去
像是過去我截完圖想要發給朋友，都需要很彆扭的按著滑鼠或觸控板，另一隻手按 fn + F11 的組合（我的 F11 是音量調整）相當的不方便，雖然放到暫存區需要多一個步驟，但也比我用彆扭的按鍵強

> 不過我有發現如果有開啟播放動態的話 MBP 的 ProMotion 好像會長期在高刷新率上，至少我怎麼看都是 110Hz 起跳，有可能會讓續航下降，觀察幾天後再決定要不要繼續開啟這功能
> 平常充電到 80% 可以用 8hr 多，但剛剛發現預測只有 6hr 左右，不知道是不是這個原因
> 也有可能是我現在 Spotify 都是開無損音質導致 CPU 使用率較高比較耗電

## iStat Menus

![](/Mac-plugins/iStat-Menus.jpg)

iStat Menus 也是我用非常久的插件之一，但有段時間因為 Menu Bar 太擠變沒繼續用
不過在開始用 [Bartender 類插件](https://www.macbartender.com/Bartender5/) 後便回來使用了，同時也付費買了 iStat Menu 5 今年也升級成 v7，中間 v6 覺得沒什麼特別的功能沒升級
⋯⋯至於為啥升成 v7 我也忘了，不排除是被比較刺眼的 UI 弄瞎眼睛，等視力恢復之後已經收到刷卡帳單了

> 後來想起來了，因為 v5 不支援 Apple Silicon 的感測器顯示，所以 CPU 溫度、風扇轉速等等之前比較在意的功能無法使用

這個插件功能就比較基本了，用一句話概括的話可以說這個插件是用來顯示系統狀態的，還有可以設定風扇曲線
至於要顯示什麼就看每個人自己的設定，像是我只有簡單顯示 CPU & GPU & 電池用量
另外有額外的天氣付費功能，不過我平常也不會用筆電看天氣就當作沒這件事了

## AeroSpace

![](/Mac-plugins/AeroSpace.jpg)

AeroSpace 是我用了一陣子的 window manager，可以自行設定很多快捷鍵來調整視窗
不過這個東西比較 nerdy，嚴格來說有點偏離這篇文章的主題

Window manager 算是一個我一直都很想嘗試但最後都不了了之的東西，之前還在用 Ubuntu Desktop 的時候不敢自己亂搞，用 ArchLinux 的時候則是想說這台也是借用一兩個月，不想花太多心力搞
而換用 macOS 之後好像也沒有特別好用的 window manager
直到遇上 AeroSpace，用一陣子之後愛不釋手，現在完全離不開沒有 AeroSpace 的狀況了，有時候為了玩遊戲關掉，回來後還會不習慣XD

詳細的教學可以參考 Josean Martinez 的影片，我的設定基本上跟他的差不多，也可以參考 [我的 config file](https://github.com/MiohitoKiri5474/.dotfiles/blob/main/aerospace/.config/aerospace/aerospace.toml)

<iframe class="yt-video" src="https://www.youtube.com/embed/-FoWClVHG5g?si=40KU6hBN6bVlQLUq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />

## Ice

![](/Mac-plugins/Ice.jpg)

Ice 是一個可以收起 Menu Bar 上過多 icon 的插件，最初是使用開源的 [hiddenbar](https://github.com/dwarvesf/hidden)
不過 hidden bar 只能在 Menu Bar 上展開，本來都還算夠用，不過自從我換 M4 MBP 多了瀏海會擋住 Menu Bar 後，我只能換去 [Bartender 5](https://www.macbartender.com/Bartender5/) 了
Bartender 5 支援彈出框顯示收合的 icon，用得很舒服錢也付了，結果在我升級成 macOS Tahoe 後卡到一個爆炸，完全沒法用，最後只能改用開源的 [Ice](https://github.com/jordanbaird/Ice)
只能說當時功課做不夠多啊，如果知道有開源的 Ice 就直接用了，哪需要 Bartender 花錢受罪 = =

## 結語

常用的應該就這些了，其他還有在用的東西如 Ghostty, happerspoon 我覺得太 nerdy 了，沒有特別的理由可能都用不到

這篇文章就這樣，如果有什麼好用的小工具也歡迎留言討論（？