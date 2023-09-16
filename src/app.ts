import express from 'express';
import bodyParser from 'body-parser';
import telemetryRoutes from './routes/telemetry.routes';
import fs from "fs";
import YAML from 'yaml';
import swaggerUi  from 'swagger-ui-express';
import { sendErrorResponse } from "./error-handling/error-handler";
import { validateInputs } from "./middlewares/validation.middleware";

const app = express();
const file  = fs.readFileSync('src/api.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/spec', express.static('src/api.yaml'));

// Input Validation using OpenAPI middleware
app.use(validateInputs);

// Routes
app.use('/api', telemetryRoutes);

// Error handler
app.use(sendErrorResponse);

export default app;