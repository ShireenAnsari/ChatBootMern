import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
import { config } from 'dotenv';
config();
const Port = process.env.PORT || 5000;
connectToDatabase().then(() => {
    app.listen(Port, () => {
        console.log(`Server opened at Port ${Port} 🤗`);
    });
}).catch(err => console.log(err));
//# sourceMappingURL=index.js.map