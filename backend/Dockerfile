FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate --schema=src/prisma/schema.prisma

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy --schema=src/prisma/schema.prisma && npx prisma db seed && node src/app.js"]
