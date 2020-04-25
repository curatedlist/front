# Step by step guide for this frontend app.

This is the frontend app for curatedli.st

# Instaructions to run the app

## Development mode

```bash
$ yarn start
```

# Development Guide
## Create React app

See: https://reactjs.org/docs/create-a-new-react-app.html
```bash
$ npx create-react-app front
$ yarn install
$ yarn start
$ yarn add node-sass
```

## Install Argon Design System

See: https://demos.creative-tim.com/argon-design-system-react/#/

```bash
$ yarn add argon-design-system-react
```

## Install Dependencies

```bash
$ yarn add reactstrap
$ yarn add headroom
$ yarn add jquery
```

## Add React Router

See https://reacttraining.com/react-router/

```bash
$ yarn add react-router-dom
```

## Add the Magic Link SDK

See https://docs.magic.link/
```bash
$ yarn add magic-sdk
```

## Dockerize

See https://mherman.org/blog/dockerizing-a-react-app/

### Development mode 

* Build the image
```bash
$ docker build -t curatedlist-project:front-dev .
```

* Run the image
```bash
$ docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3000:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    curatedlist-project:front-dev
```

### Production mode

* Build the image
```bash
$ docker build -f Dockerfile.prod -t curatedlist-project:front .
```

* Run the image
```bash
$ docker run -it --rm -p 80:80 curatedlist-project:front
```

