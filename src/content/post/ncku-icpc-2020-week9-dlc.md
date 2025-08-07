---
title: "進階資料結構 for NCKU-ICPC Week 9"
pubDate: 2020-05-02 17:54:39
tags:
  - data structure
  - segment tree
---

## 前言

有些內容筆者本來想要放在這週的授課內容中
不過一來是筆者的期中快要爆炸，沒有空做簡報
另一方面由於授課內容偏難，放在影片中可能會讓影片長度暴增（像是變成三個小時）
因此決定另外寫一篇文章來當作補充內容，並且發在自己的部落格

## 線段樹 Extra

### 持久化

#### 老樣子開始前先看個題目

> 給定一個長度為 $N$ 的序列，並且有 $M$ 條指令，指令內容如下
>
> 1. 修改其中一個元素的值
> 2. 查詢查詢區間 $[l, r]$ 內的最大值
> 3. 回復到第 k 次修改後的狀態
>
> $N, M \le 10 ^ 5, k \le$ 當前修改次數, $0 \le l, r \lt N$

1, 2 都還是基本的線段樹，那麼 3 呢

感覺可以每修改一次就開一顆新的線段樹，要回朔就複製回去

所以需要開到 $M$ 棵線段樹，所以要開 $4NM$ 的記憶體......先 MLE 了
再看一下時間複雜度：$O(M(N + \log N))$ （先複製一遍 $O(N)$，再做單點修改 $O(\log N)$，最糟糕要執行 $M$ 次）
從各種方面來看感覺都不會過

#### 先觀察一下

對於每次修改，會修改到的地方只有從根節點到要修改的點的路徑而已
也就是說 **其他節點沿用舊的資料也沒關係**

![](/segmentTree.png)

但是用陣列寫就要另外維護節點編號，從實作上來說是幾乎不可能達成的事
看來我們需要換個想法

#### Hmmm，指標？

沒錯，就是指標
只要紀錄記憶體位置就好，不用把整個 node 都複製過去

所以現在線段樹要改成指標版本

```cpp
// by. MiohitoKiri5474
#include<bits/stdc++.h>

using namespace std;

struct node{
    node *l, *r;
    int value;

    node ( int _val ): l ( nullptr ), r ( nullptr ), value ( _val ) {}

    inline void up ( void ){
        value = -1;
        if ( l )
            value = max ( value, l -> value );
        if ( r )
            value = max ( value, r -> value );
    }
} *seg = nullptr;

void build ( int l, int r, node *&o ){
    o = new node ( 0 );
    if ( l == r )
        return;
    int mid = ( l + r ) >> 1;
    build ( l, mid, o -> l );
    build ( mid + 1, r, o -> r );

    o -> up();
}

void update ( int l, int r, int index, int value, node *&o ){
    if ( l == r )
        o -> value = value;
    else{
        int mid = ( l + r ) >> 1;
        if ( index <= mid )
            update ( l, mid, index, value, o -> l );
        else
            update ( mid + 1, r, index, value, o -> r );

        o -> up();
    }
}

int query ( int l, int r, int nowL, int nowR, node *o ){
    if ( l <= nowR && nowR <= r )
        return o -> value;
    int mid = ( nowL + nowR ) >> 1;
    if ( r <= mid )
        return query ( l, r, nowL, mid, o -> l );
    if ( mid < l )
        return query ( l, r, mid + 1, nowR, o -> r );

    return max ( query ( l, r, nowL, mid, o -> l ), query ( l, r, mid + 1, nowR, o -> r ) );
}

int main(){
    ios::sync_with_stdio ( false );
    cin.tie ( 0 );
    cout.tie ( 0 );

    int n, m, l, r, in, type;
    cin >> n >> m;
    build ( 1, n, seg );
    for ( int i = 1 ; i <= n ; i++ ){
        cin >> in;
        update ( 1, n, i, in, seg );
    }

    // type 1: 單點修改
    // type 2: 區間查詢最大值
    while ( m-- ){
        cin >> type;
        if ( type == 1 ){
            cin >> l >> in;
            update ( 1, n, l, in, seg );
        }
        else if ( type == 2 ){
            cin >> l >> r;
            cout << query ( l, r, 1, n, seg ) << '\n';
        }
    }
}
```

#### 持久化

