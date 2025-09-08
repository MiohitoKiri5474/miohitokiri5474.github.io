---
title: "自組 NAS 踩坑 & 紀錄 part 0"
pubDate: 2025-09-08 12:00:00
heroImage: "https://img.alicdn.com/imgextra/i3/2209429052246/O1CN01qOl60L1SSiJlyI8Xj_!!2209429052246.jpg"
---

## 為什麼不是 Part 1？

之所以是 part 0 而不是 part 1，是因為我其實有一篇 part 1 已經開始動筆了，甚至只差一點就能發出去
不過因為剛開始建置，路上遇到一堆坑，所想說先寫篇文舒壓一下（？
有一些（呃搞不好是很多）細節如果我打算或已經寫在後面的文章裡就會直接跳過了

## 怎麼想不開？

不過還是想簡單提一下為什麼我會想搞 homelab，說到底都是因為一件再簡單不過的小事——我懶得拔備份用的外接硬碟線
呃對，因為我覺得每天出門前都要把電腦喚醒 -> 退出硬碟 -> 把 dock 拔掉這些操作很麻煩，所以我一直以來都很想搞個 homelab server 來當作遠端硬碟來用

> 補充一下，在 macOS 中有個內建的備份功能叫做 Time Machine，可以自己設定備份的頻率，像是我不需要那麼頻繁的備份所以是一天一次，只要隔了 24 小時沒有備份 & 備份裝置已連接的時候就會自動備份

之前因為還在用 Intel MBP 這個電子垃圾，即便每天備份也要有兩個小時起跳，有時候忘記了隔了好幾天甚至要放過夜才能完成，久而久之就懶得備份了
後來買了 M4 mini 並把備份用的硬碟掛載上去開分享給 MBP 做備份，雖然第一次備份還是拖的夭壽久，不過在這之後每天備份一次需要花的時間都不長，而且如果硬碟斷線了也不傷硬碟（至少不是突然斷電），發現這樣搞好像還不錯，後來把所有 Mac 都賣掉換 M4 MBP 之後有的想念以前舒服備份的時光
所以後來被一個 Pi5 + SATA hat 的影片燒到超級想自組 NAS，最後因緣際會下變成買了台 i5-8400 的小主機 M720Q，於是就染上了 homelabing 這個燒錢的興趣了

## 所以發生了什麼事？

既然是自己架的 server，第一個問題就是要裝什麼系統
本來我想要下意識的去裝 Proxmox VE，但想一下我的 CPU 也只是 i5-8500（6 核 6 線），真的要虛擬化開 docker 應該就夠了
於是決定裝普通的 Linux Distro 就好

### ArchLinux

![](https://linuxiac.com/wp-content/uploads/2020/06/archlinux.jpg)

首先當然是想裝 ArchLinux，雖然 rolling release 可能會不小心滾過頭把整個系統搞爛，不過我想說把資料儲存跟系統/服務分開，另外單獨備份系統和服務，如果不小心滾壞了就拿備份蓋回去之類的
一開始的設定都蠻方便的，而且現在 ArchLinux 也有自己的簡易 installer 不用自己敲一堆設定，雖然這樣做很不 Arch 但窩就懶（
本來都用的很舒服（雖然中間搞爆系統過重裝了一次），但就在我打算裝 GitLab 的時候頻頻碰壁，各種爬文重新設定 docker 都沒用

剛好在這時候看到 OpenMediaVault 這個開源 NAS 系統，想說既然是基於 Debian 開發的，那我裝 Ubuntu 應該沒問題吧？
所以就想說不如換去 Ubuntu 吧，不管要裝什麼應該都容易一點

### Ubuntu (first time)

![](https://imtranslationweb.com/media/k2/items/cache/181bbfa794e218f5cd90439ff3dd1578_L.jpg)

於是就裝了第一次 Ubuntu，中間好像用 ArchLinux 燒 bootable USD 的時候寫壞了，安裝到一半都會當機，重複了三四次後我受不了用 MBP 重新燒了一個
總之系統安裝完成後便開始陸續安裝套件，不過 OMV 總是一直安裝失敗，爬了文之後才知道——

**雖然 Ubuntu 是基於 Debian 發展出來的 distro、兩者也都是用 apt 做套件管理、安裝檔也都是 .deb，但他們彼此互不完全相容**

⋯⋯所以我又跑去裝 Debian 了

### Debian

![](https://miro.medium.com/1*DioqEZZtU2sb5qdxxvkUbQ.jpeg)

最一開始裝 Debian 13，看他八月剛 release 就裝這個吧
⋯⋯欸嘿 OMV 還沒有支援 Debian 13，於是又裝了 Debian 12
後來發現 Debian 超難用（相較於 ArchLinux & Ubuntu），後來仔細想想我目前也不太需要 NAS 功能，嚴格說起來甚至只要 SMB 就能用，便果斷的放棄 OMV

### Ubuntu (second time)

繞了一大圈又回來裝 Ubuntu 了，因為相同的流程（安裝必要套件）都很順手了，也順便搞了個 GitLab 正常使用中
後來有一天外出的時候突然想到可以搞個 VPN，讓我在外面也能連線回家用 homelab 的資源，做了點研究後決定回家開始弄
晚上折騰了許久，在設定 IP 的時候才發現需要改 modem 的設定以避免穿透不出去，後來覺得太麻煩就放棄了
爾後發現我們家的內網疑似被我搞爛，自己努力修復了兩天還是沒救，只能叫種花的工程師來處理

> 是說種花的工程師一來直接幫我們換一顆新的 modem，賺了（？？？？？？

也因為我試了很多設定可能也把 homelab 上的網路設定搞爛了，身為網管小白沒辦法自己處理，於是就請出我們的重灌大法⋯⋯

## 最後的最後

所以我現在正在試著重新 debug 一次 GitLan 的 container，本來測試都沒問題，直到今天想要把 CI/CD runner 加進 container 後就爆開了
有點想要放推直接繼續用 GitHub private repo 就好或是別塞在 docker 裡面，不知道會不會容易一些

總之我先去搞其他服務ㄌ