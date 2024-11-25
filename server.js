const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000

async function main() {
    await mongoose.connect('mongodb+srv://soorajcpchathanathparampil:Todo_password@cluster0.5iova.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}
main()
    .then(() => console.log("DB connected"))
    .catch((err) => console.error("DB connection failed", err));

const todoSchema = new mongoose.Schema({
    user: { type: String },
    email: { type: String },
    task: { type: String }
});

const Todo = mongoose.model('todos', todoSchema);

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.json(todos);
    } catch (err) {
        res.status(500).send({ error: 'Error when fetching todos' });
    }
});

app.post('/', async (req, res) => {
    try {
        const todos = new Todo(req.body);
        await todos.save();
        res.send("Reponse for POST requsest");
    } catch (err) {
        res.status(500).send('Failed POST requsest');
    }
});

app.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedTodo = req.body;
    try {
        await Todo.findByIdAndUpdate(id, updatedTodo);
        res.send("Reponse for PUT requsest");
    } catch (err) {
        res.status(500).send('Failed PUT requsest');
    }
});

app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Todo.findByIdAndDelete(id);
        res.send('Todo deleted successfully!');
    } catch (err) {
        res.status(500).send("Reponse for DELETE requsest");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})