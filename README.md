This repository contains the well known game of Rock-Paper-Scissors in variation where player tests himself against a server.
In project there are no external libraries in production code other than node provides.

Project preview @: https://rock-paper-scissors1.herokuapp.com/

How to get this running on Ubuntu:
Create a folder you would like the project to be in
* mkdir rock-paper-scissors
* cd rock-paper-scissors

Initialize and pull git repository
* git init
* git pull https://github.com/captainCapitalism/rock-paper-scissors

To run it (given you have node installed)
* node src/server.js
at default server will listen at http://localhost:3000

If you would like to run some tests you have to build npm package
* npm i

and ready (remember to have a server running for e2e/integration).
* npm run test

You can also run a single test-file
* npm run test-one PATH/TO/FILE (ex. spec/e2e.spec.js)

To run e2e and integration tests against non-localhost server specify an enviromental variable for its address:
* export TESTSERVER="https://rock-paper-scissors1.herokuapp.com/"
* npm run test
(unit tests will still run for local files)