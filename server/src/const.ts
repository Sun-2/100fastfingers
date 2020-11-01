import * as path from "path";
import * as os from "os";
import {TESS_SERVER_DEFAULT_PORT} from "@100ff/shared";

export const TESSERACT_BIN = process.env.TESSERACT_BIN || "tesseract";
export const lang = "pol";
export const imgPath = path.join(os.tmpdir(), "img-tess-100ff.jpeg");

export const PORT = process.env.PORT || TESS_SERVER_DEFAULT_PORT;