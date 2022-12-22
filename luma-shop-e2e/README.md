# LumaShop

This directory contains a UI tests project for [an e-commerce site](https://magento.softwaretestingboard.com/). 

## How to run tests

1. Clone the project
2. Go to the project folder
3. Run `npm install`
4. Run the command in terminal from the project folder:

```bash
npx playwright test
```

If you want to run Chromium not in a headless mode just add `--headed` to the previous command:

```bash
npx playwright test --headed
```
By default the tests are run in parallel with 4 workers. If you want to override it use the following command:

```bash
npx playwright test --headed --workers=1
```

## How to run tests in Docker

If you don't have Node.JS installed on your machine you can run same tests in Docker.

1. [Install Docker](https://docs.docker.com/get-docker/) on your local machine 
2. Clone the project 
3. Go to the project folder
4. Run the command in terminal in the progect folder:

Linux/MacOS:

```bash
docker compose --file tools/docker/docker-compose.e2e.yml up && docker compose  --file tools/docker/docker-compose.e2e.yml rm
```
If you are going to run the tests on Windows machine, please change `${PWD}` in `docker-compose.e2e.yml` to the absolute path to the project folder.

## View the test trace

Test resuslt traces are stored in the folder `test-results`. To see the trace you should go to one of the test folders and run the following command:

`npx playwright show-trace trace.zip` 

## View the test report 

The test report is stored in the folder `test-results/test-report`. It is a HTML report. To se it you should go to the test report folder and open `index.html` in a browser.

## View the test report produced by CI 

This repository contains a GitHub Actions build pipeline that can be triggered by on every push to main branch, pull request or manualy. It executes `npx playwright test` command in a docker container, and then uploads test reports as build artifacts. 

You can find and download them by navigating to https://github.com/OlgaLa/LumaShop/actions and selecting the latest run log. The artifacts would be located in **Artifacts** section at the bottom of the page. 

**Note** artifacts renention period is set to 45 days, they are deleted after this period.

