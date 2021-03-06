![Moleculer logo](http://moleculer.services/images/banner.png)

[![Build Status](https://travis-ci.org/ice-services/moleculer-addons.svg?branch=master)](https://travis-ci.org/ice-services/moleculer-addons)
[![Coverage Status](https://coveralls.io/repos/github/ice-services/moleculer-addons/badge.svg?branch=master)](https://coveralls.io/github/ice-services/moleculer-addons?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e52ed1ab0d014f16b1ed8e45d244b05c)](https://www.codacy.com/app/mereg-norbert/moleculer-addons?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ice-services/moleculer-addons&amp;utm_campaign=Badge_Grade)
[![Code Climate](https://codeclimate.com/github/ice-services/moleculer-addons/badges/gpa.svg)](https://codeclimate.com/github/ice-services/moleculer-addons)
[![Known Vulnerabilities](https://snyk.io/test/github/ice-services/moleculer-addons/badge.svg)](https://snyk.io/test/github/ice-services/moleculer-addons)
[![Join the chat at https://gitter.im/ice-services/moleculer](https://badges.gitter.im/ice-services/moleculer.svg)](https://gitter.im/ice-services/moleculer?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Official addons for Moleculer framework
This is a monorepo, contains multiple services & addons for Moleculer project.

<!-- AUTO-GENERATED-CONTENT:START (RENDERLIST:folder=packages&title=Generals) -->
## Generals
| Name | Version | Description |
| ---- | ------- | ----------- |
| [moleculer-db](/packages/moleculer-db#readme) | [![NPM version](https://img.shields.io/npm/v/moleculer-db.svg)](https://www.npmjs.com/package/moleculer-db) | Moleculer service to store entities in database |
| [moleculer-db-adapter-mongoose](/packages/moleculer-db-adapter-mongoose#readme) | [![NPM version](https://img.shields.io/npm/v/moleculer-db-adapter-mongoose.svg)](https://www.npmjs.com/package/moleculer-db-adapter-mongoose) | Mongoose adapter for Moleculer DB service |
| [moleculer-elasticsearch](/packages/moleculer-elasticsearch#readme) | [![NPM version](https://img.shields.io/npm/v/moleculer-elasticsearch.svg)](https://www.npmjs.com/package/moleculer-elasticsearch) | Elasticsearch service for Moleculer. |
| [moleculer-fake](/packages/moleculer-fake#readme) | [![NPM version](https://img.shields.io/npm/v/moleculer-fake.svg)](https://www.npmjs.com/package/moleculer-fake) | Fake data generator by Fakerator |
| [moleculer-mail](/packages/moleculer-mail#readme) | [![NPM version](https://img.shields.io/npm/v/moleculer-mail.svg)](https://www.npmjs.com/package/moleculer-mail) | Send emails |
| [moleculer-twilio](/packages/moleculer-twilio#readme) | [![NPM version](https://img.shields.io/npm/v/moleculer-twilio.svg)](https://www.npmjs.com/package/moleculer-twilio) | Send SMS Message with Twilio. |
<!-- AUTO-GENERATED-CONTENT:END -->

# Contribution

## Install dependencies
```bash
$ npm run setup
```

## Development
**Run the `simple` example in `moleculer-mail` service with watching**
```bash
$ npm run dev moleculer-mail
```

**Run the `full` example in `moleculer-fake` service w/o watching**
```bash
$ npm run demo moleculer-fake full
```

## Test
```bash
$ npm test
```

## Create a new addon
```bash
$ npm run init moleculer-<modulename>
```

## Publish new releases
```bash
$ npm run release
```

# License
The project is available under the [MIT license](https://tldrlegal.com/license/mit-license).

# Contact
Copyright (c) 2016-2017 Ice Services

[![@ice-services](https://img.shields.io/badge/github-ice--services-green.svg)](https://github.com/ice-services) [![@MoleculerJS](https://img.shields.io/badge/twitter-MoleculerJS-blue.svg)](https://twitter.com/MoleculerJS)
