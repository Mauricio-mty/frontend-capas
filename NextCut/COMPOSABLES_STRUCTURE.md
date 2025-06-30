# Estructura de Composables por Vistas - NextCut

Esta documentación describe la nueva estructura de composables organizada por cada vista específica del proyecto.

## 📁 Estructura de Carpetas

```
src/composables/
├── login/                    # Vista: Login.vue
│   └── index.js             # Exporta useLogin
├── registro/                 # Vista: Registro.vue
│   └── index.js             # Exporta useRegistration
├── perfil/                   # Vista: Perfil.vue
│   └── index.js             # Exporta useAuth
├── citas/                    # Vista: Citas.vue
│   └── index.js             # Exporta useAppointments
├── citasCliente/             # Vista: CitasCliente.vue
│   └── index.js             # Exporta useAppointments
├── agendarCita/              # Vista: AgendarCita.vue
│   └── index.js             # Exporta useAppointmentBooking
├── seleccionarHorario/       # Vista: SeleccionarHorario.vue
│   └── index.js             # Exporta useAppointmentBooking
├── gestionarCitas/           # Vista: GestionarCitas.vue
│   └── index.js             # Exporta useAppointmentManagement
├── gestionarCitasBarbero/    # Vista: GestionarCitasBarbero.vue
│   └── index.js             # Exporta useAppointmentManagement
├── gestionarCitasRecepcionista/ # Vista: GestionarCitasRecepcionista.vue
│   └── index.js             # Exporta useAppointmentManagement
├── gestionarSucursales/      # Vista: GestionarSucursales.vue
│   └── index.js             # Exporta useBranchManagement
├── gestionarServicios/       # Vista: GestionarServicios.vue
│   └── index.js             # Exporta useServiceManagement
├── gestionarEmpleados/       # Vista: GestionarEmpleados.vue
│   └── index.js             # Exporta useAuth
├── gestionarClientes/        # Vista: GestionarClientes.vue
│   └── index.js             # Exporta useAuth
├── auth/                     # Composables base de autenticación
│   ├── useLogin.js
│   ├── useRegistration.js
│   └── index.js
├── appointments/             # Composables base de citas
│   ├── useAppointmentManagement.js
│   ├── useAppointmentBooking.js
│   └── index.js
├── admin/                    # Composables base de administración
│   ├── useBranchManagement.js
│   ├── useServiceManagement.js
│   └── index.js
├── useAuth.js               # Composable base de autenticación
├── useAppointments.js       # Composable base de citas
├── useBranches.js           # Composable base de sucursales
├── useServices.js           # Composable base de servicios
└── index.js                 # Exportaciones centralizadas
```

## 🎯 Ventajas de esta Estructura

### **1. Organización por Vistas**
- Cada vista tiene su propia carpeta de composables
- Fácil localización de la lógica específica de cada vista
- Separación clara de responsabilidades

### **2. Reutilización de Lógica**
- Los composables base están en carpetas específicas (`auth/`, `appointments/`, `admin/`)
- Las vistas importan desde su carpeta específica
- Evita duplicación de código

### **3. Escalabilidad**
- Fácil agregar nuevos composables para nuevas vistas
- Estructura predecible y consistente
- Mantenimiento simplificado

## 📋 Mapeo de Vistas a Composables

| Vista | Composable | Descripción |
|-------|------------|-------------|
| `Login.vue` | `useLogin` | Autenticación de usuarios |
| `Registro.vue` | `useRegistration` | Registro de nuevos usuarios |
| `Perfil.vue` | `useAuth` | Gestión del perfil de usuario |
| `Citas.vue` | `useAppointments` | Visualización de citas |
| `CitasCliente.vue` | `useAppointments` | Citas del cliente |
| `AgendarCita.vue` | `useAppointmentBooking` | Agendar nueva cita |
| `SeleccionarHorario.vue` | `useAppointmentBooking` | Selección de horarios |
| `GestionarCitas.vue` | `useAppointmentManagement` | Gestión completa de citas |
| `GestionarCitasBarbero.vue` | `useAppointmentManagement` | Gestión de citas para barberos |
| `GestionarCitasRecepcionista.vue` | `useAppointmentManagement` | Gestión de citas para recepcionistas |
| `GestionarSucursales.vue` | `useBranchManagement` | CRUD de sucursales |
| `GestionarServicios.vue` | `useServiceManagement` | CRUD de servicios |
| `GestionarEmpleados.vue` | `useAuth` | Gestión de empleados |
| `GestionarClientes.vue` | `useAuth` | Gestión de clientes |

## 🔧 Cómo Usar

### **Importación en Componentes**
```javascript
// Para Login.vue
import { useLogin } from '@/composables/login/index.js';

// Para Registro.vue
import { useRegistration } from '@/composables/registro/index.js';

// Para GestionarCitas.vue
import { useAppointmentManagement } from '@/composables/gestionarCitas/index.js';
```

### **Ejemplo de Uso en Componente**
```vue
<script setup>
import { useRegistration } from '@/composables/registro/index.js';

const {
  formData,
  loading,
  errors,
  roleOptions,
  registerUser,
  cancelRegistration,
  clearFieldError
} = useRegistration();
</script>
```

## 🚀 Beneficios

### **1. Mantenibilidad**
- Cada vista tiene su lógica organizada
- Fácil encontrar y modificar composables específicos
- Estructura predecible

### **2. Colaboración**
- Diferentes desarrolladores pueden trabajar en diferentes vistas
- Conflictos de merge reducidos
- Responsabilidades claras

### **3. Testing**
- Fácil hacer unit tests por vista
- Composables específicos para cada funcionalidad
- Aislamiento de lógica

### **4. Performance**
- Importaciones específicas por vista
- No se cargan composables innecesarios
- Lazy loading natural

## 📝 Notas Importantes

1. **Composables Base**: Los composables base (`useAuth`, `useAppointments`, etc.) contienen la lógica común
2. **Índices**: Cada carpeta tiene un `index.js` que exporta los composables específicos
3. **Reutilización**: Múltiples vistas pueden usar el mismo composable base
4. **Extensibilidad**: Fácil agregar composables específicos para cada vista cuando sea necesario

## 🔄 Migración

Para migrar componentes existentes:

1. **Identificar la vista** correspondiente
2. **Importar desde la carpeta específica** de la vista
3. **Mantener la misma funcionalidad** del composable
4. **Actualizar imports** en el componente

Esta estructura hace que el proyecto sea más organizado, mantenible y escalable. 