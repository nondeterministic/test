### Quickstart for the impatient
The REST-API that this project implements is permanently located at
[https://radiant-refuge-91162.herokuapp.com/wines](https://radiant-refuge-91162.herokuapp.com/wines).

***

### Prerequisites
This project is a simple REST-API demonstration using Node.js.  You will need Node.js (obviously) and MongoDB
installed in order to execute it on your own machine.  If you are merely interested in trying out the permanently
installed cloud application, you may instead skip this section.

#### Files of this project
Below you will find a brief description of the various project files:

     Procfile     - default Heroku configuration for cloud deployment
     package.json - project configuration for Node.js app
     doc/         - some additional files for project documentation (you may safely ignore this)
     
     *.js         - the Node.js app files
     test/        - the Node.js test files for the app

### Environment variables for installing and running the project yourself
This project needs two environment variables to be defined. If you are using bash, you could set them
as follows when running the project locally on your own machine:

     export MONGO_URL='mongodb://localhost/challengedb'
     export SERVER_URL='http://localhost:3000'

That is, if `challengedb` is your MongoDB database name and 3000 the TCP-port of your REST-server.

***

### Testing

The tests are implemented using the `Mocha` framework.  You could execute them, for example, using
the following command, assuming you have properly installed and downloaded all the required project
dependencies, etc.:

    ./node_modules/.bin/mocha --reporter spec

If all goes well, the result should be similar to this
![Test output](doc/test2.png)
