---
title: "正在考慮轉回 GUI Editor"
pubDate: 2026-07-14 14:12:23
heroImage: "/MBP14.jpeg"
---

## 現在我在用什麼

自從 2020 年轉用 Vim/NeoVim 以後，我一直都是堅定的 CLI editor 支持者，雖然當初轉過來用的理由也很搞笑就是

這要說回 2015 年我國三不小心把 Windows 洗成 Ubuntu 開始說起
當時我為了嚐鮮想要體驗 Linux，於是在我當時的筆電上裝了 Ubuntu
本來是要搞雙系統的，但當時經驗不足不小心把 UEFI 搞爆了，導致 Windows 開不起來
經過一番折騰發現完全處理不了，想說反正我也不是非 Windows 不可，於是很乾脆的直接把 Windows 洗掉了（反正 Win8 也挺難用的
當時用的 IDE 是上古神獸 Dev-C++，但因為沒有 Linux 版，所以後來我換成用 Sublime Text 3，而且因為搞不定一鍵編譯，所以當時我還要用 Terminal 編譯/測試
這個流程一直維持到我換 Macbook Pro with Retina 2015 之後，雖然中間經過一陣子的折騰，也有試過 VS Code 但我還是比較喜歡 Sublime Text + Terminal 的工作流程

直到 2020 年我準備換下一台 MacBook，當時我已經下訂 MacBook Pro 2020，但又擔心手上這台不早點賣掉價格不漂亮（當時二手價還有 18k，偉哉 Apple 產品的保值度
在學長的建議下先轉手，他可以先把閒置的 ThinkPad 借我，於是我在上面裝了 ArchLinux（對我還是不想用 Windows XD
但不知道為什麼我怎麼樣都沒辦法在 ArchLinux 上裝好 Sublime Text，索性轉用 Vim 寫作業
就這樣過了一個月，我的手指完全變成 hjkl 的形狀，等拿到新的 MacBook 後重裝 Sublime Text 後，反而在想著要怎麼樣在上面用 hjkl
經過了一番折騰，又想到反正我也只是把 Sublime Text 當作編輯器，實際上要編譯測試啥的都還是開 Terminal，那我完全轉向 Vim/NeoVim 好像也沒什麼不妥
就和當初跳到 Linux 時一樣，我索性直接把 Sublime Text 砍了專心用 NeoVim

後來經過了幾番折騰，跟著 NeoVim 社群換了一版又一版的 config 這又是後話了

> 突然想到上一次寫 Terminal 環境設定已經是兩年前的事了，有空 & 我沒有全面轉向 GUI IDE 再來寫下一篇文章吧


## 我怎麼突然想換編輯器了

一直以來我都還是有在斷斷續續的用 VS Code 之類的 IDE，不過主要是用來寫 MarkDown 文章
雖然我有搞定 NeoVim 上的輸入法切換，但說真的用起來還是有一點別扭
因此像是寫 blog 文章這類需要切換中英輸入法的東西，我還是會用 VS Code 來寫

> 題外話，我甚至有一度開始 vibe coding 一個類似 Typra 的 MarkDown editor
> 但最後怎麼調整都覺得有很長一段距離要搞，當時又沒什麼時間，於是放棄了

不過自從 2025 年我開始使用 AI 寫 code，直到 2026 年我幾乎沒有在自己寫 code 了
現在我最常用做的事是在 terminal 開 claude code 下 prompt 燒 token 做事
所以我開始想一個問題：如果我不需要那麼大量的寫 code 了
單純以 `檢視 code 並做一些修改` 這點來看，我似乎也不需要高效的編輯方式

而且說實在我並不是一個很認真研究操作的 Vim user，加上我的 config 也越來越像是一個 IDE 而不是一個文字編輯器了
現在 IDE 必須有的功能我大概都有，像是 LSP + autocompletion 和 Copilot AI 補完、存檔自動跑 formatter 或 linter 等等
大概除了編譯 & 執行以外都支援了，沒有特別弄是因為我只需要切個 tmux panel 就好，或是用 `Ctrl + /` 叫出 terminal 視窗敲指令

加上這幾年 Zed 除了 plugin 數量可能還沒跟上以外，看起來要超越 VS Code 了（Rust > Elestron），產生了要不要跳槽去 Zed 的念頭
畢竟相較於癰腫的 VS Code，我還是更喜歡輕量的 Zed 一點

## Vibe Coding 真的好舒服

而且加上從今年年底開始，我從單純的 terminal emulator [Ghostty](https://ghostty.org/)，轉去用 ghosttylib 寫的 [Supacode](https://supacode.sh/)
最大的差異在於 Supacode 是完全 agent 優先，加上一些 PR 狀態列、整合系統提示（包括但不限於 agent 回覆、權限請求等
今年年初開始全面 vibe coding 後，我的第一個困擾是很難切換工作，因為一個專案開下去我至少有三個頁面：一個掛測試環境、一個給 agent、一個必要時開編輯器或是處理其他工作
如果我手頭並行的事情變多（例如同時有兩份作業 + 之前開始搞的 Guildmages' Forum 重構 + 心血來潮開始搞 side project），tmux 分頁會多到無法流暢切換，即便後來我一個工作開一個 session 也是有點負荷不過來，而且也沒有一個可以順暢搜尋的手段
即便後來適用 craftzdog 的 [tmux-claude-session-manager](https://github.com/craftzdog/tmux-claude-session-manager) 我還是覺得不太順手，剛好某天被 yt 的演算法推薦別人在講 Supacode 的影片，看完之後決定來試用看看，反正最差就是回去用既有的 workflow

![](/GUI-editor/supacode.jpeg)

> 最近在開發的短網址服務，弄到一個程度會公開（？

總之大概是這樣，說真的從沒想過有一天我會想回頭用 GUI IDE
甚至花時間搭建出來的 minimal terminal，現在看起來也沒有太多的必要了
