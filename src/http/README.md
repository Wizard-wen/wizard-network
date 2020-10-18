# HTTP

curl -v http://127.0.0.1:1337

```http request
*   Trying 127.0.0.1:1337...
* TCP_NODELAY set
* Connected to 127.0.0.1 (127.0.0.1) port 1337 (#0)
> GET / HTTP/1.1
> Host: 127.0.0.1:1337
> User-Agent: curl/7.65.3
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Content-Type: text/plain
< Date: Sun, 18 Oct 2020 07:16:01 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
< 
Hello World
* Connection #0 to host 127.0.0.1 left intact
```

