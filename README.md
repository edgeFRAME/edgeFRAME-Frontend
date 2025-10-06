# 🎬 EdgeFRAME - AI-Powered Anime Video Upscaling

<div align="center">

<img src=".github/assets/main_logo.png" alt="EdgeFRAME Logo" width="400">

**Transform your anime videos with cutting-edge AI upscaling technology**

[![Build Status](https://github.com/DiegoPrietoG/edgeFRAME-frontend/actions/workflows/deploy.yml/badge.svg)](https://github.com/DiegoPrietoG/edgeFRAME-frontend/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## 🌟 ¿Qué es EdgeFRAME?

EdgeFRAME es una aplicación web moderna que permite a los usuarios subir videos de anime y aplicar técnicas avanzadas de **upscaling con inteligencia artificial** para mejorar significativamente la calidad visual. Perfecto para restaurar anime clásico o mejorar videos de baja resolución.

## 🛠️ Tecnologías Utilizadas

<div align="center">

| Frontend | Build & Deploy | Desarrollo |
|----------|----------------|------------|
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | ![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white) |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) | ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-181717?style=for-the-badge&logo=github&logoColor=white) | ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) | ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white) | ![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white) |

</div>

## 📦 Instalación y Configuración

### Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **Git**

### 🔧 Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/DiegoPrietoG/edgeFRAME-frontend.git
cd edgeFRAME-frontend

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Abrir en el navegador
# La aplicación estará disponible en http://localhost:5173
```

### 🏗️ Build para Producción

```bash
# Generar build optimizado
npm run build

# Preview del build
npm run preview
```

## 🎯 Cómo Usar EdgeFRAME

1. **📁 Sube tu Video**: Arrastra y suelta o selecciona un archivo de video anime
2. **⚙️ Configura Opciones**: Selecciona la resolución objetivo y parámetros de upscaling
3. **� Procesa**: Deja que la IA trabaje su magia
4. **� Descarga**: Obtén tu video mejorado en alta calidad

## 🌊 Flujo de Trabajo de Desarrollo

Este proyecto utiliza **GitFlow** para el manejo de ramas:

- `main` → Producción (auto-deploy a GitHub Pages)
- `develop` → Desarrollo (build check automático)
- `feat/*` → Nuevas funcionalidades

### 🔄 CI/CD Pipeline

```mermaid
graph LR
    A[Push to develop] --> B[Build Check]
    C[PR to main] --> D[Build + Deploy]
    E[Push to main] --> D
    D --> F[GitHub Pages]
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

- **[Diego Prieto](https://github.com/DiegoPrietoG)** - Desarrollador
- **[Juan Rodríguez](https://github.com/juanrguezsu7)** - Desarrollador

---

<div align="center">

**⭐ Si te gusta EdgeFRAME, ¡dale una estrella en GitHub! ⭐**

Hecho con ❤️ y mucho ☕ por el equipo de EdgeFRAME


**Cómo hacer el CI/CD con GitHub Actions y GitFlow**
1. Situarse en la rama `develop`
2. Crear una rama de release: `git flow release start x.x.x` (donde `x.x.x` es la versión, por ejemplo `0.1.0`)
3. Hacer commit de los cambios en la rama release
4. Finalizar la release: `git flow release finish x.x.x`
5. Subir los cambios a GitHub: `git push origin main develop --tags`

</div>