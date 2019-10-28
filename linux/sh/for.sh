#!/usr/bin/env bash
# shell脚本的for switch 语句
str='str'
str1='str1'
str2='str2'
str3='str3'
arr=('a' 'b' 'c')
# for v in $arr
# do
# echo "$v $arr"
# done

echo "数组 ${arr[1]}"


# while语句
num=1
while  (($num < 5))
do 
    echo $num
    let "num++"
done