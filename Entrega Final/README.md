# Proyecto Final Curso Backend CoderHouse 2022

## API 📦

## Producto
* http://localhost8080/api/productos        -- Base router de Productos
* get("/")                                  -- Devuelve todos los productos
* get("/:id")                               -- Devuelve un producto por su ID
* post("/")                                 -- Guarda un producto(implementa seguridad via Middleware de Admin)
  {
    name:coffe
    price:2.3
    thumbnail:foto cafe
    code:2400
    description:coffe pack
    stock:1000
    isAdmin:1
  } 
* put("/:id")                               -- Actualiza un producto por su ID(implementa seguridad via Middleware de Admin)
  {
    name:hamburguesas 4u
    price:15.54
    thumbnail:dasasd asd asd asd 
    code:1400
    description:asdasdasd
    stock:14
    isAdmin:1
  }
* delete("/:id")                            -- elimina un producto por su ID(implementa seguridad via Middleware de Admin)
  {
    isAdmin:1
  }


## Carrito
* http://localhost8080/api/carrito          -- Base router de Carrito
* get("/")                                  -- Devuelve todos los carritos
* get("/:id")                               -- Devuelve un carrito por su ID
* get("/:id/productos")                     -- devuelve los productos de un carrito por su ID  
* post("/")                                 -- Guarda un carrito
* delete("/:id")                            -- elimina un carrito por su ID
* post("/:id/productos")                    -- guarda un producto en un carrito por su ID
  {
    id:2
  }
* delete("/:cart_id/productos/:product_id") -- Elimina un producto de un carrito, ambos por su ID

# Testeado con Postman
