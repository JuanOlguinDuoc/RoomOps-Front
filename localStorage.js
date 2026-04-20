const productos = [
  // JUEGOS
  {
    id: 1,
    imagenUrl: '/images/products/fondo.png',
    titulo: 'Resident Evil 4 Remake',
    atributos: 'Survival Horror',
    precio: 60000,
    categoria: 'juegos',
    plataforma: ['PC'],
    enOferta: true,
    descuento: 25,
    fechaInicioOferta: '2024-10-15',
    fechaFinOferta: '2025-11-15'
  },
  {
    id: 2,
    imagenUrl: '/images/products/fondo2.png',
    titulo: 'Dark Souls III',
    atributos: 'Action RPG, Souls-like, Adventure',
    precio: 40000,
    categoria: 'juegos',
    plataforma: ['PC', 'PS', 'Xbox'],
    enOferta: false
  },
  {
    id: 3,
    imagenUrl: '/images/products/fondo3.png',
    titulo: 'Devil May Cry 5',
    atributos: 'Action, Hack and Slash, Action-Adventure',
    precio: 30000,
    categoria: 'juegos',
    plataforma: ['PC', 'PS', 'Xbox'],
    enOferta: true,
    descuento: 20,
    fechaInicioOferta: '2024-10-10',
    fechaFinOferta: '2025-10-31'
  },
  {
    id: 4,
    imagenUrl: '/images/products/fondo4.png',
    titulo: 'Dead Cells',
    atributos: 'Roguelike, Metroidvania, Action, Indie',
    precio: 20000,
    categoria: 'juegos',
    plataforma: ['PC', 'PS', 'Xbox', 'NS'],
    enOferta: false
  },
  {
    id: 5,
    imagenUrl: '/images/products/fondo5.jpg',
    titulo: 'Hollow Knight: Silksong',
    atributos: 'Action, Adventure, Indie, Metroidvania',
    precio: 10300,
    categoria: 'juegos',
    plataforma: ['PC', 'PS', 'Xbox', 'NS'],
    enOferta: false
  },

  // MONITORES
  {
    id: 6,
    imagenUrl: '/images/products/ASUS ROG monitor 27 inch.jpeg',
    titulo: 'Monitor Gaming ASUS ROG 27"',
    atributos: '144Hz, 1ms, QHD 2560x1440, G-Sync',
    precio: 450000,
    categoria: 'monitores',
    plataforma: ['PC'],
    enOferta: true,
    descuento: 20,
    fechaInicioOferta: '2024-10-01',
    fechaFinOferta: '2025-10-30'
  },
  {
    id: 7,
    imagenUrl: '/images/products/LG UltraGear 24 inch monitor.jpeg',
    titulo: 'Monitor LG UltraGear 24"',
    atributos: '165Hz, IPS, Full HD, FreeSync Premium',
    precio: 280000,
    categoria: 'monitores',
    plataforma: ['PC'],
    enOferta: false
  },
  {
    id: 8,
    imagenUrl: '/images/products/Samsung Odyssey G7 32 inch.jpeg',
    titulo: 'Monitor Samsung Odyssey 32"',
    atributos: '240Hz, Curvo, QHD, HDR10',
    precio: 650000,
    categoria: 'monitores',
    plataforma: ['PC'],
    enOferta: false
  },

  // PC ARMADOS
  {
    id: 9,
    imagenUrl: '/images/products/Gaming PC RTX 4060 Ti setup.jpeg',
    titulo: 'PC Gamer RTX 4060 Ti',
    atributos: 'Intel i5-13400F, 16GB RAM, RTX 4060 Ti, SSD 1TB',
    precio: 1200000,
    categoria: 'pc-armados',
    plataforma: ['PC'],
    enOferta: false
  },
  {
    id: 10,
    imagenUrl: '/images/products/Gaming PC RTX 4070 Super build.jpeg',
    titulo: 'PC Gamer RTX 4070 Super',
    atributos: 'AMD Ryzen 7 7700X, 32GB RAM, RTX 4070 Super, SSD 2TB',
    precio: 1800000,
    categoria: 'pc-armados',
    plataforma: ['PC'],
    enOferta: true,
    descuento: 20,
    fechaInicioOferta: '2024-10-20',
    fechaFinOferta: '2025-11-20'
  },
  {
    id: 11,
    imagenUrl: '/images/products/Budget gaming PC GTX 1660.jpeg',
    titulo: 'PC Gamer Básico GTX 1660',
    atributos: 'Intel i3-12100F, 8GB RAM, GTX 1660 Super, SSD 500GB',
    precio: 650000,
    categoria: 'pc-armados',
    plataforma: ['PC'],
    enOferta: false
  },

  // JOYSTICKS/CONTROLES
  {
    id: 12,
    imagenUrl: '/images/products/Xbox Wireless Controller EVA.jpeg',
    titulo: 'Control Xbox Wireless',
    atributos: 'Bluetooth, Compatible PC/Xbox, Batería 40hrs',
    precio: 65000,
    categoria: 'controles',
    plataforma: ['PC', 'Xbox'],
    enOferta: true,
    descuento: 20,
    fechaInicioOferta: '2024-10-18',
    fechaFinOferta: '2025-11-01'
  },
  {
    id: 13,
    imagenUrl: '/images/products/PS5 DualSense controller pro.jpeg',
    titulo: 'Control DualSense PS5',
    atributos: 'Haptic Feedback, Gatillos Adaptativos, USB-C',
    precio: 70000,
    categoria: 'controles',
    plataforma: ['PS'],
    enOferta: false
  },
  {
    id: 14,
    imagenUrl: '/images/products/Nintendo Switch Pro Controller.jpeg',
    titulo: 'Control Pro Nintendo Switch',
    atributos: 'Gyroscopio, NFC, Batería 40hrs, HD Rumble',
    precio: 75000,
    categoria: 'controles',
    plataforma: ['NS'],
    enOferta: false
  },

  // CONSOLAS
  {
    id: 15,
    imagenUrl: '/images/products/PlayStation 5 Slim console.jpeg',
    titulo: 'PlayStation 5 Slim',
    atributos: '1TB SSD, 4K Gaming, Ray Tracing, Control incluido',
    precio: 650000,
    categoria: 'consolas',
    plataforma: ['PS'],
    enOferta: false
  },
  {
    id: 16,
    imagenUrl: '/images/products/Xbox Series X console.png',
    titulo: 'Xbox Series X',
    atributos: '1TB SSD, 4K/120fps, Quick Resume, Game Pass',
    precio: 620000,
    categoria: 'consolas',
    plataforma: ['Xbox'],
    enOferta: false
  },
  {
    id: 17,
    imagenUrl: '/images/products/Nintendo Switch OLED model.jpeg',
    titulo: 'Nintendo Switch OLED',
    atributos: 'Pantalla OLED 7", 64GB, Dock incluido, Joy-Con',
    precio: 420000,
    categoria: 'consolas',
    plataforma: ['NS'],
    enOferta: true,
    descuento: 20,
    fechaInicioOferta: '2024-10-15',
    fechaFinOferta: '2025-11-30'
  },
  {
    id: 18,
    imagenUrl: '/images/products/fondo11.png',
    titulo: 'Nioh',
    atributos: 'Action RPG, Souls-like, Adventure',
    precio: 40000,
    categoria: 'juegos',
    plataforma: ['PC', 'PS', 'Xbox'],
    enOferta: true,
    descuento: 80,
    fechaInicioOferta: '2024-10-15',
    fechaFinOferta: '2025-11-30'
  }
];

