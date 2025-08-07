---
title: "[ITSA] No.66 詳解"
pubDate: 2018-09-13 08:20:50
tags:
  - ITSA
  - Full Contest Solution
---

## 前言

簡單來說就是我特殊選才的資料不夠
所以只好來打這東西，不然備審有夠空QQ

## problem 1

### 題目

這題就是給你一行整數（數量不定，但是保證 < 11個）
求該行出現率「超過」一半的整數

### 解法

看到數量不定就會用 getline + stringstream，這很直觀
然後因為他只有說「給整數」，並沒有限制數字大小
所以我是用 map 做，而不是陣列（出現負數就尷尬了）
雖然比較慢但是也比較無腦

為什麼我會在題目那把「超過」加上引號？
。。。因為我在寫 code 的時候耍智障把判斷式寫成 >=
然後我就吃 WA 了
我還跑去問如果有多組解怎麼辦
結果超過一半的數字只會有一個QQ
還有把 NO 打成 No
就多吃兩個 penalty 了，虧爆
抓到，澪人桐不會寫程式

### code

```cpp
// by. MiohitoKiri5474
#include<bits/stdc++.h>

using namespace std;

map < int, int > lib;

int main(){
    ios::sync_with_stdio ( false );
    cin.tie ( 0 );
    cout.tie ( 0 );

    string str;
    int in, cnt;
    bool ans;
    while ( getline ( cin, str ) ){
        lib.clear();
        cnt = 0;
        ans = false;
        stringstream ss ( str );
        while ( ss >> in ){
            lib[in]++;
            cnt++;
        }

        for ( auto i: lib ){
            if ( i.S > cnt / 2 ){
                cout << i.F << '\n';
                ans = true;
                break;
            }
        }
        if ( !ans )
            cout << "NO\n";
    }
}
```

## problem 2

### 題目

給一個簡單的一元一次方程式
保證只有兩個數字、一個未知數 $x$、一個等號、一個加減乘除
並保證所有運算元與運算子之間只都有空白隔開
並且求出 $x$，無條件捨去到小數點第一位

### 解法

要寫字串判斷很麻煩欸 = =
pA寫爆了先來寫這題（？
手速不知道為什麼爆快
快到我自己也嚇到
也沒出什麼 bug，很快就 AC 了 <3

### code

```cpp
// by. MiohitoKiri5474
#include<bits/stdc++.h>

using namespace std;

#define pb push_back

string str;
vector < int > lib;

int main(){
    ios::sync_with_stdio ( false );
    cin.tie ( 0 );
    cout.tie ( 0 );

    int opt, len, x, a, b, ans;
    bool flag;
    while ( getline ( cin, str ) ){
        len = str.size(), x = 0, ans = 0;
        flag = false;
        lib.clear();
        for ( int i = 0 ; i < len ; i++ ){
            if ( str[i] == '+' )
                opt = 0;
            else if ( str[i] == '-' )
                opt = 1;
            else if ( str[i] == '*' )
                opt = 2;
            else if ( str[i] == '/' )
                opt = 3;
            else{
                if ( '0' <= str[i] && str[i] <= '9' ){
                    x = x * 10 + int ( str[i] - '0' );
                    flag = true;
                }
                else{
                    if ( flag )
                        lib.pb ( x );
                    x = 0, flag = false;
                }
            }
        }
        if ( flag )
            lib.pb ( x );
        a = lib[0], b = lib[1];
        if ( !opt )
            ans = ( b - a ) * 10.0;
        else if ( opt == 1 )
            ans = ( b + a ) * 10.0;
        else if ( opt == 2 )
            ans = ( int ) ( ( double ) b / a * 10.0 );
        else{
            if ( str[0] == 'x' )
                ans = ( int ) ( ( double ) b * a * 10.0 );
            else
                ans = ( int ) ( ( double ) a / b * 10.0 );
        }
        cout << ans / 10 << '.' << ans % 10 << '\n';
    }
}
```

## problem 3

### 題目

