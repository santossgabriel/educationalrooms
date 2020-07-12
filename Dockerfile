FROM alpine:latest
COPY . /root/app
WORKDIR /root/app
RUN apk add --update nodejs nodejs-npm && \
  npm install && \
  npm run migrate && \
  cd client/react && \
  npm install && \
  npm run build && \
  cd - && \
  rm -rf client && \
  npm run build && \
  rm -rf /root/.npm/
ENV PORT 80
ENV NODE_ENV test
ENV SECRET 1234567890
EXPOSE 80
CMD [ "npm", "start" ]