const carrito = [];

// Inicializar el localStorage

// Initialize localStorage keys only if they don't exist to avoid wiping user data
if (!localStorage.getItem('productos')) {
  localStorage.setItem('productos', JSON.stringify(productos));
}

if (!localStorage.getItem('carrito')) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Initialize derived collections if missing
if (!localStorage.getItem('categorias')) {
  const categorias = [...new Set(productos.map(p => p.categoria))];
  localStorage.setItem('categorias', JSON.stringify(categorias));
}

if (!localStorage.getItem('plataformas')) {
  const plataformas = [...new Set(productos.flatMap(p => p.plataforma || []))];
  localStorage.setItem('plataformas', JSON.stringify(plataformas));
}

if (!localStorage.getItem('roles')) {
  localStorage.setItem('roles', JSON.stringify(['admin', 'user']));
}

if (!localStorage.getItem('registeredUsers')) {
  localStorage.setItem('registeredUsers', JSON.stringify([]));
}

// Initialize a persistent incremental ID for users to avoid very large timestamp-based IDs
if (!localStorage.getItem('nextUserId')) {
  localStorage.setItem('nextUserId', '1');
}

const getNextUserId = () => {
  const current = parseInt(localStorage.getItem('nextUserId') || '1', 10);
  const next = current + 1;
  localStorage.setItem('nextUserId', String(next));
  return current;
}

