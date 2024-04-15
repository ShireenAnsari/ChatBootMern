import { Router } from 'express';
import Userroute from './user-route.js';
import ChatRoutes from './chat-routes.js';
const appRoutes = Router();
appRoutes.use('/user', Userroute);
appRoutes.use('/chats', ChatRoutes);
export default appRoutes;
//# sourceMappingURL=index.js.map