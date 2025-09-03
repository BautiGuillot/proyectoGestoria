# 🚗 Gestoría Online - Tu Solución en Trámites

Sitio web moderno para servicios de gestoría y consulta de multas de tránsito, desarrollado con Astro y Tailwind CSS.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Formulario de Contacto**: Sistema de consultas integrado
- **Animaciones Suaves**: Efectos visuales modernos
- **API Backend**: Procesamiento de formularios con Google Apps Script
- **SEO Optimizado**: Meta tags y estructura semántica

## 🛠️ Tecnologías

- **Astro 5.13.3** - Framework principal
- **Tailwind CSS 4.1.12** - Estilos y diseño
- **Node.js** - Servidor backend
- **TypeScript** - Tipado estático
- **Lucide Icons** - Iconografía moderna

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd gestoria
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env en la raíz del proyecto
   URL_SUBMIT_FORM=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   WSP_URL=https://wa.me/5491112345678
   # Mensajes predefinidos (opcionales; si no se definen se usan fallbacks)
   WSP_MSG_MULTAS=Hola, me estoy comunicando para reducir una multa
   WSP_MSG_GESTORIA=Hola, me estoy comunicando por un asunto de gestoría
   ```

## 🚀 Desarrollo

```bash
# Servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes de UI base
│   └── *.astro         # Componentes específicos
├── layouts/            # Layouts de página
├── pages/              # Páginas y API routes
│   └── api/            # Endpoints de API
├── scripts/            # Scripts del cliente
└── styles/             # Estilos globales
```

## 🔧 Configuración

### Variables de Entorno

- `URL_SUBMIT_FORM`: URL del Google Apps Script para procesar formularios
- `WSP_URL`: URL base de WhatsApp con tu número en formato internacional, ej: `https://wa.me/5491112345678`
- `WSP_MSG_MULTAS` (opcional): Mensaje por defecto para la página principal/Multas
- `WSP_MSG_GESTORIA` (opcional): Mensaje por defecto para la página de Gestoría

### Google Apps Script

Para que el formulario funcione correctamente, necesitas configurar un Google Apps Script que:

1. Reciba los datos del formulario
2. Los procese (ej: enviar email, guardar en Google Sheets)
3. Retorne una respuesta JSON

## 🐛 Errores Corregidos

- ✅ Configuración de variables de entorno en `astro.config.mjs`
- ✅ Texto inconsistente del botón de envío
- ✅ Manejo de respuestas JSON en la API
- ✅ Mejoras en UX del formulario (spinner, mensajes)

## 📝 Uso

1. Los usuarios visitan la página principal
2. Completan el formulario de contacto con sus datos
3. El sistema envía la consulta al Google Apps Script
4. Se procesa la información y se responde al usuario

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
