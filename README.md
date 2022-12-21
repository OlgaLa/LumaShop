# LumaShop

The project contains UI tests for [a e-commerce site](https://magento.softwaretestingboard.com/). 

## How to run tests

1. Clone the project
2. Go to the project folder
3. Run `npm install`
4. Run the command in terminal from the project folder:

`npx playwright test`

If you want to run Chromium not in a headless mode just add `--headed` to the previous command:

```bash
npx playwright test --headed
```

## How to run tests in Docker

If you don't have Node.JS installed on your machine you can run same tests in Docker.

1. [Install Docker](https://docs.docker.com/get-docker/) on your local machine 
2. Clone the project 
3. Go to the project folder
4. Run the command in terminal in the progect folder:

Linux/MacOS:

```bash
docker-compose --file tools/docker/docker-compose.e2e.yml up
```
If you are going to run the tests on Windows machine, please change `${PWD}` in `docker-compose.e2e.yml` to the absolute path to the project folder.

## View the test trace

Test resuslt traces are stored in the folder `test-results`. To see the trace you should go to one of the test folders and run the following command:

`npx playwright show-trace trace.zip` 

## View the test report produced by CI 

This repository contains a GitHub Actions build pipeline which is triggered on every push. It executes `npx playwright test` command in a docker container, and then uploads test reports as build artifacts. 

You can find and download them by navigating to https://github.com/OlgaLa/ and selecting the latest run log. The artifacts would be located in **Artifacts** section at the bottom of the page.

