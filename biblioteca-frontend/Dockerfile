# Usa Node 22
FROM node:22

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe as portas do Expo (caso precise)
EXPOSE 19000

# Comando padrão
CMD ["npx", "expo", "start", "--tunnel"]