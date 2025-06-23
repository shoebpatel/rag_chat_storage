FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]

# docker build -t rag-chat-storage .
# docker run -p 3000:3000 --env-file .env rag-chat-storage