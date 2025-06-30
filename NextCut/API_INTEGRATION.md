# Integración con API - NextCut

Este documento describe la estructura de servicios y composables implementados para la integración con la API del backend.

## Estructura de Archivos

```
src/
├── services/
│   ├── api.config.js          # Configuración base de axios
│   ├── auth.services.js       # Servicios de autenticación
│   ├── branches.services.js   # Servicios de sucursales
│   ├── services.services.js   # Servicios de barbería
│   ├── schedules.services.js  # Servicios de horarios
│   ├── appointments.services.js # Servicios de citas
│   ├── client.services.js     # Servicios de clientes (compatibilidad)
│   └── index.js              # Exportaciones centralizadas
├── composables/
│   ├── useAuth.js            # Composable de autenticación
│   ├── useAppointments.js    # Composable de citas
│   ├── useBranches.js        # Composable de sucursales
│   ├── useServices.js        # Composable de servicios
│   └── index.js             # Exportaciones centralizadas
├── utils/
│   ├── errorHandler.js       # Manejo de errores
│   ├── validations.js        # Validaciones de formularios
│   └── index.js             # Exportaciones centralizadas
└── router/
    └── guards.js            # Guardias de navegación
```

## Configuración de la API

### api.config.js
Configuración centralizada de axios con:
- URL base configurada
- Interceptores para manejo automático de tokens
- Manejo automático de errores 401 (logout automático)

```javascript
import apiClient from '@/services/api.config.js';
```

## Servicios

### Autenticación (auth.services.js)

#### Clientes
```javascript
import { clientAuthService } from '@/services/auth.services.js';

// Login
await clientAuthService.login({ email, password });

// Registro
await clientAuthService.signup(userData);

// Obtener perfil
const profile = await clientAuthService.getProfile();

// Actualizar perfil
await clientAuthService.updateProfile(userData);

// Eliminar cuenta
await clientAuthService.deleteAccount();
```

#### Usuarios (Empleados/Admin)
```javascript
import { userAuthService } from '@/services/auth.services.js';

// Login
await userAuthService.login({ email, password });

// Crear primer usuario (admin)
await userAuthService.createFirstUser(userData);

// Registrar usuario
await userAuthService.register(userData);

// Obtener todos los usuarios
const users = await userAuthService.getAllUsers();

// Actualizar usuario por ID
await userAuthService.updateUserById(userId, userData);

// Eliminar usuario
await userAuthService.deleteUser(userId);
```

### Sucursales (branches.services.js)
```javascript
import { branchesService } from '@/services/branches.services.js';

// Obtener todas las sucursales
const branches = await branchesService.getAllBranches();

// Obtener sucursal por ID
const branch = await branchesService.getBranchById(id);

// Crear sucursal
await branchesService.createBranch(branchData);

// Actualizar sucursal
await branchesService.updateBranch(id, branchData);

// Eliminar sucursal
await branchesService.deleteBranch(id);
```

### Servicios de Barbería (services.services.js)
```javascript
import { servicesService } from '@/services/services.services.js';

// Obtener todos los servicios
const services = await servicesService.getAllServices();

// Obtener servicio por ID
const service = await servicesService.getServiceById(id);

// Crear servicio
await servicesService.createService(serviceData);

// Actualizar servicio
await servicesService.updateService(id, serviceData);

// Eliminar servicio
await servicesService.deleteService(serviceId);
```

### Citas (appointments.services.js)
```javascript
import { appointmentsService } from '@/services/appointments.services.js';

// Obtener todas las citas
const appointments = await appointmentsService.getAllAppointments();

// Obtener citas por fecha
const appointments = await appointmentsService.getAppointmentsByDate(date);

// Crear cita
await appointmentsService.createAppointment(appointmentData);

// Actualizar estado de cita
await appointmentsService.updateAppointmentStatus(id, statusData);

// Asignar barbero
await appointmentsService.assignBarberToAppointment(id, barberData);
```

### Horarios (schedules.services.js)
```javascript
import { schedulesService } from '@/services/schedules.services.js';

// Crear horario
await schedulesService.createSchedule(scheduleData);

// Eliminar horario
await schedulesService.deleteSchedule(scheduleData);

// Obtener horarios por sucursal
const schedules = await schedulesService.getSchedulesByBranch(branch);
```

## Composables

### useAuth
Composable reactivo para manejo de autenticación:

