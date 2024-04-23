import UserModels from "../models/User-models.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi } from "openai";
export const generateCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        // Check if user is authenticated
        const user = await UserModels.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered or Token malFunctions" });
        }
        // Prepare chat messages for OpenAI API
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" });
        // Configure OpenAI API with API key
        const openai = new OpenAIApi(configureOpenAI());
        // Send messages to OpenAI API for completion
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        // Save chat response to user's chats
        const latestResponse = chatResponse.data.choices[0].message;
        user.chats.push(latestResponse);
        await user.save();
        // Return updated chats
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
//# sourceMappingURL=chat-controllers.js.map