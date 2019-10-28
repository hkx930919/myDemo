## 1 文件目录

- `/etc/nginx`
- `/etc/nginx/nginx.conf`配置文件
- `/etc/nginx/conf.d/`目录新建配置文件

## 2 伪静态

在 `/etc/nginx/conf.d/`目录新建虚拟主机

```sh
   server {
	    listen       8081;
        listen       [::]:8081;
        ## 静态域名
        server_name  www.hkx.abc;
        ## 日志格式
        log_format  hhh   '$remote_addr（地址）  $remote_user [$time_local]（时间） "$request"（请求）';
        ## 指定日志路径和格式化
        access_log  /var/log/nginx/access.log  hhh;
        location / {
            root    /data/www;
            index   index.html;
            ## 将`.ng`结尾的文件重定向到/index.html
            rewrite ^(.*)\.ng$ /index.html;
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }

```

## 3 反向代理
