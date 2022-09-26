# Hugo Docs

Realicé este proyecto con Hugo para documentar fácilmente mis propios proyectos, pero pense que estaría genial compartirlo, asi te ahorrarás el tiempo que me tomó aprender todo lo que finalmente, resultó en esta documentación. ¡Ojala realices muchos trabajos!


## Requisitos

- Git
- Hugo version 0.100.0 o superior
- Hugo extended (obligatorio para compilar assets)

## Instalar


Ve a la raíz de tu proyecto de Hugo y ejecuta el siguiente comando:

```
git submodule add https://github.com/zkreations/docs themes/docs
```

# Estructura recomendada

Realicé esta documentación pensando en que podrías generar multiples versiones de un mismo proyecto, es por eso que la estructura recomendada debería contener primero un numero de version, por ejemplo:

```
content
└── 1.0
    └── index.md
```

Si quieres iniciar rápidamente, te recomiendo hacer uso de la carpeta "demo" escribiendo el siguiente comando en la raíz de tu proyecto con hugo:

```
cp -R themes/docs/demo/content .
```

También te recomiendo copiar el archivo **demo/config.toml** y reemplazar la información con tus datos. Ahora solo resta iniciar el servidor local para que puedas apreciar la documentación:

```
hugo serve
```

## Contribuciones

Las contribuciones son bienvenidas siempre, sacaré tiempo para revisar cualquier solicitud, pero ten en cuenta lo siguiente al realizarlas:

- No agregar mas opciones que puedan incrementar la complejidad.
- Evitar JavasScript en lo posible si lo puedes realizar con CSS.
- No intervenir con las opciones personalizadas de los usuarios.

## License

**Docs** is licensed under the MIT License



