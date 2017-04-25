# react-express-boilerplate
Server Side Rendering (only production mode) using express.

## Getting started

### Prerequisites

- Node.js ^6.x
- npm ^3.x
- yarn ^0.x
- pm2 ^2.x

### Usage


Install yarn and pm2
  ```
  $ npm install -g yarn pm2
  ```

3. Rename config file and then edit the file. (`.env.example` to `.env`)
  ```
  PORT=4000
  DEV_PORT=3000
  SECRET_KEY="SECRET_KEY"
  OG_TITLE=
  OG_DESCRIPTION=
  OG_IMAGE=
  TITLE="React Express Boilerplate"
  ```

4. Run server
  ```
  for development (using HMR)
  $ yarn start:dev
  for production (using pm2)
  $ yarn start:prod
  $ yarn stop
  ```

## License

MIT License
