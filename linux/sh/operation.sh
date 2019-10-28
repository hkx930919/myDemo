#!/usr/bin/env bash
# shell脚本的运算

# 算数运算符

a=10 b=20
echo $a $b
# 计算时加号两边要有空格
echo "a+b=$(expr $a + $b)"

val=$(expr $a - $b)
echo "a-b:$val"

val=$(expr $a \* $b)
echo "a*b:$val"

val=$(expr $a / $b)
echo "a/b:$val"

val=$(expr $a % $b)
echo "a%b:$val"

if [ $a == $b ]; then
    echo "a 等于 b"
fi
if [ $a != $b ]; then
    echo "a 不等于 b"
fi
