# ── Stage: Desenvolvimento ─────────────────────────────────────
FROM node:20-alpine AS dev

WORKDIR /app

# Copia apenas package files primeiro para cache de dependências
COPY package.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta do Vite
EXPOSE 3000

# Habilita polling para hot-reload funcionar em todos os OS
ENV CHOKIDAR_USEPOLLING=true

CMD ["npm", "run", "dev"]

# ── Stage: Produção (opcional) ─────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json ./
RUN npm install --production=false

COPY . .
RUN npm run build

# ── Stage: Serve ───────────────────────────────────────────────
FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

# Configuração customizada do Nginx para SPA
COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
EOF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]