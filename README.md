# 📚 Calculadora de Promedio Académico

Una aplicación web moderna desarrollada con React + TypeScript para calcular el promedio ponderado de materias académicas con integración a backend.

## ✨ Características

- **Login seguro**: Sistema de autenticación simple
- **Cálculo de promedio ponderado**: Considera tanto las notas como los créditos de cada materia
- **Integración con Backend**: Envía y persiste datos de materias y cálculos
- **API REST**: Comunicación completa con el backend (GET, POST, PUT, DELETE)
- **Interfaz intuitiva**: Diseño limpio y responsivo con identidad visual universitaria
- **Gestión de materias**: Agregar y eliminar materias con sincronización al backend
- **Resultados en tiempo real**: El promedio se actualiza automáticamente
- **Clasificación visual**: Colores institucionales que indican el nivel de rendimiento

## 🎨 Identidad Visual

La aplicación utiliza la paleta de colores institucional:
- **Rojo universitario** (#991B1F) - Color principal
- **Gris oscuro** (#4A4A4A) - Color secundario  
- **Dorado** (#D4AF37) - Acentos y elementos destacados
- **Verde oliva** (#8B9556) - Calificaciones excelentes

## 🚀 Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd front-examen-arqsoft
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Copiar el archivo de ejemplo
   cp .env.example .env
   
   # Editar .env y configurar la URL del backend
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. **Abrir en el navegador**
   - La aplicación estará disponible en `http://localhost:5173`

## 🔌 API Backend

La aplicación se comunica con un backend mediante las siguientes endpoints:

### Materias
- `POST /api/subjects` - Crear una nueva materia
  ```json
  {
    "name": "Matemáticas",
    "grade": 4.5,
    "credits": 3
  }
  ```

- `GET /api/subjects` - Obtener todas las materias
- `PUT /api/subjects/:id` - Actualizar una materia
- `DELETE /api/subjects/:id` - Eliminar una materia

### Cálculo de Promedio
- `POST /api/calculate` - **Calcular promedio ponderado** (el cálculo se hace en el backend)
  
  **Request:**
  ```json
  {
    "subjects": [
      {
        "name": "Matemáticas",
        "grade": 4.5,
        "credits": 3
      },
      {
        "name": "Física",
        "grade": 4.0,
        "credits": 4
      }
    ]
  }
  ```
  
  **Response:**
  ```json
  {
    "weightedSum": 28.5,
    "totalCredits": 7,
    "average": 4.07
  }
  ```

> **Importante:** El cálculo del promedio ponderado se realiza completamente en el backend. El frontend solo envía las materias con sus notas y créditos, y recibe el resultado calculado.

## 🎯 Uso

### 1. Iniciar Sesión
- Ingresa cualquier usuario y contraseña (validación básica)
- Haz clic en "Iniciar Sesión"

### 2. Agregar Materias
- **Nombre**: Escribe el nombre de la materia (ej: "Matemáticas")
- **Nota**: Ingresa la nota obtenida (escala 0-5)
- **Créditos**: Especifica el número de créditos de la materia
- Haz clic en "Agregar Materia"
- Las materias se envían automáticamente al backend

### 3. Calcular Promedio
- Una vez agregadas las materias, haz clic en **"Calcular Promedio"**
- El cálculo se realiza en el backend y muestra:
  - Promedio ponderado final
  - Suma ponderada total
  - Total de créditos
  - Fórmula aplicada
- Los colores indican el nivel de rendimiento:
  - 🟢 **Verde oliva (4.5-5.0)**: Excelente
  - 🟡 **Dorado (4.0-4.4)**: Bueno
  - 🟠 **Naranja (3.5-3.9)**: Regular
  - 🟤 **Café (3.0-3.4)**: Bajo
  - 🔴 **Rojo (0-2.9)**: Insuficiente

### 4. Gestionar Materias
- **Eliminar**: Haz clic en la "✕" junto a cada materia
- **Limpiar todo**: Usa el botón "Limpiar Todo" para reiniciar
- Cada acción se sincroniza con el backend

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── SubjectForm.tsx     # Formulario para agregar materias
│   ├── SubjectList.tsx     # Lista de materias agregadas
│   ├── GradeResult.tsx     # Visualización del promedio
│   └── *.css              # Estilos de componentes
├── pages/              # Páginas principales
│   ├── Login.tsx          # Página de login
│   ├── GradeCalculator.tsx # Página principal de cálculo
│   └── *.css              # Estilos de páginas
├── types/              # Definiciones de TypeScript
│   └── index.ts           # Interfaces y tipos
├── utils/              # Utilidades y funciones
│   └── gradeCalculator.ts # Lógica de cálculo
├── App.tsx             # Componente principal
├── main.tsx            # Punto de entrada
└── index.css           # Estilos globales
```

## 🎨 Diseño y Identidad Visual

La aplicación utiliza una paleta de colores moderna y profesional:

- **Primario**: Azul (#2563eb) - Confianza y profesionalismo
- **Secundario**: Gris (#64748b) - Neutralidad y elegancia
- **Éxito**: Verde (#10b981) - Logros y resultados positivos
- **Advertencia**: Amarillo (#f59e0b) - Atención y precaución
- **Error**: Rojo (#ef4444) - Errores y resultados bajos

### Características del diseño:
- **Responsivo**: Se adapta a dispositivos móviles y desktop
- **Accesible**: Colores con buen contraste y navegación clara
- **Moderno**: Uso de gradientes, sombras y animaciones sutiles
- **Consistente**: Sistema de diseño unificado en toda la aplicación

## 🧮 Fórmula de Cálculo

El promedio ponderado se calcula usando la siguiente fórmula:

```
Promedio = Σ(Nota × Créditos) / Σ(Créditos)
```

**Ejemplo:**
- Matemáticas: Nota 4.5, Créditos 4 → Ponderado: 18.0
- Física: Nota 4.0, Créditos 3 → Ponderado: 12.0
- Historia: Nota 3.8, Créditos 2 → Ponderado: 7.6

**Cálculo:** (18.0 + 12.0 + 7.6) / (4 + 3 + 2) = 37.6 / 9 = 4.18

## 🛠️ Tecnologías Utilizadas

- **React 18**: Biblioteca de interfaz de usuario
- **TypeScript**: Tipado estático para JavaScript
- **Vite**: Herramienta de construcción rápida
- **React Router**: Navegación entre páginas
- **CSS3**: Estilos modernos con variables CSS
- **ESLint**: Linting de código

## 📱 Compatibilidad

- ✅ Chrome (versión 90+)
- ✅ Firefox (versión 88+)
- ✅ Safari (versión 14+)
- ✅ Edge (versión 90+)
- ✅ Dispositivos móviles (iOS/Android)

## 🚀 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Construcción
npm run build        # Construye para producción
npm run preview      # Vista previa de la construcción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ para facilitar el cálculo de promedios académicos**