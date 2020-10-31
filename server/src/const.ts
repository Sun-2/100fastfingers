import * as path from "path";
import * as os from "os";

export const TESSERACT_BIN = process.env.TESSERACT_BIN || "tesseract";
export const lang = "pol";
export const imgPath = path.join(os.tmpdir(), "img-tess-100ff.jpeg");

export const ANSWER_DELAY = process.env.ANSWER_DELAY || 6700;