FROM node:lts-alpine

ENV PORT=4567

COPY . /code
WORKDIR /code

CMD ["npm", "start"]

