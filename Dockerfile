FROM nginx:stable
ADD docs /usr/share/nginx/docs
ADD nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80