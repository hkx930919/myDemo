### 替换默认源

按照[163 源帮助文档](http://mirrors.163.com/.help/centos.html)进行操作，替换 yum 源地址，之后下载 vim

### 使用 xshell 连接虚拟机

获取虚拟机 ip 地址，要将虚拟机的网络连接方式改为桥接方式，输入`ifconfig`命令获取 ip 地址。

默认装的虚拟机，`ifconfig`命令无效，使用`vi /etc/sysconfig/network-scripts/ifcfg-enp0s3`打开配置文件，将`ONBOOT`改为`yes`
