---
title: Introducción
weight: 1
icon: coffee
date: 2022-09-26T02:25:47.637Z
---

¡Hola! este es un ejemplo de tu nueva documentación. Realicé este proyecto con Hugo para documentar fácilmente mis propios proyectos, pero pense que estaría genial compartirlo, asi te ahorrarás el tiempo que me tomó aprender todo lo que finalmente, resultó en esta documentación. ¡Ojala realices muchos trabajos!

## Instalar

Ve a la raíz de tu proyecto de Hugo y ejecuta el siguiente comando:

```text
git submodule add https://github.com/zkreations/docs themes/docs
```

## Estructura recomendada

Realicé esta documentación pensando en que podrías generar multiples versiones de un mismo proyecto, es por eso que la estructura recomendada debería contener primero un numero de version, por ejemplo:

```text
content
└── 1.0
    └── index.md
```

Para que puedas comprender esto mejor, utiliza el ejemplo de estructura inicial que he dejado en la carpeta **demo**, misma que se usa en esta página de ejemplo que estas leyendo. Para ello ejecuta el siguiente comando:

```text
cp -R themes/docs/demo/content .
```

Ahora solo resta iniciar el servidor local para que puedas apreciar la documentación:

```text
hugo serve
```


## Contribuciones

Las contribuciones son bienvenidas siempre, sacare tiempo para revisar cualquier solicitud siempre y cuando tengas en cuenta lo siguiente al realizarlas:

- No agregar mas opciones que puedan incrementar la complejidad.
- Evitar JavasScript en lo posible si lo puedes realizar con CSS.
- No intervenir con las opciones personalizadas de los usuarios.

## Nota final

Si te gusta este proyecto, por favor considera darme una estrella en github, no cuesta nada y para mi significa mucho. Felices documentos y disfruta tu taza de café.
