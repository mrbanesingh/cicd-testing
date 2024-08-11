// // src/swaggerConfig.ts
// import swaggerAutogen from "swagger-autogen";

// const doc = {
//   info: {
//     title: "Kailash Boiler Plate",
//     description: "Boilder plate API",
//   },
//   host: "localhost:8000",
//   schemes: ["http"],
// };

// const outputFile = "./swagger-output.json";
// const endpointsFiles = ["./src/routes/*.ts"]; // Adjust the path as needed

// swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
//   console.log("Swagger JSON generated");
//   require("./index"); // Ensure this path is correct
// });

// src/swaggerConfig.ts
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Kailash Boiler Plate",
    version: "1.0.0",
    description: "Boilerplate API",
  },
  servers: [
    {
      url: "http://localhost:8000/api/v1",
      description: "Development server",
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  // Path to the API specs
  apis: [path.join(__dirname, "./modules/**/routes/*.ts")],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
