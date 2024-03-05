import multer from "multer";
import path from "path";

import { createFilename } from "../../utils/files/files.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('static/images'));
  },

  filename: (req, file, cb) => {
    // cb(null, file.originalname);
    
    const data = req.body
    const fileName = ("" +  Date.now()).trim();
    const extName = path.extname(file.originalname)

    cb(null, fileName + extName);
  },
  limits: {
    fileSize: 500000,
  },
  // fileFilter(req, file, cb) {
  //   if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
  //     return cb(new Error("Please upload a valid image file"));
  //   }
  //   cb(undefined, true);
  // },
});

export const upload = multer({ storage });