因為要保留舊版本，所以對所有需要被修改的節點新開一個位置來
並且把左右子結點的指標，指向原本左右子結點的位置
接著就是如前面講的，直接上持久化

```cpp
// by. MiohitoKiri5474
#include<bits/stdc++.h>

using namespace std;

struct node{
    node *l, *r;
    int value;

    node ( int _val ): l ( nullptr ), r ( nullptr ), value ( _val ) {}
    // 新增一個建構子，可以直接複製原本的 l, r
    node ( node *o ): l ( o -> l ), r ( o -> r ), value ( o -> value ) {}

    inline void up ( void ){
        value = -1;
        if ( l )
            value = max ( value, l -> value );
        if ( r )
            value = max ( value, r -> value );
    }
} *seg = nullptr;

void build ( int l, int r, node *&o ){
    o = new node ( 0 );
    if ( l == r )
        return;
    int mid = ( l + r ) >> 1;
    build ( l, mid, o -> l );
    build ( mid + 1, r, o -> r );

    o -> up();
}

void update ( int l, int r, int index, int value, node *&o ){
    // 把需要修改的節點在修改前先開一個新位置出來
    o = new node ( o );
    if ( l == r )
        o -> value = value;
    else{
        int mid = ( l + r ) >> 1;
        if ( index <= mid )
            update ( l, mid, index, value, o -> l );
        else
            update ( mid + 1, r, index, value, o -> r );

        o -> up();
    }
}

int query ( int l, int r, int nowL, int nowR, node *o ){
    if ( l <= nowR && nowR <= r )
        return o -> value;
    int mid = ( nowL + nowR ) >> 1;
    if ( r <= mid )
        return query ( l, r, nowL, mid, o -> l );
    if ( mid < l )
        return query ( l, r, mid + 1, nowR, o -> r );

    return max ( query ( l, r, nowL, mid, o -> l ), query ( l, r, mid + 1, nowR, o -> r ) );
}

int main(){
    ios::sync_with_stdio ( false );
    cin.tie ( 0 );
    cout.tie ( 0 );

    int n, m, l, r, in, type;
    // 紀錄版本用的 vector
    vector < node* > version;
    cin >> n >> m;
    build ( 1, n, seg );
    for ( int i = 1 ; i <= n ; i++ ){
        cin >> in;
        update ( 1, n, i, in, seg );
    }
    // 記錄初始版本
    version.push_back ( seg );

    // type 1: 單點修改
    // type 2: 區間查詢最大值
    // type 3: 回朔到版本 k
    while ( m-- ){
        cin >> type;
        if ( type == 1 ){
            cin >> l >> in;
            update ( 1, n, l, in, seg );
            // 修改完紀錄版本
            version.push_back ( seg );
        }
        else if ( type == 2 ){
            cin >> l >> r;
            cout << query ( l, r, 1, n, seg ) << '\n';
        }
        else{
            // 回朔到版本 k
            cin >> in;
            seg = version[in];
        }
    }
}
```

##### 有修改過的地方

| line   | 修改內容                                |
| ------ | --------------------------------------- |
| 12     | 新增一個建構子，可以直接複製原本的 l, r |
| 36     | 在對節點修改前先開一個新的位置          |
| 69     | 記錄用的 vector                         |
| 77, 88 | 修改完成後，記錄當前版本內容            |
| 94     | 新增一個操作，可回朔到版本 k            |

### 非簡單操作線段樹

#### 我們還是看個題目

