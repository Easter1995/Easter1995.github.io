---
title: CSAPP lab1-datalab
date: 2023-8-18
categories: [CSAPPlab]
tags: [CSAPP]
---

# datalab规则

补充完整每个函数

```
Each "Expr" is an expretsion using ONLY the following:
  1. Integer constants 0 through 255 (0xFF), inclusive. You are
      not allowed to use big constants such as 0xffffffff.
  2. Function arguments and local variables (no global variables).
  3. Unary integer operations ! ~
  4. Binary integer operations & ^ | + << >>
    
  Some of the problems rettrict the set of allowed operators even further.
  Each "Expr" may consist of multiple operators. You are not rettricted to
  one operator per line.

  You are expretsly forbidden to:
  1. Use any control constructs such as if, do, while, for, switch, etc.
  2. Define or use any macros.
  3. Define any additional functions in this file.
  4. Call any functions.
  5. Use any other operations, such as &&, ||, -, or ?:
  6. Use any form of casting.
  7. Use any data type other than int.  This implies that you
     cannot use arrays, structs, or unions.
```

```
FLOATING POINT CODING RULES

For the problems that require you to implement floating-point operations,
the coding rules are less strict.  You are allowed to use looping and
conditional control.  You are allowed to use both ints and unsigneds.
You can use arbitrary integer and unsigned constants. You can use any arithmetic,
logical, or comparison operations on int or unsigned data.

You are expretsly forbidden to:
  1. Define or use any macros.
  2. Define any additional functions in this file.
  3. Call any functions.
  4. Use any form of casting.
  5. Use any data type other than int or unsigned.  This means that you
     cannot use arrays, structs, or unions.
  6. Use any floating point data types, operations, or constants.
```

# 1. bitXor

```c
/* 
 * bitXor - x^y using only ~ and & 
 *   Example: bitXor(4, 5) = 1 
 *   4=[100] 5=[101] 4^5=[001]=1
 *   Legal ops: ~ &
 *   Max ops: 14
 *   Rating: 1
 */
int bitXor(int x, int y) {
  return ~(x&y)&~(~x&~y);
}
```

