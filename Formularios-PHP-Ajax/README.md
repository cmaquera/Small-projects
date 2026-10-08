# Formularios PHP y AJAX 📋

Ejemplos interactivos de procesamiento de formularios HTML mediante envío POST tradicional y peticiones asíncronas AJAX (Fetch API) a scripts de backend en PHP (`accion.php` y `procesar_datos.php`).

---

## 🌟 Características

- **Envío Tradicional (POST):** Formulario estándar que envía datos a `accion.php` y renderiza una respuesta HTML completa con estilos compartidos.
- **Envío Asíncrono (AJAX / Fetch API):** Envío asíncrono en segundo plano a `procesar_datos.php` con respuesta en formato JSON y actualización dinámica del DOM sin recargar la página.
- **Integración con Gateway Unificado:** Las peticiones `*.php` son redirigidas automáticamente a través de un proxy inverso interno hacia PHP CLI en el puerto `8000`, sin necesidad de configurar servidores Apache o Nginx externos.

---

## 🚀 Ejecución

### Opción A: A través del Gateway Unificado (Recomendado)
Desde la raíz del proyecto:
```bash
npm start
```
Luego abre en el navegador: [http://localhost:8000/Formularios-PHP-Ajax/](http://localhost:8000/Formularios-PHP-Ajax/)

### Opción B: Modo Independiente con PHP CLI
Si deseas ejecutarlo de manera independiente con el servidor integrado de PHP:
```bash
cd Formularios-PHP-Ajax
php -S localhost:8000
```
Y abre [http://localhost:8000](http://localhost:8000).