const productosRecuperados = JSON.parse(localStorage.getItem('productos'));

export const getProductos = () => {
  return JSON.parse(localStorage.getItem('productos')) || []
}

export const getProductoById = (id) => {
  const productos = JSON.parse(localStorage.getItem('productos')) || []
  return productos.find(producto => producto.id === parseInt(id))
}

export const getCart = () => {
  return JSON.parse(localStorage.getItem('carrito')) || []
}

export const getPriceCart = () => {
  const productos = getCart();
  let price = 0
  productos.forEach(producto => {
    const precioFinal = getPrecioFinal(producto);
    price = price + (precioFinal * producto.cantidad)
  });
  return price
}

export const clearCart = () => {
  localStorage.setItem('carrito', JSON.stringify([]))
}

export const removeFromCart = (productId) => {
  const carrito = getCart();
  const updatedCarrito = carrito.filter(item => item.id !== productId);
  localStorage.setItem('carrito', JSON.stringify(updatedCarrito));
}

export const updateQuantity = (productId, newQuantity) => {
  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const carrito = getCart();
  const producto = carrito.find(item => item.id === productId);

  if (producto) {
    producto.cantidad = newQuantity;
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
}

export const addToCart = (producto) => {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || []
  const productoEnCarrito = carrito.find(item => item.id === producto.id)

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += 1
  } else {
    carrito.push({ ...producto, cantidad: 1 })
  }

  localStorage.setItem('carrito', JSON.stringify(carrito))
}

export const getSelectedProduct = () => {
  return JSON.parse(localStorage.getItem('selectedProduct')) || null
}

export const getProductosByCategoria = (categoria) => {
  const productos = JSON.parse(localStorage.getItem('productos')) || []
  return productos.filter(producto => producto.categoria === categoria)
}

export const getCategorias = () => {
  return JSON.parse(localStorage.getItem('categorias')) || []
}

// CRUD helpers for productos
export const saveProductos = (productosArray) => {
  localStorage.setItem('productos', JSON.stringify(productosArray));
}

export const getAllProductos = () => getProductos();

export const createProducto = (producto) => {
  const productos = getProductos();
  const newProducto = { ...producto, id: Date.now() };
  productos.push(newProducto);
  saveProductos(productos);
  return newProducto;
}

export const updateProducto = (id, changes) => {
  const productos = getProductos();
  const idx = productos.findIndex(p => p.id === parseInt(id));
  if (idx === -1) return null;
  productos[idx] = { ...productos[idx], ...changes };
  saveProductos(productos);
  return productos[idx];
}

export const deleteProducto = (id) => {
  const productos = getProductos();
  const filtered = productos.filter(p => p.id !== parseInt(id));
  saveProductos(filtered);
  return true;
}

// CRUD helpers for categorias
export const getAllCategorias = () => JSON.parse(localStorage.getItem('categorias')) || [];

export const createCategoria = (categoria) => {
  const categorias = getAllCategorias();
  if (!categorias.includes(categoria)) {
    categorias.push(categoria);
    localStorage.setItem('categorias', JSON.stringify(categorias));
  }
  return categorias;
}

export const deleteCategoria = (categoria) => {
  const categorias = getAllCategorias();
  const filtered = categorias.filter(c => c !== categoria);
  localStorage.setItem('categorias', JSON.stringify(filtered));
  // Also remove category from products (set to 'sin-categoria')
  const productos = getProductos().map(p => p.categoria === categoria ? { ...p, categoria: 'sin-categoria' } : p);
  saveProductos(productos);
  return true;
}

// CRUD helpers for plataformas
export const getAllPlataformas = () => JSON.parse(localStorage.getItem('plataformas')) || [];

export const createPlataforma = (plataforma) => {
  const list = getAllPlataformas();
  if (!list.includes(plataforma)) {
    list.push(plataforma);
    localStorage.setItem('plataformas', JSON.stringify(list));
  }
  return list;
}

export const deletePlataforma = (plataforma) => {
  const list = getAllPlataformas().filter(p => p !== plataforma);
  localStorage.setItem('plataformas', JSON.stringify(list));
  // Remove plataforma from products
  const productos = getProductos().map(p => ({ ...p, plataforma: (p.plataforma || []).filter(x => x !== plataforma) }));
  saveProductos(productos);
  return true;
}

