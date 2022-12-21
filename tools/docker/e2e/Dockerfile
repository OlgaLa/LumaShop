FROM mcr.microsoft.com/playwright

COPY . /build
WORKDIR /build

RUN npm ci --ignore-scripts --loglevel=error