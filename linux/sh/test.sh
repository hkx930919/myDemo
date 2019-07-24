#!/usr/bin/env bash
# test命令

# 数值

# 参数	说明
# -eq	等于则为真
# -ne	不等于则为真
# -gt	大于则为真
# -ge	大于等于则为真
# -lt	小于则为真
# -le	小于等于则为真
a=100
b=200
if test $a -eq $b; then
    echo 'a等于b'
else
    echo 'a不等于b'
fi

# 字符串
# 参数	        说明
# =	            等于则为真
# !=	            不相等则为真
# -z 字符串	    字符串的长度为零则为真
# -n 字符串	    字符串的长度不为零则为真

str1='aaa'
str2='bbb'
if test $str1 = $str2; then
    echo 'str1等于str2'
else
    echo 'str1不等于str2'
fi
