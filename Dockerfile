FROM ubuntu

MAINTAINER Sam L. <esayemm@gmail.com>

# Install programs
RUN apt-get update
RUN apt-get install -y nginx
RUN apt-get install -y nodejs
RUN apt-get install -y nodejs-legacy
RUN apt-get install -y npm

# Cache package.json and node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

##
# App Code
##

# Build the website
WORKDIR /opt/app
ADD . /opt/app
RUN npm run build

# Move built website to nginx html folder
RUN rm -rf /var/www/html
RUN cp -r build /var/www/html

# Replace nginx server config
RUN rm -v /etc/nginx/sites-enabled/default
ADD nginx/default /etc/nginx/sites-enabled/default

# Don't run as daemon, keeps docker container alive
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 80

CMD service nginx start
