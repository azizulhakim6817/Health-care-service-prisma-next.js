import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import config from "./config";
import router from "./app/routes";

const app: Application = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//index.ts --> router improt
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Server is running",
    environment: config.node_env,
    uptime: process.uptime().toFixed(2),
    timeStam: new Date().toISOString(),
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
