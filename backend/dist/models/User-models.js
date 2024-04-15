import mongoose from "mongoose";
import { randomUUID } from 'crypto';
const Chatsschema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID()
    },
    role: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});
const Userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    chats: [Chatsschema]
}, { timestamps: true });
export default mongoose.model('User', Userschema);
//# sourceMappingURL=User-models.js.map