> 現在給定一個長度為 $N$ 序列，以及 $M$ 筆操作，操作內容有
>
> 1. 修改一個元素的值
> 2. 查詢區間中最長的「好序列」長度
>
> 定義一個「好區間」為：每個元素都是前一個元素 + 1
>
> 這邊是一個題目叫大龍貓的濃縮版，完整版題目可以看 [這邊](http://toj.tfcis.org/oj/pro/365/)

現在有點麻煩了，RMQ 我們會，但是這種該怎麼用線段樹實作

我們可以在 node 中紀錄目前最長的好序列長度，以及其開始位置以及結束位置
每次合併兩個區間就取兩邊紀錄的最長好序列的最大值

Emmm，但是感覺好像怪怪的
如果合併兩個區間後，交界處那邊形成一個更長的好序列，怎麼辦？

尷尬，那我們只好在每個 node 也記錄從開頭處到結束處的好序列了

聽起來很複雜，但是其實一點也不

#### piece

為了方便編寫，我們先定義一個 piece，還有如何辨識兩個 piece 是否相同

```cpp
struct piece{
    int l, r, sz;

    // 檢查兩個 piece 是否相同
    bool operator == ( const piece b ){
        return l == b.l && r == b.r;
    }
};

// 不想寫 operator（或是覺得太麻煩）可以這樣寫
inline bool same ( piece a, piece b ){
    return a.l == b.l && a.r == b.r;
}
```

$l, r$ 就是這個區間的左右界
$sz$ 是大小，可有可無，只是寫 code 上方便

#### node

然後是 node

```cpp
struct node{
    piece front, back, ma;
};
```

$front, back$ 分別為是記錄當前線段樹區間內，從左邊界開始的好序列長度，以及從右邊屆開始的好序列長度
$ma$ 則是記錄當前線段樹區間內，最長的好序列長度

#### merge

接著來寫合併兩個區間的函數吧，因為沒有內建的函數可以用，只能自己寫一下

```cpp
inline node merge ( node L, node R ){
    node res;
    res.front = L.front, res.back = R.back, res.ma = ( L.ma.sz > R.ma.sz ? L.ma : R.ma );

    if ( basic[L.back.r] + 1 == basic[R.front.l] ){
        piece swp = piece { L.back.l, R.front.r, R.front.r - L.back.l + 1 };

        if ( L.front == L.back )
            res.front = swp;
        if ( R.front == R.back )
            res.back = swp;

        res.ma = ( swp.sz > res.ma.sz ? swp : res.ma );
    }

    return res;
}
```

合併兩個區間後，要回傳的 res 內容如下

| res 內的 piece | 來源                                             |
| -------------- | ------------------------------------------------ |
| front          | l.front                                          |
| back           | r.back                                           |
| ma             | l.ma, r.ma, l.back + r.back 這三者中的最長好序列 |

然後 update 以及 query 跟一般版的線段樹大同小異，可以自行閱讀面完整的 code

#### code

```cpp
// by. MiohitoKiri5474
#include<bits/stdc++.h>

using namespace std;

#define maxN 100005

struct piece{
    int l, r, sz;

    // 檢查兩個 piece 是否相同
    bool operator == ( const piece b ){
        return l == b.l && r == b.r;
    }
};

// 不想寫 operator（或是覺得太麻煩）可以這樣寫
inline bool same ( piece a, piece b ){
    return a.l == b.l && a.r == b.r;
}

struct node{
    piece front, back, ma;
} seg[maxN << 2];

int basic[maxN];

inline node merge ( node L, node R ){
    node res;
    res.front = L.front, res.back = R.back, res.ma = ( L.ma.sz > R.ma.sz ? L.ma : R.ma );

    if ( basic[L.back.r] + 1 == basic[R.front.l] ){
        piece swp = piece { L.back.l, R.front.r, R.front.r - L.back.l + 1 };

        if ( L.front == L.back )
            res.front = swp;
        if ( R.front == R.back )
            res.back = swp;

        res.ma = ( swp.sz > res.ma.sz ? swp : res.ma );
    }

    return res;
}

void update ( int l, int r, int index, int value, int n ){
    if ( l == r )
        seg[n].front = seg[n].back = seg[n].ma = piece { l, l, 1 };
    else{
        int mid = ( l + r ) >> 1, leftSon = n << 1, rightSon = leftSon | 1;
        if ( index <= mid )
            update ( l, mid, index, value, leftSon );
        else
            update ( mid + 1, r, index, value, rightSon );

        seg[n] = merge ( seg[leftSon], seg[rightSon] );
    }
}

node query ( int l, int r, int nowL, int nowR, int n ){
    if ( l <= nowL && nowR <= r )
        return seg[n];
    int mid = ( nowL + nowR ) >> 1, leftSon = n << 1, rightSon = leftSon | 1;
    if ( r <= mid )
        return query ( l, r, nowL, mid, leftSon );
    if ( mid < l )
        return query ( l, r, mid + 1, nowR, rightSon );

    return merge ( query ( l, r, nowL, mid, leftSon ), query ( l, r, mid + 1, nowR, rightSon ) );
}

int main(){
    ios::sync_with_stdio ( false );
    cin.tie ( 0 );
    cout.tie ( 0 );

    int n, m, type, l, r;
    cin >> n;
    for ( int i = 1 ; i <= n ; i++ ){
        cin >> basic[i];
        update ( 1, n, i, basic[i], 1 );
    }

    cin >> m;
    while ( m-- ){
        cin >> type >> l >> r;
        if ( type == 1 ){
            basic[l] = r;
            update ( 1, n, l, r, 1 );
        }
        else
            cout << query ( l, r, 1, n, 1 ).ma.sz << '\n';
    }
}
```

## BIT Extra - 2維BIT

### 已經成習慣的先看個題目

> 給定一平面，每個點都有權重，求查詢 $( x_1, y_1 ), ( x_2, y_2 )$ 所圍成區間的權重和，並且支援單點修改
>
> $N, M \le 10^4, Q \le 10^5$

暴力一定炸，那麼開 $N$ 顆線段樹 or BIT？

```cpp
int bit[maxN][maxN], n, m;

inline void add ( int x, int y, int value ){
    while ( y <= m ){
        bit[x][y] += value;
        y += y * -y;
    }
}

inline int sum ( int x, int y ){
    int res = 0;
    while ( y ){
        res += bit[x][y];
        y -= y * -y;
    }

    return res;
}

inline int query ( int x1, int y1, int x2, int y2 ){
    int res = 0;
    for ( int i = x1 ; i <= x2 ; i++ )
        res += sum ( i, y2 ) - sum ( i, y1 );

    return res;
}
```

也不是不行，只是這樣可能還是會 TLE （複雜度 $O(QN\log M)$ ）

那麼就寫個二維 BIT 吧
概念上跟 BIT 一樣，另外需要做修改的行數跟一維 BIT 一樣

### code

```cpp
int BIT[maxN][maxN], n = 100, m = 100;

inline void add ( int x, int y, int in ){
    for ( int i = x ; i <= n ; i += i & -i )
        for ( int j = y ; j <= m ; j += j & -j )
            BIT[i][j] += in;
}

inline int sum ( int x, int y, int in ){
    int res = 0;
    for ( int i = x ; i ; i -= i & -i )
        for ( int j = y ; j ; j -= j & -j )
            res += BIT[i][j];

    return res;
}
```

## 後記

這篇文章寫的也挺久的，主要是文中的內容大部分都不常用到，在寫的時候還跑去翻了一些文章以及教材

正因如此，內容上可能有些錯誤
如有發現錯誤，請聯絡 [筆者](https://miohitokiri5474.github.io/code/about/)

另外，這篇文章中的 code 也有同步更新於筆者的 github，可以看[這邊](https://github.com/MiohitoKiri5474/CodesBackUp/tree/master/ncku-icpc/2020/week9/DLC)

本來還有預計要寫 Treap & 動態開點
Treap 寫起來太耗費時間，就先欠著吧（？
而動態開點因為找不大到適合的題目，找到的題目後來想想可以用線段樹 + 離散化炸掉
雖然說用動態開點比較無腦，但是好像非必要，有興趣寫的人可以看這一題 [TOJ 242 G. 色彩繽紛](https://toj.tfcis.org/oj/pro/242/)

至於資料結構的例題講解，這邊的 blog 有幾篇

1. [[CF][920F] F. SUM AND REPLACE](https://miohitokiri5474.github.io/code/CF-920F/)
   這邊挺久之前寫的，可能語句有些不順
2. [[TOJ][391] E. 模數 CANDY](https://miohitokiri5474.github.io/code/TOJ-391/)
   這篇也挺久的，是高中時打過的比賽
3. [[TIOJ][1909] 勇者出征](https://miohitokiri5474.github.io/code/TIOJ-1909/)
   高中時寫到的哏題，也是離散化套線段樹
   不過當時還有用噁心 define 的毒瘤習慣，code 看起來可能有些痛苦
4. [[TOJ][365]G.大龍貓](https://miohitokiri5474.github.io/code/TOJ-365/)
   最後是在文中有用到的題目大龍貓，當初也有寫一份題解
   不過個人認為這邊的更好閱讀

最後感謝閱讀到這邊的各位，謝謝大家
