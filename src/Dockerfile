FROM node:16-alpine

WORKDIR /usr/src/app

COPY node_modules /usr/src/app/node_modules/
COPY tsconfig.json /usr/src/app/
COPY package* /usr/src/app/
COPY dist /usr/src/app/dist/

EXPOSE 17777
CMD [ "npm", "run", "start:prod" ]
