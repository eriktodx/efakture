# fakture

Simple invoicing app made in Angular and powered by Firebase. You can see it in action [here](https://fakture.kralj.dev/).

## Install

This project uses [node](http://nodejs.org), [yarn](https://yarnpkg.com), [Angular](https://angular.io) and [Firebase](https://firebase.google.com). Go check them out if you don't have them locally installed.

### Before you can start

Make sure you run `yarn install` to install all required packages.

### Development

You can start a development server by running command `yarn run start` (in-memory) or `yarn run watch` (on-disk).

Use `./node_modules/.bin/firebase emulators:start --import=./data --export-on-exit=./data` to start firebase emulators (this command [requires Java version 1.8 or higher](https://firebase.google.com/docs/emulator-suite/install_and_configure)).

Running tests requires `firefox-headless` to be installed on the system and binary named `firefox` to be in PATH. On Ubuntu you can just install the `firefox` or `firefox-esr` package via `apt`.

### Deployment

- Login to firebase, eg. `firebase login --no-localhost`
- Prepare build with `npm run deploy`
- Deploy build to firebase `firebase deploy`

## Maintainers

[@erikvimz](https://github.com/erikvimz).

## Contributing

Feel free to dive in! [Open an issue](https://github.com/erikvimz/efakture/issues/new) or submit PRs.

Project follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.

### Contributors

This project exists thanks to all the people who contribute.

## License

[MIT](LICENSE) © Erik Kralj
