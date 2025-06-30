import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import Registro from '@/components/Registro.vue';
import HomePage from '@/components/HomePage.vue';
import EmployeeDashboard from '@/components/EmployeeDashboard.vue';
import GestionarClientes from '@/components/GestionarClientes.vue';
import GestionarCitas from '@/components/GestionarCitas.vue';
import GestionarCitasBarbero from '@/components/GestionarCitasBarbero.vue';
import GestionarCitasRecepcionista from '@/components/GestionarCitasRecepcionista.vue';
import GestionarEmpleados from '@/components/GestionarEmpleados.vue';
import GestionarServicios from '@/components/GestionarServicios.vue';
import GestionarSucursales from '@/components/GestionarSucursales.vue';
import AgendarCita from '@/components/AgendarCita.vue';
import SeleccionarHorario from "@/components/SeleccionarHorario.vue";
import CitasCliente from "@/components/CitasCliente.vue";
import Citas from "@/components/Citas.vue";
import Perfil from '@/components/Perfil.vue';
import Contacto from '@/components/Contacto.vue';
import SobreNosotros from '@/components/SobreNosotros.vue';

// Definición de rutas para la navegación de la aplicación
const routes = [
  {
    path: '/',
    name: 'SobreNosotros',
    component: SobreNosotros,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro, // Página de registro de usuario
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage, // Página principal después de iniciar sesión
  },
  {
    path: '/employee-dashboard',
    name: 'EmployeeDashboard',
    component: EmployeeDashboard, // Panel de administración para empleados
  },
  {
    path: '/agendar-cita',
    name: 'AgendarCita',
    component: AgendarCita, // Componente para agendar citas
  },
  {
    path: '/gestionar-clientes',
    name: 'GestionarClientes',
    component: GestionarClientes,
  },
  {
    path: '/gestionar-citas',
    name: 'GestionarCitas',
    component: GestionarCitas,
  },
  {
    path: '/gestionar-citas-barbero',
    name: 'GestionarCitasBarbero',
    component: GestionarCitasBarbero,
  },
  {
    path: '/gestionar-citas-recepcionista',
    name: 'GestionarCitasRecepcionista',
    component: GestionarCitasRecepcionista,
  },
  {
    path: '/gestionar-empleados',
    name: 'GestionarEmpleados',
    component: GestionarEmpleados,
  },
  {
    path: '/gestionar-servicios',
    name: 'GestionarServicios',
    component: GestionarServicios,
  },
  {
    path: '/gestionar-sucursales',
    name: 'GestionarSucursales',
    component: GestionarSucursales,
  },
  {
    path: '/seleccionar-horario/:selectedServices?',
    name: 'SeleccionarHorario',
    component: SeleccionarHorario,
    props: true,
  },
  {
    path: '/mis-citas', // Esta es la ruta para la aplicación de citas del cliente
    name: 'MisCitasCliente',
    component: CitasCliente, // Asegúrate de que 'CitasCliente' sea el nombre correcto de tu componente de Mis Citas
    props: (route) => {
      const bookedData = route.query.bookedAppointmentsJson;
      return { bookedAppointmentsJson: bookedData };
    }
  },
  {
    path: '/citas',
    name: 'Citas',
    component: Citas,
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
  },
  {
    path: '/contacto',
    name: 'Contacto',
    component: Contacto,
  },
];

// Creación del enrutador con historial web
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
