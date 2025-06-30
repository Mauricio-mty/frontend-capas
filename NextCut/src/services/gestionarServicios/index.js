// Servicios específicos para gestionarServicios 

import { servicesService } from './services.services.js';

export const getAllServices = servicesService.getAllServices;
export const getServiceById = servicesService.getServiceById;
export const createService = servicesService.createService;
export const updateService = servicesService.updateService;
export const deleteService = servicesService.deleteService; 