```javascript
import { useAuth } from '@/composables/useAuth.js';

export default {
  setup() {
    const {
      user,
      userType,
      loading,
      error,
      isLoggedIn,
      isClient,
      isUser,
      loginClient,
      loginUser,
      registerClient,
      registerUser,
      logout,
      updateProfile
    } = useAuth();

    return {
      user,
      userType,
      loading,
      error,
      isLoggedIn,
      isClient,
      isUser,
      loginClient,
      loginUser,
      registerClient,
      registerUser,
      logout,
      updateProfile
    };
  }
};
```

### useAppointments
Composable para manejo de citas:

```javascript
import { useAppointments } from '@/composables/useAppointments.js';

export default {
  setup() {
    const {
      appointments,
      loading,
      error,
      hasAppointments,
      pendingAppointments,
      completedAppointments,
      cancelledAppointments,
      fetchAppointments,
      createAppointment,
      updateAppointmentStatus
    } = useAppointments();

    return {
      appointments,
      loading,
      error,
      hasAppointments,
      pendingAppointments,
      completedAppointments,
      cancelledAppointments,
      fetchAppointments,
      createAppointment,
      updateAppointmentStatus
    };
  }
};
```

### useBranches
Composable para manejo de sucursales:

```javascript
import { useBranches } from '@/composables/useBranches.js';

export default {
  setup() {
    const {
      branches,
      loading,
      error,
      hasBranches,
      activeBranches,
      fetchBranches,
      createBranch,
      updateBranch,
      deleteBranch
    } = useBranches();

    return {
      branches,
      loading,
      error,
      hasBranches,
      activeBranches,
      fetchBranches,
      createBranch,
      updateBranch,
      deleteBranch
    };
  }
};
```

### useServices
Composable para manejo de servicios:

```javascript
import { useServices } from '@/composables/useServices.js';

export default {
  setup() {
    const {
      services,
      loading,
      error,
      hasServices,
      activeServices,
      servicesByPrice,
      fetchServices,
      createService,
      updateService,
      deleteService
    } = useServices();

    return {
      services,
      loading,
      error,
      hasServices,
      activeServices,
      servicesByPrice,
      fetchServices,
      createService,
      updateService,
      deleteService
    };
  }
};
```

## Utilidades

### Manejo de Errores
```javascript
import { handleError, showError, showSuccess } from '@/utils/errorHandler.js';

// Manejar error
try {
  await someApiCall();
} catch (error) {
  const message = handleError(error);
}

// Mostrar notificaciones
showError('Mensaje de error');
showSuccess('Operación exitosa');
```

### Validaciones
```javascript
import { validateForm, validationRules } from '@/utils/validations.js';

// Validar formulario
const formData = {
  email: 'user@example.com',
  password: '123456'
};

const { isValid, errors } = validateForm(formData, validationRules.login);

if (!isValid) {
  console.log(errors);
}
```

## Guardias de Navegación

```javascript
import { requireAuth, requireClient, requireUser } from '@/router/guards.js';

// En router/index.js
const routes = [
  {
    path: '/profile',
    component: Profile,
    beforeEnter: requireAuth
  },
  {
    path: '/client-dashboard',
    component: ClientDashboard,
    beforeEnter: requireClient
  },
  {
    path: '/admin-dashboard',
    component: AdminDashboard,
    beforeEnter: requireUser
  }
];
```

## Ejemplo de Uso Completo

```vue
<template>
  <div>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h1>Bienvenido, {{ user?.name }}</h1>
      <button @click="logout">Cerrar sesión</button>
    </div>
  </div>
</template>

<script>
import { useAuth } from '@/composables/useAuth.js';
import { useAppointments } from '@/composables/useAppointments.js';
import { showSuccess } from '@/utils/errorHandler.js';

export default {
  setup() {
    const { user, loading, error, logout } = useAuth();
    const { appointments, fetchAppointments } = useAppointments();

    // Cargar datos al montar el componente
    onMounted(async () => {
      try {
        await fetchAppointments();
        showSuccess('Datos cargados correctamente');
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    });

    return {
      user,
      loading,
      error,
      appointments,
      logout
    };
  }
};
</script>
```

## Configuración del Entorno

Asegúrate de que la API esté corriendo en `http://localhost:8080` o modifica la URL base en `api.config.js`.

## Notas Importantes

1. **Tokens**: Los tokens se manejan automáticamente en los interceptores de axios
2. **Errores 401**: Se manejan automáticamente redirigiendo al login
3. **Estado Reactivo**: Los composables proporcionan estado reactivo con Vue 3
4. **Validaciones**: Incluye validaciones completas para formularios
5. **Notificaciones**: Sistema de notificaciones integrado
6. **Compatibilidad**: Mantiene compatibilidad con el código existente 