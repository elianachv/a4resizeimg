<a id="top"></a>

# API REST Procesamiento de imagenes

## Índice
1. [Descripción](#descripcion)
2. [Tecnologías y aplicaciones utilizadas](#tecnologias)
3. [Estructura del proyecto](#estructura)

 * [API](#api)
   * [Peticiones](#api-peticiones)
   * [Respuestas](#api-resultados)
  
   
4. [Despliegue](#despliegue)
5. [Pruebas](#pruebas)
6. [Contacto](#contacto)


<a id="descripcion"></a>
## Descripción
Aplicativo que recibe imágenes en formato JPG de cualquier dimensión (Ancho por alto). Al procesar la imagen define el tamaño que debe tener la misma para entrar en una hoja tamaño A4 (796x1123 pixeles) sin márgenes. El resultado contempla las siguientes restricciones:
1. La imagen no pierde su ratio (Relación de aspecto ancho por alto)
2. Se aprovecha el máximo de la hoja A4
3. Ninguna imagen es agrandada en el proceso, solo encogida cuando corresponda
4. La orientación de la página se define partir de la orientación de la imagen (Horizontal/Vertical)

<a id="tecnologias"></a>
## Tecnologías, aplicaciones y librerías utilizadas

**Desarrollo**
* [JavaScript](https://www.java.com/es/)
* [Node](https://aws.amazon.com/es/)

**Procesamiento de imagenes**
* [Sharp](https://www.npmjs.com/package/sharp)
* [Multer](https://www.npmjs.com/package/multer)

**Pruebas**
* [Postman](https://www.postman.com/)
* [Jest](https://jestjs.io/)
* [Supertest](https://www.npmjs.com/package/supertest)


<a id="estructura"></a>
## Estructura del proyecto

<a id="api"></a>
### API

<a id="api-peticiones"></a>  
**Peticiones**

| Método | Url  |  Descripción |   
|--|--|--|  
|POST| /subir |Procesa la imagen obtenida desde una url|  
|POST| /url  |Procesa la imagen obtenida desde un archivo|  

<a id="api-resultados"></a>  
**Resultados**

El resultado es un objeto con toda la informacion de configuracion de la imagen, acompañada del buffer resultante para que en el frontend se pueda representar el resultado.

```
{
    "position": "horizontal",
    "hoja": {
        "codigo": "A4",
        "ancho_px": 796,
        "altura_px": 1123,
        "ancho_mm": 210,
        "altura_mm": 297,
        "ancho_inch": 8.27,
        "altura_inch": 11.69
    },
    "configurada": true,
    "formato": "jpeg",
    "ancho_inicial": 1280,
    "alto_inicial": 960,
    "ancho_final": 1061,
    "alto_final": 796,
    "buffer": {
        type: "Buffer",
        data: []
    }
}

```

<a id="despliegue"></a>
## Despliegue

### Local

Para levantar la aplicación

1. Descargue el proyecto y ábralo con su editor de texto preferido, se recomienda [Vscode](https://www.jetbrains.com/es-es/idea/)
2. Levante el servidor ejecuntando el comando *npm run dev*
3. Utilizando un cliente http, se recomienda [Postman](https://www.postman.com/) realice las pruebas de la API

### En la nube
Estrategias de despliegue

1. 

<a id="pruebas"></a>
## Pruebas

Para realizar las pruebas de la API se sugiere utilizar las pruebas de integración desarrolladas ejecutando el comando *npm run test* puede personalizarlas agregando sus propias imagenes en la carpeta img del directorio test y configurandolas en los metodos de test.

Adicionalmente en la rama vista del repositorio encontrará un aplicativo con interfaz gráfica integrada para visualizar los resultados del procesamiento de imagenes.


**Puede continuar interactuando con todos los métodos especificados en el apartado [API](#api) en su máquina local o hacer las pruebas con el servidor en la nube****

****Sujeto a disponibilidad del servicio**

<a id="contacto"></a>
## Contacto
Cualquier duda comentario o sugerencia es bienvenido. Puede enviarme un email a elianachavezv@gmail.com

[Volver arriba](#top)
