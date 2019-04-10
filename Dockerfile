FROM ruby:alpine
RUN apk add --no-cache curl jq
RUN gem install sinatra
COPY . .
CMD ruby server.rb
