- 1 找到端口号对应的 pid
  `netstat -ano|findstr 端口号`
- 2 根据 pid 关闭该进程
  `taskkill /pid 端口号对应 pid 的值 /F`
