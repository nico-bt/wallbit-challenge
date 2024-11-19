# Wallbit frontend challenge

🔗 Live: https://wallbit-challenge-ashen.vercel.app/

## Techs:
- Next
- Tailwind + Shadcn

## Funcionalidades
Un usuario puede:
- Agregar productos al carrito
- Ver la lista con los productos agregados
- Eliminar un producto de la lista (hover sobre la fila y aparece para borrar)
- El carrito persiste al recargar la página (guardado en local storage)
- Búsqueda dinámica de productos mientras el usuario escribe el id y se muestra el preview
- Arranca con un saldo de 1.000 usd y se va actualizando el balance a medida que agrega/saca items

Comentario:  
La mayoría de la lógica está en el userContext, donde se crea el estado user  
más las funciones para modificarlo y guardarlo en localStorage
```
user: {
  money: number,
  cart: CartItems[],
  date: date
}
```

## Instrucciones para correr localmente

Si queres correr localmente podés hacer copy/paste en los siguientes comandos para 
clonar, instalar dependencias y ejecutar el proyecto.

```bash
git clone https://github.com/nico-bt/wallbit-challenge.git

cd wallbit-challenge

npm install

npm run dev
```

Después en el navegador visita http://localhost:3000 para ver el proyecto.
