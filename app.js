const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');
const port = 3000;


const app = express();
app.use(cors());
app.use(cors({ origin: 'http://localhost:3001' }));

app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))








app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
  // connectPg(`select * from names;`)
});


