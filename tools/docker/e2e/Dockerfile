FROM mcr.microsoft.com/playwright:v1.29.0-focal

COPY . /build
WORKDIR /build

RUN npm ci --ignore-scripts --loglevel=error