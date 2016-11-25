# The Reckoning!

[![Build Status](https://travis-ci.org/18F/the-reckoning.svg?branch=master)](https://travis-ci.org/18F/the-reckoning) [![Test Coverage](https://codeclimate.com/github/18F/the-reckoning/badges/coverage.svg)](https://codeclimate.com/github/18F/the-reckoning/coverage) [![Code Climate](https://codeclimate.com/github/18F/the-reckoning/badges/gpa.svg)](https://codeclimate.com/github/18F/the-reckoning) [![Continua11y](https://continua11y-staging.apps.cloud.gov/badges/18F/the-reckoning/master)](https://continua11y-staging.apps.cloud.gov)

`the-reckoning` is an application to aid our accounting team in
integrating several data sources in order to reduce the time to invoice.

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for additional information.

## Development work
This is an express application written in node.js. Install all
dependencies via:

    npm install

This is a basic express app, so there are a couple of npm scripts to
make reloading the application while working almost seamless.

To reload the general application code while running a server use this
script:

    npm run dev

Unfortunately, rerunning the sass is a different process. To compile the
css takes an additional script:

    npm run dev_sass

Running both those scripts while developing can give a good reloadable
environment.

#### Environmental variables

To get started copy the sample file to `.env`.

    cp .env-sample .env


#### Database

Database is postgres and you need to create these databases outside the
application scripts:

    createdb the-reckoning-test # for test env
    createdb the-reckoning-development # for development

The database sql abstraction is provided by the module `knex`, and other database configuration options can be found in the `./knexfile.js`.

Migrations are also handled by this module.

Creating a new migration can be done via:

    node_modules/.bin/knex migrate:make ___migration_name_here___

Migrate the databases via

    NODE_ENV=development node_modules/.bin/knex migrate:latest
    NODE_ENV=test        node_modules/.bin/knex migrate:latest

#### Testing

All types of tests use `mocha` as the test runner.

Run tests via `npm test`. Under the covers that runs mocha recursively
on the test directory.

See mocha documentation for details about running tests in isolation or
running a single file.

#### Starting the app

There is a script for that:

    npm start

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.

