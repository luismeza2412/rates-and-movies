# Aplicaciones Angular 16 con Sass

Este repositorio contiene dos aplicaciones desarrolladas en Angular 16 con Sass. Ambas aplicaciones tienen una estructura similar y están diseñadas con un enfoque en modularidad y buenas prácticas de desarrollo.

## Aplicaciones Incluidas

### 1. Movie App
**Descripción**:  
Una aplicación que permite buscar películas utilizando un campo de búsqueda. Los resultados se obtienen desde una fuente externa mediante fetching de datos y se presentan en una vista con título, año e imagen de cada película.

**Características**:
- Barra de búsqueda en la pantalla principal.
- Listado de resultados en una segunda pantalla.
- Validación para que la búsqueda se realice con al menos 3 caracteres.
- Diseño responsive adaptado para dispositivos móviles.

**Tecnologías usadas**:
- Angular 16
- Sass
- API externa para la información de películas
- Routing Module para manejar vistas

### 2. Divisas App
**Descripción**:  
Una aplicación de conversión de divisas que permite convertir entre diferentes monedas. Utiliza datos almacenados en un archivo JSON (`exchange-rates`) y presenta una gráfica del historial de conversiones con `chart.js`.

**Características**:
- Conversor de divisas con Angular Forms.
- Visualización de gráficos de historial de conversiones.
- JSON como fuente de datos para las tasas de cambio.
- Diseño responsive.

**Tecnologías usadas**:
- Angular 16
- Sass
- Angular Forms
- `chart.js` para gráficos
- Routing Module para la navegación

---

## Estructura del Proyecto

Ambas aplicaciones siguen una estructura similar, organizada para garantizar la escalabilidad y la facilidad de mantenimiento.

## Estructura General del Proyecto

src/  
│  
├── app/  
│   ├── components/  
│   │   ├── [features]/  
│   │   
│   │  
│   ├── services/  
│   │   ├── [service].service.ts  
│   │   
│   │  
│   ├── app-routing.module.ts  
│   ├── app.module.ts  
│   ├── styles/  
│       ├── global.scss  
│  
│  
├── assets/  
│   ├── [data-file].json  




---

## Instalación y Ejecución

Sigue estos pasos para instalar y ejecutar cualquiera de las aplicaciones:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/luismeza2412/rates-and-movies
   cd rates-and-movies
   cd movie-app  # O cd divisas-app
   npm install
   ng serve

   

