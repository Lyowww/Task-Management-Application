const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { specs, swaggerUi } = require('./swagger');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('../database/db'); // Ensure the correct path to your database connection file

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/task', taskRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger: localhost:${port}/api-docs`);
});
