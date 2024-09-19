---
title: "Disjoint Set 並查集"
pubDate: 2018-09-11 08:16:11
tags:
  - dsu
  - disjoint set
  - data structure
---

上一篇blog因為介紹並查集的地方太多了，文章太長
所以我今天把昨天介紹並查集那一段拔出來，另外寫一篇文章好了
然後會在昨天文章上加入這篇的連結

<!--more-->

## disjoint set 並查集

我們會開一個陣列，記錄自己的老大是誰（最一開始的時候，所有人的老大都是自己）
在把兩個並查集合併（假設這兩個並查集老大為 $a, b$ ）的時候，把其中一個老大當作是這個新的並查集的老大，也就是把 $a$ 的老大指定為 $b ( dis[a] = b )$
至於查詢呢？我們可以用遞迴實作，不斷的遞迴下去直到有一個點老大是自己，則代表說這個點已經是這個並查集的頂了

這個時候大概會寫出像這樣的 code

```cpp
// disjoint set
#include<bits/stdc++.h>

using namespace std;

#define maxN 10005

int dis[maxN];

inline void init ( void ){
    for ( int i = 0 ; i < maxN ; i++ )
        dis[i] = i;
}

inline int find ( int n ){
    return dis[n] == n ? dis[n] : find ( dis[n] );
}

inline void Union ( int a, int b ){
    dis[a] = b;
}

inline bool same ( int a, int b ){
    return find ( a ) == find ( b );
}
```

### 路徑壓縮

我們先觀察一下上面的 code，會發現在 find 的時候可能會往上回朔好幾層，而且這個點的老大就固定不變了（除非有新的合併）
所以我們會做一個優化，叫做路徑壓縮，在回傳同時，順便紀錄這個點的老大是誰
下次就可以直接略過中間的點，直接到老大那了

find 函數會被改成這樣
親民寫法：

```cpp
void find ( int n ){
    if ( dis[n] == n )
        return n;
    return dis[n] = find ( n );
}
```

然後就是會有人（例如我），會想要把它寫在一起
所以就變成這樣了XD

```cpp
void find ( int n ){
    return dis[n] == n ? n : dis[n] = find ( dis[n] );
}
```

最後這個東西的複雜度會變成均攤 $O ( \log N )$，感覺還不錯

### 避免 Stack Overflow

最最最後有個東西也挺重要的
因為路徑壓縮還是要按照這個點的遍歷往上爬
又是用遞迴實作
所以有機會會戳到 Stack overflow
然後你就吃 RE 了
恭喜多一個 penalty
重點是你不知道**這樣會吃到 Stack overflow** 然後就會多吃幾個w

雖然說現在很多 judge 都避免掉了啦
會把 stack 的記憶體大小開的跟那一提的 Memery Limit 一樣大
只是難免會戳到那種舊型 judge
所以還是乖乖學一下怎麼避免 Stack overflow 吧

要壓縮遞迴深度，可以有兩種方法

#### 方法一：random

在 Union 完後隨便戳一個點 find 一下，剛好會把它上面的那一長串都更新一遍
但是這東西太機率了，搞不好還是會戳到，只能怪臉黑啦

```cpp
inline void Union ( int a, int b ){
    dis[a] = b;
    find ( rand() % n );
}
```

#### 方法二：Union by rank

把 rank 小的集合接在大的集合上，讓深度平均點，遞迴的時候就比較不會戳到超級深的一條鏈
理論上這樣應該不會爆炸，因為深度很平均

```cpp
int rk[maxN];

inline void Union ( int a, int b ){
    if ( rk[a] < rk[b] )
        swap ( a, b );
    dis[b] = a;
    rk[b] = rk[a] + 1 ;
}
```

這樣可以很神奇的把複雜度壓在 $O ( α ( N ) )$ 下
那個 $α ( N )$ 是阿克曼函數的反函數，即反阿克曼函數
至於那是啥我也不知道，只知道幾乎可以算是常數了

不過因為通常都會做路徑壓縮，所以 rank 到最後都很小，因此我不常用

#### 方法三：Union by size

這也挺直觀的
把大小比較小的並查集接在大的下面
比較小，需要做改動的點就比較少，對吧

```cpp
int sz[maxN];

inline void Union ( int a, int b ){
    if ( sz[a] > sz[b] )
        swap ( a, b );
    dis[a] = b;
    sz[b] += sz[a];
}
```

#### 如果開優化還是爛了呢

通常我固定都會開 Union 前 find，如果還是爛掉的話就再加上 Union by Size
再爛掉。。。這應該是叫你去寫啟發式合併吧
據說那東西比並查集還要快
不過我也沒有實作過，所以我並不清楚

### 確認是否屬於同一個並查集

確認的方法很簡單，只要兩個的頭頭都一樣，肯定在同一個並查集內

```cpp
inline bool same ( int a, int b ){
    return find ( a ) == find ( b )
}
```

用以上的方法就可以快速地確認兩個點是否屬於同一個並查集了

## 後記

我昨天到底發什麼瘋啊，沒事寫這麼多 dsu 的教學幹嘛 = =
現在看了一下，我光 dsu 就寫 171 行了@@
覺得累
