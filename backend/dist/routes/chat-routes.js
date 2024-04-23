import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/Validaters.js";
import { generateCompletion } from "../controllers/chat-controllers.js";
const ChatRoutes = Router();
ChatRoutes.post('/new', validate(chatCompletionValidator), verifyToken, generateCompletion);
export default ChatRoutes;
//# sourceMappingURL=chat-routes.js.map