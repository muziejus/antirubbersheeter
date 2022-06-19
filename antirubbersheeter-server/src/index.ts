import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import createBundle from "./create-bundle";
import uploadData from "./upload-data";
import root from "./root";

const app = express();

dotenv.config();

const port = process.env.PORT || 8989;

app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024 * 1024, // 10MB max file(s) size
    },
    safeFileNames: true,
    preserveExtension: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", root);

app.post("/create-bundle", createBundle);

app.post("/upload-data", uploadData);

app.listen(port, () => {
  console.log(`Backend is listening on port ${port}.`);
});
