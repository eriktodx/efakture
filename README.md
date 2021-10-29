# fakture

Simple invoicing app made in Angular and powered by Firebase. You can see it in action [here](https://fakture.kralj.dev/).

## Install

This project uses [node](http://nodejs.org), [npm](https://www.npmjs.com), [Angular](https://angular.io) and [Firebase](https://firebase.google.com). Go check them out if you don't have them locally installed.

### Before you can start

Make sure you run `npm install` to install all required packages.

### Development

You can start a development server by running command `npm run start` (in-memory) or `npm run watch` (on-disk). After that run `firebase emulators:start --import=./data --export-on-exit=./data` to start firebase emulators.

### Deployment

Is done by GitHub actions. As soon as there is a push to main branch a build, test and deploy workflow is ran.

## Maintainers

[@erikvimz](https://github.com/erikvimz).

## Contributing

Feel free to dive in! [Open an issue](https://github.com/erikvimz/efakture/issues/new) or submit PRs.

Project follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.

### Contributors

This project exists thanks to all the people who contribute.

## License

[MIT](LICENSE) © Erik Kralj