// CRUD helpers for roles
export const getAllRoles = () => JSON.parse(localStorage.getItem('roles')) || ['admin', 'user'];

export const createRole = (role) => {
  const roles = getAllRoles();
  if (!roles.includes(role)) {
    roles.push(role);
    localStorage.setItem('roles', JSON.stringify(roles));
  }
  return roles;
}

export const deleteRole = (role) => {
  const roles = getAllRoles().filter(r => r !== role);
  localStorage.setItem('roles', JSON.stringify(roles));
  return true;
}

// CRUD helpers for registered users
export const getAllUsers = () => JSON.parse(localStorage.getItem('registeredUsers')) || [];

export const createUserAdmin = (userData) => {
  const users = getAllUsers();
  // Ensure compatibility with existing code that expects 'nombre', 'apellidos' and 'name'
  const newUser = {
    ...userData,
    id: getNextUserId(),
    registrationDate: new Date().toISOString(),
    // keep both styles: firstName/lastName and nombre/apellidos
    nombre: userData.firstName || userData.nombre || '',
    apellidos: userData.lastName || userData.apellidos || '',
    name: userData.firstName || userData.nombre || '',
    role: userData.role || 'user'
  };
  users.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  return newUser;
}

export const updateUserAdmin = (id, changes) => {
  const users = getAllUsers();
  const idx = users.findIndex(u => u.id === parseInt(id));
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...changes };
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  return users[idx];
}

export const deleteUserAdmin = (id) => {
  const users = getAllUsers().filter(u => u.id !== parseInt(id));
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  return true;
}

// Funciones para manejo de ofertas
export const getProductosEnOferta = () => {
  const productos = JSON.parse(localStorage.getItem('productos')) || []
  return productos.filter(producto => producto.enOferta === true)
}

export const getProductosOfertaByCategoria = (categoria) => {
  const productos = getProductosEnOferta()
  return productos.filter(producto => producto.categoria === categoria)
}

export const calcularPrecioConDescuento = (precioOriginal, descuento) => {
  return precioOriginal - (precioOriginal * descuento / 100)
}

// Función para obtener el precio final de un producto (con o sin descuento)
export const getPrecioFinal = (producto) => {
  const precio = parseInt(producto.precio);
  if (producto.enOferta && esOfertaActiva(producto) && producto.descuento) {
    return calcularPrecioConDescuento(precio, producto.descuento);
  }
  return precio;
}

// Función para obtener el precio original (sin descuento)
export const getPrecioOriginal = (producto) => {
  return parseInt(producto.precio);
}

export const esOfertaActiva = (producto) => {
  if (!producto.enOferta) return false

  const fechaActual = new Date()
  const fechaInicio = new Date(producto.fechaInicioOferta)
  const fechaFin = new Date(producto.fechaFinOferta)

  // Debug: agregar console.log temporal
  console.log(`Producto: ${producto.titulo}`);
  console.log(`Fecha actual: ${fechaActual.toLocaleDateString()}`);
  console.log(`Fecha inicio: ${fechaInicio.toLocaleDateString()}`);
  console.log(`Fecha fin: ${fechaFin.toLocaleDateString()}`);
  console.log(`¿Está activa?: ${fechaActual >= fechaInicio && fechaActual <= fechaFin}`);

  return fechaActual >= fechaInicio && fechaActual <= fechaFin
}

// Función de debug para verificar ofertas
export const debugOfertas = () => {
  const productos = getProductosEnOferta();

  const activas = productos.filter(p => esOfertaActiva(p));
  console.log(`Ofertas activas: ${activas.length}`);
  return activas;
}

// Funciones para manejo de sesión de usuario
export const setUserSession = (userData) => {
  // Normalizar campos del usuario que vienen del backend para la forma que usa el frontend
  const normalized = {
    id: userData?.id || null,
    run: userData?.run || userData?.rut || userData?.id || '',
    // backend usa firstName/lastName; frontend espera nombre/apellidos y name/apellido
    nombre: userData?.firstName || userData?.name || userData?.nombre || '',
    apellidos: userData?.lastName || userData?.apellidos || '',
    name: userData?.firstName || userData?.name || userData?.nombre || '',
    apellido: userData?.lastName || userData?.apellidos || '',
    email: userData?.email || '',
    role: userData?.role || '',
    telefono: userData?.telefono || userData?.phone || '',
    direccion: userData?.direccion || userData?.address || '',
    departamento: userData?.departamento || '',
    ciudad: userData?.ciudad || '',
    region: userData?.region || '',
    codigoPostal: userData?.codigoPostal || '',
    indicacionesEntrega: userData?.indicacionesEntrega || '',
    // Mantener cualquier dato original por compatibilidad
    __raw: userData
  };

  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('currentUser', JSON.stringify(normalized));
  // Notificar a la UI que la sesión cambió (para que componentes se re-rendericen)
  try { window.dispatchEvent(new Event('authChanged')); } catch (e) { /* noop */ }
}

