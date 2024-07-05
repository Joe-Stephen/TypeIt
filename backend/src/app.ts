import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import router from "./router";

//setting up express app
const app = express();
const port = 3000 || process.env.port;

//express configuration
app.use(cors()); //enabling cors
app.use(helmet()); //enabling helmet for security
app.use(morgan("dev")); //enabling morgan for logging

//starting the express app
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//route for testing server
app.get("/ping", (req, res) => {
  return res.send("pong");
});

//assigning routes
app.use("/", router);

export default app;
