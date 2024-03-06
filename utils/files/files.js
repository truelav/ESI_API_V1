import fs from 'fs';

export const createFilename = () => {
  const fileName = ('' + Date.now()).trim();
  // const brandName = req.body.brand.split(" ").join("")
  // const modelName = req.body.model.split(" ").join("")
  // const extName = path.extname(file.originalname)
  // const fileName = brandName + '-' + modelName + '-' + uniqueSuffix
  return fileName;
};

export const checkIfFileExists = () => {};

export const deleteImage = async (images) => {
  if (!images) return;

  const imagePath = images.slice(22);

  if (imagePath === '/fallback_image.jpeg' || !imagePath) {
    return;
  } else {
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log(err);
        throw new Error('There was an error with deleting the product image');
      }
      return;
    });
  }
};
