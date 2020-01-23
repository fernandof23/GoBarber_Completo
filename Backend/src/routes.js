import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middleware/auth';
import multerConfig from './config/multer';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
// daqui pra baixo precisa estar logado para acessa
routes.put('/users', UserController.update);
routes.post('/files', upload.single('files'), FileController.store);
routes.get('/providers', ProviderController.index);
routes.get('/provider/:provider_id/available', AvailableController.index);
routes.post('/appointment', AppointmentController.store);
routes.get('/appointment', AppointmentController.index);
routes.delete('/appointment/:id', AppointmentController.delete);
routes.get('/schedule', ScheduleController.index);
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

export default routes;
