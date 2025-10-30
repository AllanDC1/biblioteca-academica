FROM node:22

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 19000 19001 19002

CMD ["npm", "start"]