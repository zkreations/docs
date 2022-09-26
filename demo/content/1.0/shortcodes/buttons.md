---
title: Botones
date: 2022-09-26T12:41:06.339Z
weight: 1
description: Botones con enlaces. Si el botón contiene un enlace externo abrirá en una
  nueva pestaña.
---

Botones con enlaces. Si el botón contiene un enlace externo, se mostrará siempre en una nueva ventana, ademas se agrega el atributo rel con los valores noreferrer noopener y nofollow.

## Sintaxis

```go
{{</* button name="Repositorio" type="primary" icon="github" */>}}
```

### Opciones

- **href**: Url o ruta de destino. (obligatorio)
- **name**: Nombre del botón. (obligatorio)
- **type**: Tipo que define los colores. Valores válidos:  `primary` (opcional)
- **icon**: El nombre de un icono de zkreations. (opcional)

## Ejemplo

```go
{{</* button href="/home" name="Inicio" type="primary" icon="book-open" */>}}
{{</* button href="https://github.com" name="Repositorio" icon="github" */>}}
```

{{< button href="/1.0/home" name="Inicio" type="primary" icon="book-open" >}}
{{< button href="https://github.com" name="Repositorio" icon="github" >}}