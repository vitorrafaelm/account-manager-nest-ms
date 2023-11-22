FROM node AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node AS production

# Set node env to prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set Working Directory
WORKDIR /usr/src/app

COPY --from=development /usr/src/app .

EXPOSE 8080

CMD [ "node", "dist/main" ]