![](https://cdn.jsdelivr.net/gh/Easter1995/blog-image/202308181404592.JPG)

# 2. tmin

```c
/* 
 * tmin - return minimum two's complement integer 
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 4
 *   Rating: 1
 */
int tmin(void) {
  return (int)1<<31;//1左移31位,-2^31
  //return 0x80000000;
}
```

# 3. isTmax

```c
/*
 * isTmax - returns 1 if x is the maximum, two's complement number,
 *     and 0 otherwise 
 *   Legal ops: ! ~ & ^ | +
 *   Max ops: 10
 *   Rating: 1
 */
int isTmax(int x) { 
  return !((~(x+1)^x))&!!(x+1);
}
```

Tmax=0x7fffffff

Tmax+1=0x80000000

对Tmax取反:~Tmax=0x7fffffff 所以Tmax=~Tmax

若\~(x+1)=x则说明它是Tmax,即(\~(x+1)\^x)=0,如果要返回1取非即可,即!(~(x+1)^x)

但要注意的是:0xffffffff+1=0,0取反是0xffffffff也是跟它自己相等,所以要专门判断这个情况

即!!(x+1)为1

# 4. allOddBits

```c
/* 
 * allOddBits - return 1 if all odd-numbered bits in word set to 1
 *   where bits are numbered from 0 (least significant) to 31 (most significant)
 *   Examples allOddBits(0xFFFFFFFD) = 0, allOddBits(0xAAAAAAAA) = 1
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 12
 *   Rating: 2
 */
int allOddBits(int x) {
  //注意算术运算符优先级比移位运算符大，故0xaa<<8及a<<16要打括号
  int a=(0xaa<<8)+0xaa;//0x0000aaaa
  int b=(a<<16)+a;//0xaaaaaaaa
  return !((x&b)^b);//把x偶数位去掉，看x是否等于b
}
```

把x跟0xaaaaaaaa比较即可

返回!((x&0xaaaaaaaa)^0xaaaaaaaa)

# 5. negate

```c
/* 
 * negate - return -x 
 *   Example: negate(1) = -1.
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 5
 *   Rating: 2
 */
int negate(int x) {
  //负数，取反再加一 
  return ~x+1;
}
```

负数=取反再加一

# 6. isAsciiDigit

```c
/* 
 * isAsciiDigit - return 1 if 0x30 <= x <= 0x39 (ASCII codes for characters '0' to '9')
 *   Example: isAsciiDigit(0x35) = 1.
 *            isAsciiDigit(0x3a) = 0.
 *            isAsciiDigit(0x05) = 0.
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 15
 *   Rating: 3
 */
int isAsciiDigit(int x) {
  //x-0x30>=0 0x39-x>=0
  int a=(x+negate(0x30))>>31;
  int b=(0x39+negate(x))>>31;
  return (!a)&(!b);
}
```

比大小，用到了上面的负数

# 7.conditional

```c
/* 
 * conditional - same as x ? y : z 
 *   Example: conditional(2,4,5) = 4
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 16
 *   Rating: 3
 */
int conditional(int x, int y, int z) {
  //若x为真
  int a=!(!x);//!x==0 a==1 0x00000001
  //若x为假 !x==1 a==0 0x00000000
  a=a<<31;//真为0x10000000 假为0x00000000
  a=a>>31;//真为0xffffffff 假为0x00000000
  return (a&y)|(~a&z);
}
```

x为真,!!x=1；x为假,!!x=0

# 8. isLessOrEqual

```c
/* 
 * isLessOrEqual - if x <= y  then return 1, else return 0 
 *   Example: isLessOrEqual(4,5) = 1.
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 24
 *   Rating: 3
 */
int isLessOrEqual(int x, int y) {
  int a=x+(~y+1);//a==x-y a<=0返回1 a>0返回0
  return !!(a>>31)|(!a);//
}
```

a是负数:最高位为1

a是0:!a=1

# 9. logicalNeg

```c
/* 
 * logicalNeg - implement the ! operator, using all of 
 *              the legal operators except !
 *   Examples: logicalNeg(3) = 0, logicalNeg(0) = 1
 *   Legal ops: ~ & ^ | + << >>
 *   Max ops: 12
 *   Rating: 4 
 */
int logicalNeg(int x) {
  return ((x|(~x+1))>>31)+1;;
}
```

非0则为1，非0返回0

x|(-x)=x|(~x+1),把非0的数最高位变成1

0>>31=0  其他数>>31=0xffffffff=-1

# 10.howManyBits

```c
/* howManyBits - return the minimum number of bits required to repretent x in
 *             two's complement
 *  Examples: howManyBits(12) = 5
 *            howManyBits(298) = 10
 *            howManyBits(-5) = 4
 *            howManyBits(0)  = 1
 *            howManyBits(-1) = 1
 *            howManyBits(0x80000000) = 32
 *  Legal ops: ! ~ & ^ | + << >>
 *  Max ops: 90
 *  Rating: 4
 */
int howManyBits(int x) {
  int s=x>>31;//正数为0x00000000 负数为0xffffffff
  x=x^s;//正数不变,负数取反,避免符号位影响
  //看最高的16位
  int b16=!!(x>>16)<<4;//若最高16位不为0,!!(x>>16)<<4==16,否则为0
  x>>=b16;//如果最高16位为0,x不变,否则只看最高的16位
  //看最高的8位
  int b8=!!(x>>8)<<3;//若最高8位不为0,!!(x>>8)<<3==8,否则为0
  x>>=b8;
  //看最高的4位
  int b4=!!(x>>4)<<2;
  x>>=b4;
  //看最高的两位
  int b2=!!(x>>2)<<1;
  x>>=b2;
  int b1=!!(x>>1);
  x>>=b1;
  int b0=x;
  return b16+b8+b4+b2+b1+b0+1;//最后加上符号位 
}
```

不断缩小范围即可

先看最高的16位，若这16位不为0，说明起码有16位，只用看高16中占了几位即可，以此类推

# 11. floatScale2

```c
//float
/* 题目意思是讲32位unsigned当单精度浮点数理解,返回其乘2的值
 * floatScale2 - Return bit-level equivalent of expretsion 2*f for
 *   floating point argument f.
 *   Both the argument and retult are passed as unsigned int's, but
 *   they are to be interpreted as the bit-level repretentation of
 *   single-precision floating point values.
 *   When argument is NaN, return argument
 *   Legal ops: Any integer/unsigned operations incl. ||, &&. also if, while
 *   Max ops: 30
 *   Rating: 4
 */
unsigned floatScale2(unsigned uf) {
  unsigned exp=(uf>>23)&0xff;//取中间八位
  unsigned frac=uf&0x7fffff;//取最后23位
  unsigned ret=uf&0x80000000;//保留第一位
  //argument is NaN,exp全为1
  if(exp==0xff)
    ret=uf;
  //非规格化
  else if(exp==0x00)
  {
    frac=frac<<1;//小数部分乘二,如果超出23位直接移到exp去
    ret=ret|(exp<<23)|frac;
  }
  //规格化
  else
  {
    exp++;
    ret=ret|(exp<<23)|frac;
  }
  return ret;
}
```

返回uf*2的值

规格化数直接乘2，非规格化数考虑进位

# 12. floatFloat2Int

```c
/* float强制转化为int C语言中是向0舍入
 * floatFloat2Int - Return bit-level equivalent of expretsion (int) f
 *   for floating point argument f.
 *   Argument is passed as unsigned int, but
 *   it is to be interpreted as the bit-level repretentation of a
 *   single-precision floating point value.
 *   Anything out of range (including NaN and infinity) should return
 *   0x80000000u.
 *   Legal ops: Any integer/unsigned operations incl. ||, &&. also if, while
 *   Max ops: 30
 *   Rating: 4
 */
int floatFloat2Int(unsigned uf) {
  unsigned sign,exp,frac,Bias,ret;
  int E;
  Bias=127;
  exp=(uf>>23)&0xff;//exp是无符号数
  sign=(uf>>31)&0x1;
  frac=uf&0x7fffff;
  E=exp-Bias;//E是有符号数
  if(exp==0||E<0)//非规格化数和阶码小于0的数全部在0两侧
    return 0;
  else
  {
    if(E>=31||exp==0xff)//INFINITY和NaN
      ret=0x80000000u;
    else//E>=0 规格化数
    {
      //(1+f)*(2^E)
      frac=(1<<23)|frac;//其中f为二进制表示的小数部分,f*(2^E)表示f左移E位
      if(E<23)//frac部分的小数没办法全部进位到整数部分,舍去
        ret=frac>>(23-E);//只保留E+1位
      else
        ret=frac<<(E-23);//保留E+1位
    }
    if(sign==1)//负数
      ret=-ret;
  }
  return ret;
}
```

向0舍入，即直接丢掉小数点后的数字

首先，非规格化数肯定<1,直接返回0即可

![](https://cdn.jsdelivr.net/gh/Easter1995/blog-image/202308181502031.JPG)

# 13. floatPower2

```c
/* 返回2^x
 * floatPower2 - Return bit-level equivalent of the expretsion 2.0^x
 *   (2.0 raised to the power x) for any 32-bit integer x.
 *
 *   The unsigned value that is returned should have the identical bit
 *   repretentation as the single-precision floating-point number 2.0^x.
 *   If the retult is too small to be repretented as a denorm(非规格化数), return
 *   0. If too large, return +INF.
 * 
 *   Legal ops: Any integer/unsigned operations incl. ||, &&. Also if, while 
 *   Max ops: 30 
 *   Rating: 4
 */
unsigned floatPower2(int x) {
    unsigned ret,sign,exp,frac;
    unsigned INF=0xff<<23;//exp=0xff
    //规格化浮点数最大的:exp=11111110=2^8-1-1=254 Emax=254-127=127
    //规格化浮点数最小的:exp=1 Emin=1-127=-126
    //非规格化浮点数最大的:exp=0 E=1-127=-126 frac=2^(-1) 指数max=-127
    //非规格化浮点数最小的:exp=0 E=1-127=-126 frac=2^(-23) 指数min==-149
    if(x>127)//too large
      ret=INF;
    else if(x<-149)//too small
      ret=0;
    else if(x>=-126)//规格化数
    {
      sign=0;
      exp=(x+127)<<23;
      frac=0x0;
      ret=sign|exp|frac;
    }
    else//非规格化数 E=1-127=-126 2^x=2^(-126)*2^(x+126)
    {
      sign=0;
      exp=0;
      frac=1>>(-x-127);
      ret=sign|exp|frac;
    }
    return ret;
}
```

找到指数最大最小即可

1.范围在规格化数里

​	x就是E exp=E+Bias

2.范围在非规格化数里

​	x里面已经包含了非规格化数固定的1-Bias=-126 剩下的部分在frac里面实现 还剩x+126次方 即1>>(-x-126-1)



















