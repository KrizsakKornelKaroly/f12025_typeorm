import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import cors from "cors";

//import routes

import circuitRoutes from "./routes/circuit.routes";
import driverRoutes from "./routes/driver.routes";
import raceRoutes from "./routes/race.routes";
import raceresultRoutes from "./routes/raceresult.routes";
import systemRoutes from "./routes/system.routes";
import teamRoutes from "./routes/team.routes";


dotenv.config({ path: './src/.env' });
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api", systemRoutes)
app.use("/api/teams", teamRoutes)
app.use("/api/drivers", driverRoutes)
app.use("/api/circuits", circuitRoutes)
app.use("/api/races", raceRoutes)
app.use("/api/results", raceresultRoutes)

AppDataSource.initialize()
  .then(() => {
    console.log("DataSource initialized!");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });

export default app;
