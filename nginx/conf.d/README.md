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
example.ssl.conf
```
server {
    listen 80;
    server_name example.com;
    
    location /.well-known/acme-challenge/ {
        default_type "text/plain";
        root /app/plugins/certbot/certbot/www/;
    }

    location / {
        return 301 https://example.org$request_uri;
    }
}
server {
    listen 443 ssl;
    server_name example.com;

    # ssl_certificate /app/plugins/certbot/certbot/conf/live/example.com/fullchain.pem;
    # ssl_certificate_key /app/plugins/certbot/certbot/conf/live/example.com/privkey.pem;

    location / {
        proxy_pass https://0.0.0.0:4430/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_ssl_verify off;
    }   
}
```
