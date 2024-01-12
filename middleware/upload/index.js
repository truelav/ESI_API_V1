import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.body)
    cb(null, path.join('static/images'));
  },

  filename: (req, file, cb) => {
    // cb(null, file.originalname);
    
    const uniqueSuffix = ("" +  Date.now()).trim();
    const brandName = req.body.brand.split(" ").join("")
    const modelName = req.body.model.split(" ").join("")
    const extName = path.extname(file.originalname)
    const fileName = brandName + '-' + modelName + '-' + uniqueSuffix
    cb(null, fileName + extName);
  },
  limits: {
    fileSize: 500000,
  },
  //   fileFilter(req, file, cb) {
  //     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
  //       return cb(new Error("Please upload a valid image file"));
  //     }
  //     cb(undefined, true);
  //   },
});

export const upload = multer({ storage });
