const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Task = require('./models/task');

dotenv.config();

const app = express();
const port = 3500;

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to db!");
  app.listen(port, () => console.log(`Server is running on port ${port}`));
});


app.get('/:userId', (req, res) => {
  console.log('GET: req.params.userId', req.params.userId);

  try {
    Task.find({ userId: req.params.userId }, (err, tasks) => {
      if (err) {
        console.log('GET: An error has occurred', err);
        res.sendStatus(400);
      } else {
        console.log('GET: Success ', tasks);
        res.sendStatus(200);

      }
    });
  } catch (err) {
    console.log('catch - GET: An error has occurred', err);
    res.sendStatus(400);
  }
});

app.post('/', async (req, res) => {
  console.log('POST: req.query', req.query);

  let todoTask = new Task(req.query);
  console.log('Task details ', todoTask);

  try {
    await todoTask.save();
    console.log('POST: Success');
    res.sendStatus(200);
  } catch (err) {
    console.log('catch - POST: An error has occurred', err);
    res.sendStatus(400);
  }
});

app.put('/:userId', (req, res) => {
  console.log('PUT: req.params.userId', req.params.userId);
  console.log('PUT: req.query.content', req.query.content);

  try {
    Task.find({ userId: req.params.userId }, (err, tasks) => {
      if (err) {
        console.log('PUT - find: An error has occurred', err);
        res.sendStatus(400);
      } else {
        console.log('PUT - find: Success ', tasks);
        Task.findByIdAndUpdate(tasks[0]._id, { content: req.query.content }, err => {
          if (err) {
            console.log('PUT: An error has occurred', err);
            res.sendStatus(400);
          } else {
            console.log('PUT - find: Success ');
            res.sendStatus(200);
          }
        });
      }
    });
  } catch (err) {
    console.log('catch - PUT: An error has occurred', err);
    res.sendStatus(400);
  }
});

app.delete('/:userId', (req, res) => {
  console.log('DELETE: req.params.userId', req.params.userId);
  
  try {
    Task.find({ userId: req.params.userId }, (err, tasks) => {
      if (err) {
        console.log('DELETE - find: An error has occurred', err);
        res.sendStatus(400);
      } else {
        console.log('DELETE - find: Success ', tasks);
        Task.findByIdAndRemove(tasks[0]._id, err => {
          if (err) {
            console.log('DELETE: An error has occurred', err);
            res.sendStatus(400);
          } else {
            console.log('DELETE - find: Success ');
            res.sendStatus(200);
          }
        });
      }
    });
  } catch (err) {
    console.log('catch - DELETE: An error has occurred', err);
    res.sendStatus(400);
  }
});

