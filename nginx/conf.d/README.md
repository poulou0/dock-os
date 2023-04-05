All ".conf" files in this directory will be included :))

example.conf
```
server {
    listen 80;
    server_name example.com;

    location / {
        add_header Content-Type text/plain;
        return 200 'Cogito, ergo sum,';
    }
}
server {
    listen 80;
    server_name localhost;

    location /media {
        root /app;
        autoindex on;
    }
}
```
