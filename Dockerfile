FROM alpine:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN apk add --update nodejs nodejs-npm && npm install
ENV PORT 8085
ENV NODE_ENV test
ENV SECRET 1234567890
EXPOSE 8085
RUN npm run migrate
CMD [ "npm", "start" ]