FROM node:22-alpine
WORKDIR /app

COPY ./package.json turbo.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ./apps/backend-repo ./apps/backend-repo
COPY ./packages ./packages

RUN apk update \
    && apk -u list \
    && apk upgrade

RUN rm -rf node_modules .~/.npm \
    && npm cache clean -f \
    && npm config delete proxy \
    && npm config delete https-proxy \
    && npm config set fetch-retry-mintimeout 3600000 \
    && npm config set fetch-retry-maxtimeout 3600000 \
    && npm config set fetch-timeout 3600000 \
    && npm i pnpm@latest pm2@latest turbo@latest -g --loglevel verbose \
    && pnpm i --loglevel verbose \
    && pnpm run build

EXPOSE 4000
CMD ["pnpm", "turbo", "run", "runtime" , "-F=backend-repo"]