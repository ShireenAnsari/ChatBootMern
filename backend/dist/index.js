import express from 'express';
const app = express();
// app.get('/')
app.use(express.json());
app.listen(5000, () => {
    console.log('Server opened');
});
//# sourceMappingURL=index.js.map