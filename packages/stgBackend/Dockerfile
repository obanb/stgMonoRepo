FROM node:10

MAINTAINER obanb <ratpile@gmail.com>

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app
RUN npm install

# Delete .npmrc. It is needed for npm install, but contains private key to NPM repository and we don't want to leave that in a docker image.
RUN rm .npmrc

# Build application
RUN cd /usr/src/app && npm run build

# Add arguments to process.env from docker build --build-arg xx
ARG GIT_COMMIT
ENV GIT_COMMIT=$GIT_COMMIT

ARG GIT_BRANCH
ENV GIT_BRANCH=$GIT_BRANCH

ARG BUILD_NUM
ENV BUILD_NUM=$BUILD_NUM

ARG BUILD_AUTHOR
ENV BUILD_AUTHOR=$BUILD_AUTHOR

ENV TZ=Europe/Prague

EXPOSE 8080
CMD ["npm", "start"]
