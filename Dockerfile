FROM node:latest

RUN apt-get update && apt-get -y install \
    curl \
    vim \
    bash \
    nano \
    tree \
    git \
    libfontconfig

USER root

RUN npm install -g \
    gulp \
    express-generator \
    http-server \
    rollup

RUN npm -g --unsafe-perm install node-sass

# ability to run puppeteer inside a Docker container
# https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
RUN apt-get update \
	&& apt-get install -y wget --no-install-recommends \
	&& wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
	&& sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
	&& apt-get update \
	&& apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont --no-install-recommends \
	&& rm -rf /var/lib/apt/lists/* \
	&& apt-get purge --auto-remove -y curl \
	&& rm -rf /src/*.deb

# It's a good idea to use dumb-init to help prevent zombie chrome processes.
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

# Create the development environment
RUN mkdir /www
RUN chmod 777 /www

# Expose port
EXPOSE 3000

# Run with bash
WORKDIR /www
CMD ["/bin/bash"]
