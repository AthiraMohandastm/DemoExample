const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');
const path = require('path');


const PORT = 5000;

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Student and Classes',
        version: '1.0.0',
        description: 'API details for student and class ',
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
          description: 'Local development server',
        },
      ],
    },
    apis: ['./routes/*.js'], 
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);

  // Save the Swagger JSON to a file (optional)
  // const outputFile = path.resolve(__dirname, 'swagger-output.json'); 
  // fs.writeFileSync(outputFile, JSON.stringify(swaggerSpec, null, 2));


  module.exports = swaggerSpec;