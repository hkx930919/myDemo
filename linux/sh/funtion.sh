#!/usr/bin/env bash

# shell脚本的for switch 语句
fn(){
    echo "this is my first function in shell"
}
fn


myFn(){
    echo "第一个参数 ${1}"
    echo "第一个参数 ${2}"
    echo "第一个参数 ${3}"
}
myFn a b c



addFn(){
    echo "这个函数会对输入的值进行相加"
    read -p 请输入第一个值 num1
    read -p 请输入第二个值 num2
    echo "两个值分别是 $num1 $num2"
    return `expr $num1 + $num2`
}
addFn
echo "输入的两值之和为 $? !"