---
title: "自組 NAS 踩坑 & 紀錄 part 2"
pubDate: 2026-06-27 12:00:00
heroImage: "/IMG_9739.jpeg"
---

## 一個不小心就冨奸了

現在看一下上一篇是 2025 年九月的事了，拖這麼久窩痕抱歉

本來上一篇說要記錄一下自架了哪些服務，不過最重要的應該只有自架 DNS 而已
其他我比較常用的只有用 lanraragi 看漫畫 & JellyFin 看影片

而且本來說想要自己弄的 GitLab 也因為弄起來太麻煩，就算換成 Gitee 也不算簡單
最後還是回去繼續用 GitHub private repo，反正現在個人用戶也能用

所以這篇應該會是心得性質，主要大概講一下我拿這台小主機做了什麼 & 有什麼感想

## 所以我到底拿來做什麼用

最主要也是我上一篇有提到的，想要有一個 NAS 來備份我的筆電
不過也受限於成本和機器的限制，我只有掛一顆 2TB HDD，沒有做任何的 Raid 或是 ZFS pool 之類的冗餘
因此我還是每個週末會拿外接硬碟備份一次，如果哪天我不小心把 M720q 搞爆了還能加減救一下

再來就是我拿來當 GitHub Actions 的 runner，拿來編譯跟幾個朋友們一起經營的網站 [Guildmages' Forum](https://guildmagesforum.tw/)
還有為了方便其他人操作，寫了一個簡單的發文 bot，收到指令後會自動下載對應的 Hackmd 文章，做完簡單的檢查沒問題後將文章推上 GitHub，由 GitHub Actions 接手後續的編譯和部署

另外我從櫃子裡翻出一台不知道什麼時候搞來的 RasPi 2B，加上今年四月左右手癢買的 NanoPi Zero 2 組了簡單的 k3s cluster 練練手
將一些 docker 服務如 [glance](https://github.com/glanceapp/glance) 和 [beszel](https://github.com/henrygd/beszel) 還有自己寫的 bot 掛上去 cluster 中，如果某個節點掛了會自動把這些服務掛去其他節點上

最後就是當作跑作業測試的好東西，自從我換成 M4 Macbook Pro 之後，總是會被平台困擾
有些作業明說了會在 x86_64 的 Linux 下測試，但在 Arm 平台上跑的 x86_64 虛擬機效能超級差，有時候跑個作業幾個小時就不見了
這時候連線回家，把這些作業丟在 M720q 上面跑真的很舒服，雖然效能沒有 M4 Macbook Pro 好，但少掉轉譯損失還是快上不少
同時定點丟在家裡跑，就算我需要移動也不用遷就於正在執行的作業

## 不小心賺了點錢

這件事情是我完全沒想到的
起因是在我入手 M720q 之後一兩個月時，因為覺得只有一條 ram 不能跑雙通道有點阿雜，於是手癢又買了條 16GB 的二手 ram 跑雙通道
結果賣家當時不知道怎麼搞的，寄了兩條 ram 給我，而且我當時是點 2666 MHz SO-DIMM 的 DDR4 記憶體，賣家寄了一條 3200 MHz 和一條 3400 MHz 的給我，還有兩條 DDR3 的記憶體當包材
後來過了一陣子記憶體暴漲，就連二手的 SO-DIMM DDR4 也暴漲，後來把多的那一條賣給學弟，除了小賺了一點還多拿到免費的 ram

## 到底自架了哪些服務

主要自架的服務有這些：
 - [Pi-Hole](https://pi-hole.net/)
 - [Glance](https://github.com/glanceapp/glance)
 - [JellyFin](https://jellyfin.org/)
 - [LANraragi](https://github.com/Difegue/LANraragi)
 - [Beszel](https://beszel.dev/)
 - [qBittorrent](https://www.qbittorrent.org/)
 - [Immich](https://immich.app/)
 - Samba disk sharing

其中 JellyFin, LANraragi, qBittorrent 就是單純使用它們內建的服務（懂的都懂
最常用的是 Pi-Hole 這個自架 DNS，搭配 unbound 阻絕網站和 DNS 紀錄
使用起來明顯的感受到廣告少很多，同時少了瀏覽記錄在 FB 之類的擋不掉廣告的地方，也能明顯的感受到它們少了很多資料來源
Immich 則是備份我手機的相簿，雖然有買 iCloud 的儲存空間，在那邊已經有一份備份了，但有個自己本地端的離線備份一定還是比較好
Beszel 是我最喜歡的系統監視頁面，可以輕易的監控各個機器的狀態（loading, hardware usage, temperature etc.

最後是 Samba disk sharing，沒有裝 OMV 之類的 NAS 服務，主要是 M720q 只能掛一顆 2.5 寸硬碟，最一開始沒有想到要把手邊閒置的外接硬碟也接上去一起用，所以只有搞最簡易的 Samba 將硬碟分享出去給我的 MacBook Pro Time Machine 備份，還有存一些不常用的大檔案

## 使用心得

就像之前可能（？）有提到的，有一台 7/24 的 server 方便在於有些需要跑一陣子的東西可以掛著，不用像是筆電受限於電量焦慮、準備移動了又不想中斷當前進度等問題
即便效能差了點但還是方便，除非有時間緊急的任務不然很多重 loading 的工作我也都丟在 M720q 上跑了
同時也有個可以亂玩整活的環境，不用怕不小心把主力機搞爆了沒東西能用

最後是前一篇有提到的，無腦備份真的好舒服，回家只要接上網路、時間到了就會自動備份
每天也就十多分鐘頂多半小時的事情，雖然首次備份很辛苦但還是很方便，可以選個深夜時段丟著給他跑，例如我現在是在終端機用 crontab 設定每天晚上 11 點跑備份指令
還有人不在家也能用 ZeroTier 連線回去備份，雖然備份時間長的可憐（1Gbps 降級成 100Mbps，還要看當下連線的網路速度）但總比沒有好

## 對自己的 HomeLab 願景

因為開始 homblabbing 也看了不少教學影片，我開始有個對 homelab 的想像
首先是一台 8-bay 的 NAS 作為主要的存儲空間，平常所有系統的備份、影片等資料都存在這邊；裝 TrueNAS 跑 ZFS pool，並將硬碟分成兩組，可能再掛個兩顆 SATA SSD 當作快取，然後定時重構

> 有個說法是 ZFS 用久了會因為資料碎片化的關係導致效能下降，定時重構可以解決這個問題
> 但感覺有一半的硬碟平常沒在用但卻插在主機上好像怪怪的

另外還有三台 M720q （或類似型號）跑 k3s/k8s cluster 或是 compute cluster，看到時候的狀況再決定
最後一台 1L 小主機跑 pfsense 軟路由，並考慮搞個 2.5Gbps 的內網
剩下的單版小主機當輕量服務的備援，像是我就覺得 Raspberry Pi 當作遠端備援挺不錯的，Raspberry Pi Connect 這個獨立於 ZeroTier/Tailscale 的連接方式

> 像是撰文的當下，想要連線回去看為啥 M720q 的 CPU usage 一直都偏高（大概 20% 上下，但平時應該只會在 5% 到 10% 之間浮動
> 結果發現 ZeroTier 不知道為啥掛了連不上，就只好用 Raspberry Pi Connect 連回家裡內網，再從 RasPi 2B 連線回去

大概就先這樣吧，文章完成的當下還是期末週，iPad 沒電了正在充電，抽空檔偷懶寫一下文章 :p
