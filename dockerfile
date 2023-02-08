# 基础镜像
FROM nginx:latest

# 删除默认的default.conf
RUN rm /etc/nginx/conf.d/default.conf

# 替换default.conf
ADD default.conf /etc/nginx/conf.d/

# 拷贝打包后的dist到html目录下
ADD docs/.vuepress/dist/ /usr/share/nginx/html/