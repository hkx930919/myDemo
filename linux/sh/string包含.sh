#!/usr/bin/env bash
# shell脚本的字符串

# 只读
# readonly a="hkx"
# echo "111 $a"
# a="ccc"
# echo "222 $a"

# word="hello world!"
# echo $word
# echo "字符串的长度 ${#word}"
# echo "拼接字符串 $word"

# echo "截取字符串第3位开始，截取6位 ${word:2:6}"
# unset word
# echo "删除了word变量，打印${word}"

url="scuser@git.hljnbw.cn:luohanlin/haicaoyun-front.git"
url=${url#*scuser@git.hljnbw.cn:}
echo "删除scuser@git.hljnbw.cn ${url}"
# echo ${url#*/}
url=${url%.*}
echo "删除. ${url}"
url=${url#*/}
echo "删除/ ${url}"
