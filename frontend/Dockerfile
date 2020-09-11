FROM node:12-alpine AS runtime
RUN apk add --no-cache curl

WORKDIR /app
ENV NODE_ENV=production
EXPOSE 3000

COPY package.json yarn.lock /app/
COPY .yarn /app/
RUN yarn install --production --frozen-lockfile --cache-folder .yarn

COPY . /app/
RUN touch /app/.env
ARG SENTRY_RELEASE
ENV SENTRY_RELEASE=$SENTRY_RELEASE

USER node
ENV NODE_PATH=/app/dist
CMD ["node", "dist/index.js"]
