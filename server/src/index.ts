import {
  RecognizeAnswer,
  RecognizeRequest,
} from "@100ff/shared";
import express, { Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT } from "./const";
import { recognize } from "./recognize";
import { base64ToByteArray } from "./base64ToByteArray";
const app = express();

app.use(bodyParser.json());

const tesseractRouter = Router();
tesseractRouter.post("/recognize", (req, res) => {
  const body = req.body as RecognizeRequest;
  const arrayBuffer = base64ToByteArray(body.image);

  recognize(arrayBuffer).then((text) => {
    const response: RecognizeAnswer = {
      text,
    };
    res.status(200).send(response).end();
  });
});

app.use(cors());
app.use("/", tesseractRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
