URLde la librería publicada https://www.npmjs.com/package/efemerides
# NodePop

[Demo](/anuncios) of the methods (this link works only if you run the project)

Api for the iOS/Android apps.

## Deploy

### Install dependencies

    npm install

### Configure

Copy .env.example to to your custom .env.

```sh
cp .env.example .env
```

And setup your configuration.

### Init database

    npm run initDB

## Start

To start a single instance:

    npm start

To start in development mode:

    npm run dev (including nodemon & debug log)

## Test

    npm test (pending to create, the client specified not to do now)

## ESLint

    npm run hints

## API v1 info

### Base Path

The API can be used with the path:
[API V1](/apiv1/anuncios)

### Error example

    {
      "error": {
        "code": 401,
        "message": "This is the error message."
      }
    }

### GET /anuncios

**Input Query**:

start: {int} skip records
limit: {int} limit to records
sort: {string} field name to sort by
includeTotal: {bool} whether to include the count of total records without filters
tag: {string} tag name to filter
venta: {bool} filter by venta or not
precio: {range} filter by price range, examples 10-90, -90, 10-
nombre: {string} filter names beginning with the string

Input query example: ?start=0&limit=2&sort=precio&includeTotal=true&tag=mobile&venta=true&precio=-90&nombre=bi

**Result:**

    {
      "result": {
        "rows": [
          {
            "_id": "55fd9abda8cd1d9a240c8230",
            "nombre": "iPhone 3GS",
            "venta": false,
            "precio": 50,
            "foto": "/images/anuncios/iphone.png",
            "__v": 0,
            "tags": [
              "lifestyle",
              "mobile"
            ]
          }
        ],
        "total": 1
      }
    }

### GET /anuncios/tags

Return the list of available tags for the resource anuncios.

**Result:**

    {
      "result": [
        "work",
        "lifestyle",
        "motor",
        "mobile"
      ]
    }

## Actualización de la API
Las mejoras incluidas son las siguientes:

#### Seguridad de la API
Se ha securizado toda la API requiriendo un token de usuario para todas sus consultas. El token se puede obtener haciendo login a:

```
POST: http://localhost:3000/api/login
```

Con un nombre de usuario y una contraseña valida en el body. Sehan dado de alta los acordados en clase y enunciado de la práctica

#### Internacionalización de la vista

La vista de anuncios se ha internacionalizado con el módulo `i18n`. lapágina de anuncios
#### Micro servicio de minificación de imagenes

La ruta de subida de anuncios a la api:

```
POST:http://localhost:3000/apiv1/anuncios
```

Permite enviar un fichero de imagen en el campo foto. Si la api recibe esta imagen la guarda en el directorio de imagenes(public/anuncios), guarda la ruta en la DB i hace lo mismo con su correspondiente thumbnail a traves de un microservicio creado en cote.
El nombre  del thumbnail es el guardado en el anuncio con el prefijo"thumb-"

para que funcione hay que arrancar el microservicio con:
```
npm run imageResize
```
