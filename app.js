// Requiring module
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerSpec');


// Creating express object
const app = express();

//Configure port number 
const port = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());


//Connection to mongDB 
mongoose.connect('mongodb://localhost:27017/student', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Use routes
app.use('/students', require('./routes/students-rest'));
app.use('/class', require('./routes/class-rest'));
// Use swaggerSpec in your app
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// Server Setup
app.listen(port,console.log(`Server started on port ${port}`));