export const clearUserSession = () => {
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.removeItem('currentUser');
  // Notificar a la UI que la sesión cambió
  try { window.dispatchEvent(new Event('authChanged')); } catch (e) { /* noop */ }
}

export const isUserLoggedIn = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
}

export const getCurrentUser = () => {
  if (isUserLoggedIn()) {
    const sessionUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    if (!sessionUser) return null;

    // Si ya es un objeto normalizado guardado por setUserSession, devolverlo directamente
    if (sessionUser.nombre || sessionUser.email) {
      return sessionUser;
    }

    // Fallback: intentar buscar en registeredUsers por email
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const fullUser = registeredUsers.find(user => user.email === sessionUser.email);
    if (fullUser) {
      return {
        ...fullUser,
        apellido: fullUser.apellidos,
        name: fullUser.nombre,
        loginTime: sessionUser.loginTime
      };
    }

    return sessionUser;
  }
  return null;
};

// Función para obtener el rol del usuario actual
export const getUserRole = () => {
  const user = getCurrentUser();
  if (!user) return null;
  
  // El rol puede venir del objeto role completo o como string
  if (typeof user.role === 'object' && user.role !== null) {
    return user.role.name || user.role.id || null;
  }
  return user.role || null;
};

// Función para verificar si el usuario es administrador
export const isUserAdmin = () => {
  const role = getUserRole();
  return role === 'administrador' || role === 'admin';
};

// Función para verificar si el usuario es vendedor
export const isUserVendedor = () => {
  const role = getUserRole();
  return role === 'vendedor';
};

// Función para registrar un nuevo usuario
export const registerUser = (userData) => {
  console.log('Datos recibidos para registro:', userData);

  // Obtener usuarios existentes o crear array vacío
  const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  console.log('Usuarios existentes:', existingUsers);

  // Verificar si el email ya existe
  const userEmailExists = existingUsers.find(user => user.email === userData.email);

  // Verificar RUN
  const userRunExists = existingUsers.find(user => user.run === userData.run);

  console.log('RUN a verificar:', userData.run);
  console.log('¿RUN existe?:', userRunExists);
  console.log('¿Email existe?:', userEmailExists);

  if (userRunExists) {
    return { success: false, message: 'El RUN ya está registrado' };
  }

  if (userEmailExists) {
    return { success: false, message: 'El correo ya está registrado' };
  }

  // Agregar nuevo usuario
  const newUser = {
    ...userData,
  id: getNextUserId(),
    registrationDate: new Date().toISOString(),
    role: 'user' // Por defecto todos son usuarios normales
  };

  existingUsers.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

  // Crear sesión automáticamente después del registro exitoso
  setUserSession({
    email: newUser.email,
    name: newUser.nombre,
    run: newUser.run,
    role: newUser.role,
    loginTime: new Date().toISOString()
  });

  console.log('Usuario registrado exitosamente:', newUser);
  console.log('Sesión creada automáticamente');

  return { success: true, message: 'Usuario registrado exitosamente', user: newUser };
};

// Modificar validateLogin para incluir usuarios registrados
export const validateLogin = (email, password) => {
  // Usuarios hardcodeados (admin y test)
  const hardcodedUsers = [
    {
      email: 'admin@duoc.cl',
      password: 'admin123',
      name: 'Administrador',
      role: 'admin'
    }
  ];

  // Usuarios registrados dinámicamente
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

  // Combinar ambos arrays
  const allUsers = [...hardcodedUsers, ...registeredUsers];

  const user = allUsers.find(u => u.email === email && u.password === password);

  if (user) {
    setUserSession({
      email: user.email,
      name: user.name || user.nombre, // Compatibility
      role: user.role,
      loginTime: new Date().toISOString()
    });
    return { success: true, user };
  }

  return { success: false, message: 'Credenciales inválidas' };
};