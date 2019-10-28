#!/usr/bin/env bash
# shell脚本的打印
# read命令，窗口输入值
# read name
# echo "my name is : $name "

# 开启转义
# v="Hello"
# echo -e "$v \c"
# echo "aaa"

# 打印结果
# echo $(date)

# read命令
# -p 输入提示文字
# -n 输入字符长度限制(达到6位，自动结束)
# -t 输入限时
# -s 隐藏输入内容
# read one two
# echo "参数1：$one，参数2 $two"

read -p 请输入密码 -n 6 -t 5 -s password
echo -e "\n您输入的密码为 $password"