給定 $N$ 組字串，請將字串以 $':' or ';' or ','$ 切割
並輸出出所有字串

### 解法

啊就水題水到爆啊，多開個 string 紀錄就好了
這題沒有難度（蓋章

### code

```cpp
// by. MiohitoKiri5474
#include<bits/stdc++.h>

using namespace std;

int main(){
    ios::sync_with_stdio ( false );
    cin.tie ( 0 );
    cout.tie ( 0 );

    string str, swp;
    int t;
    cin >> t;
    getline ( cin, str );
    while ( t-- ){
        getline ( cin, str );
        cout << "Tokens found:\n";
        swp = "";
        for ( auto i: str ){
            if ( i == ':' || i == ',' || i == ';' ){
                cout << swp << '\n';
                swp = "";
            }
            else
                swp += i;
        }
        if ( swp != "" )
            cout << swp << '\n';
    }
}
```

## problem 4

### 題目

zj 上面的是羅馬數字轉阿拉伯數字
這次 ITSA 出的是要把阿拉伯數字轉羅馬數字
更水 = =

### 解法

直接按照位數打表輸出就好
。。。雖然這麼說，但是我還是出 bug 了
我把4打成"IIII"，正確應該是"IX"
垃圾是我QQ

### code

```cpp
// by.MiohitoKiri5474
#include<bits/stdc++.h>

using namespace std;

string lib0[10] = { "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" };
string lib1[10] = { "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC" };
string lib2[10] = { "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM" };
int main(){
    ios::sync_with_stdio ( false );
    cin.tie ( 0 );
    cout.tie ( 0 );

    int t, in;
    cin >> t;
    while ( t-- ){
        cin >> in;
        cout << lib2[in / 100] << lib1[in % 100 / 10] << lib0[in % 10] << '\n';
    }
}
```

## problem 5

### 題目

給定兩個字串，求出這兩個字串所有的 LCS

### 解法

本來只有丟任意解的 LCS
然後就吃 WA 了，又多一個 penalty
問官方官方一直沒有回應
就想說先寫所有解的版本好了
等到一回覆馬上 judge

然後這就是裸的 LCS 啊 = =

### code

```cpp
// by. MiohitoKiri5474
#include<bits/stdc++.h>

using namespace std;

int dp[105][105], ma;

int main(){
    ios::sync_with_stdio ( false );
    cin.tie ( 0 );
    cout.tie ( 0 );

    string a, b, str;
    set < string > lib;
    while ( cin >> a >> b ){
        int szA = a.size(), szB = b.size();
        lib.clear();
        memset ( dp, 0, sizeof dp );
        ma = 0;
        for ( int i = 0 ; i < szA ; i++ ){
            for ( int j = 0 ; j < szB ; j++ ){
                if ( a[i] == b[j] ){
                    dp[i + 1][j + 1] = dp[i][j] + 1;
                    ma = max ( ma, dp[i + 1][j + 1] );
                }
            }
        }
        if ( !ma ){
            cout << "No common sequence!\n";
            continue;
        }
        for ( int i = 0 ; i < szA ; i++ ){
            for ( int j = 0 ; j < szB ; j++ ){
                if ( dp[i + 1][j + 1] == ma ){
                    str = "";
                    for ( int k = i - ma + 1 ; k <= i ; k++ )
                        str += a[k];
                    lib.insert ( str );
                }
            }
        }
        for ( auto i: lib )
            cout << i << '\n';
    }
}
```

## 後記

在第 37 分鐘的時候就破台了
（那時候師大還沒有破台）
那時候我跟師大的 penalty 差 67
也就是說如果師大 p4 吃超過67的 penalty 我就保證第一了
。。。然後師大只吃 66
80 抽抽不到術師匠的非洲酋長正常發揮QQ

下一次沒意外就會去打 PTC 了
不過是英文題目
我覺得我會扛不起來
在此誠徵英文好的選手一名
工作：只要幫我翻譯題目就好

然後這一篇的題解我居然寫了 330 行
喔，這行就 331 了 = =
雖然看起來很多不過大部分都是 code 就是了
