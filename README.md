# Node JS Backend Template

The templates are stuctured by Router-Controller-Model patterm

  - contollers/
  - exceptions/
  - models/
  - routes


# Features!

- #### Contollers 
  -  All the route logic goes
  -  Files are named as `<function>-contoller.js`
- ### Exceptions
    - All the errors are handled by the `error.js` file
    - define the default error template
    - The naming is based on the `<function>-controller.js`
    - Each controller has specific `Error` classes also
```js
    class <function>Error extends Error {
        constructor(message) {
            super(message);
            this.status = 401;
            this.code = "UNAUTHORIZED";
            this.error = "ValidateError";
            this.msg = message;
        }
    }
```
- ### Models
    - All the DB based operations are abstracted to this folder.
    - Also the naming is based on the `<function>-model.js`

- ### Routes
    - All the application routes are defined over here
    - Naming `<function>-routes.js`, uses express router

## Flow

![Flow diagram](https://i.ibb.co/TqPYHy3/Screen-Shot-2019-02-04-at-1-23-11-PM.png)


## Run Test case:
```sh
$ mocha test/*-test.js
```

- with Siv S
