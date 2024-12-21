# K6 Testing Repository

This repository contains various K6 test scripts for performance testing, including basic HTTP tests, advanced learning scripts, and npm-based K6 tests.

## Repository Structure

```
.gitignore
advancedLearning/
    browser.js
    credentials.csv
    credentials.json
    credentialsGenerator.js
    k6-test-api-cloud.js
    login.js
    parameterization.js
    readFromCSV.js
    registration.js
basicConceptTests/
    breakpointTest.js
    customMetrics.js
    customTags.js
    groupsTest.js
    httpBasicTest.js
    k6Structure.js
    loadTest.js
    smokeTest.js
    soakTest.js
    spikeTest.js
    stressTest.js
    tags.js
basicHTTPTests/
    basicDELETETest.js
    basicGETTest.js
    ...
npmK6Test/
    loader.js
    master.js
package.json
README.md
summary.html
```

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- K6 (v0.32.0 or higher)

### Installation

1. Clone the repository:

2. Install the dependencies:
    ```sh
    npm install
    ```
## Running Tests

### Basic HTTP Tests

Navigate to the `basicHTTPTests` directory and run any of the test scripts using K6:

```sh
k6 run basicGETTest.js
```

### Advanced Learning Scripts

Navigate to the `advancedLearning` directory and run any of the test scripts using K6:

```sh
k6 run parameterization.js
```

### NPM-based K6 Tests

Navigate to the `npmK6Test` directory and run the tests using Node.js:

```sh
node loader.js
node master.js
```

## Scripts Overview

### `advancedLearning/parameterization.js`

This script demonstrates parameterization in K6 tests. It fetches a list of crocodiles from a public API, selects a random crocodile, and performs checks on the response.

### `advancedLearning/credentialsGenerator.js`

This script generates random user credentials and writes them to a JSON file. It can append new data to existing credentials if specified.

### `npmK6Test/loader.js`

This script sets an environment variable and writes it to a `.env` file. It also exports a `main` function that returns a value.

### `npmK6Test/master.js`

This script logs environment variables to the console.

## Generating Reports

After running the tests, you can generate HTML reports using the `handleSummary` function in the test scripts. The reports will be saved as `summary.html` in the root directory.