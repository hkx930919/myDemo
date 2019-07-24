#!/usr/bin/env bash
# shell脚本的数组

# 坑：赋值时等号两边不能有空格
# my_array=(1 2 3 4)
# echo "数组长度 ${#my_array[*]}"
# echo "数组所有值1 ${my_array[*]}"
# echo "数组所有值2 ${my_array[@]}"
# echo "数组的第一个值 ${my_array[0]}"

readonly a="hkx"
echo "111 $a"
a="ccc"
echo "222 $a"
