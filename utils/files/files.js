
export const createFilename = () => {
    const fileName = ("" +  Date.now()).trim();
    // const brandName = req.body.brand.split(" ").join("")
    // const modelName = req.body.model.split(" ").join("")
    // const extName = path.extname(file.originalname)
    // const fileName = brandName + '-' + modelName + '-' + uniqueSuffix
    return fileName
}

export const checkIfFileExists = () => {
    
}