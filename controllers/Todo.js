
const Todo = require("../model/Todo");

const getTodos = async (req, res) => {

  try {
    const articles = await Todo.find();
    res.send(articles);
    console.log(articles);
  } catch (err) {
    console.log(err);
  }
};

const createTodo = async (req, res) => {
  console.log(req)
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  });

  try {
    const articles = await todo.save();
    res.send(articles);
    console.log(articles);
  } catch (err) {
    console.log(err);
  }
};

const updateTodo = (req, res) => {

  Todo.findOneAndUpdate(
    { _id: req.params.todoID },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
      },
    },
    { new: true }
  ).
  then(post => res.json(post))
  .catch(err => res.status(400).json(err));
};

const deleteTodo = (req, res) => {
  Todo.deleteOne({ _id: req.params.todoID })
    .then((post) => res.json({ message: "Deleted Id: " + req.params.todoID }))
    .catch((err) => res.send(err));
};



module.exports = {
  getTodos, createTodo, updateTodo, deleteTodo
};