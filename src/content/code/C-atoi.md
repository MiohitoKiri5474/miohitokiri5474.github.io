---
title: "C語言中 char 字串轉換成數字"
pubDate: 2019-09-18 00:46:41
tags:
  - C
---

## 前言

今天來簡單介紹一下要如何在C語言中把 char 字串轉換成數字

## 方法

1. 使用內建函數atoi
2. 自己寫

內建函數的用法可以去cpprefrence查到，所以這邊就不解說了
只有講自己寫的做法

## 原理

如果要在一個數字的尾端加上一位數，該如何操作？
有一種方法：先把原數字 \* 10，然後再把那一位數加上去
所以就可以有下面這種code

```cpp
int translate ( char *c, int len ){
	int i, res = 0;
	for ( i = 0 ; i < len ; i++ ){
		res *= 10;
		res += ( c[i] - '0' );
	}

	return res;
}
```

然後解說一下code中第五行
char之間的相減就是ASCii code的值的差
所以可以用這種方法把原本的數字還原出來
