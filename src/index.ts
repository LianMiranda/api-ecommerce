import express from "express";
import { Request, Response, NextFunction } from "express";
import { router } from "./routes/routes";
import { errorHandler } from "./api/middlewares/errorMiddleware";
import { CustomError } from "./helpers/CustomError/customError";

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(
  (
    err: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    errorHandler(err, req, res, next);
  }
);

app.get("/", async (req: Request, res: Response):Promise<void> => {
   res.send("Api rodou!")
})
