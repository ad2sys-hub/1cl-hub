# ════════════════════════════════════════
# STAGE 1 — Builder
# ════════════════════════════════════════
FROM node:24-alpine AS builder

WORKDIR /app

# Install dependencies first (layer cache optimization)
COPY package*.json ./
RUN npm ci --frozen-lockfile

# Copy source and build
COPY . .

# Build args for Supabase env vars at build time
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

RUN npm run build

# ════════════════════════════════════════
# STAGE 2 — Production Server (Nginx)
# ════════════════════════════════════════
FROM nginx:1.27-alpine AS production

# Copy custom Nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Run uses PORT env var (default 8080)
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
