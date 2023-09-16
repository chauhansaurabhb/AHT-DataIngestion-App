**AHT Data Ingestion App:**

The express typescript app conatins implementation of the POST api/telemetry endpoint to enable telemetry data ingestion. It implements the following functionalities:
- Data validation layer is implemented using OpenAPI specification
- Auth mechanism is in place and which is based on JWT token
- Swagger UI is integrated with the app to provide API playground to users
- Test cases are implemented using Jest framework to validate the implemented logic

**Prerequisites to run the App:**

- Node.js, npm and TypeScript setup required
- PostgreSQL should be installed (ref: https://www.postgresql.org/download/)
- Clone the App respository from URL: https://github.com/chauhansaurabhb/AHT-DataIngestion-App using the command `git clone https://github.com/chauhansaurabhb/AHT-DataIngestion-App.git`
- Specify PostgreSQL connection configuration using the `ormconfig.json` file (located in the AHT-DataIngestion-App directory)
- Open the terminal, go to the AHT-DataIngestion-App directory and run the command `npm i` (this will install the required modules specified in the `package.json` file)

**Run the App:**

- To run the app, go to the AHT-DataIngestion-App directory using terminal and execute the command `npm run dev`.
    - This will start the express server on port 3000 as specified in the `.env` file.
    - To access the Swagger UI, go to the URL: http://localhost:3000/api-docs/. This will provide API playground to interact with API. Before trying out the `POST /telemetry` route, first authorize using the JWT token provided in the `.env` file.

**Run test cases:**
- To execute the implemented test cases, go to the AHT-DataIngestion-App directory using terminal and execute the command `npm test`.
    - This will execute the test cases using Jest framework and display the test cases execution sumary at the end of the execution.

**Notes on Authentication implementation:**
- The App supports Authentication mechanism and it's implemented as a middleware layer. The JWT based authentication mechanism is integrated with the route i.e. `POST api/telemetry`.
- For the JWT token verification, valid JWT token is generated based on the JWT secret specified in the `.env` file. 
- For the production version, this can be extended to validate whether the provided token is valid or not (JWT token should have limited validity for the security purpose). Based on the JWT payload, further validation can be done by checking the payload data field in the user database (to ensure that the request is coming from the valid user) and different access mechanism can be implemented to restrict the API access. For example, users with admin access rights can access all API calls and rest users can access only GET APIs.
