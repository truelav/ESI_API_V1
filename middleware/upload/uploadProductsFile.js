import multer from "multer"
import fs from "fs"

const storage = multer.memoryStorage({
    dest: 'uploads/'
});

export const uploadProductsFile = multer({ storage })