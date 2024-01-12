import PDFDocument from "pdfkit";
import fs from "fs";

export const generateProductPresentation = ({ productDetails, username }) => {
  const pdfPresentation = new PDFDocument({
    displayTitle: true,
  });

  pdfPresentation.info["Title"] = "ESI Enterprises";

  //   const struct = pdfPresentation.struct("Document");
  //   pdfPresentation.addStructure(struct);

  pdfPresentation.pipe(fs.createWriteStream(`static/presentation.pdf`));

  console.log(productDetails);

  productDetails.forEach((product) => {
    // first we need to add all categories in an array and make a list at the begining of the presentation
    // then we need to create a page for each category

    // the A4 - landscape page is (Width: 841.89 x Height: 595.28)
    pdfPresentation.addPage({
      size: "A4",
      layout: "landscape",
    });

    pdfPresentation.rect(0, 0, 300, 200).fill("#0074D9");

    // Embed a font, set the font size, and render some text
    pdfPresentation.font("Helvetica-Bold").fillColor("white").fontSize(18);
    pdfPresentation.text(product.brand, 25, 25);

    // Embed a font, set the font size, and render some text
    pdfPresentation.font("Helvetica-Bold").fillColor("white").fontSize(16);
    pdfPresentation.text(product.model, 25, 60);

    // Embed a font, set the font size, and render some text
    pdfPresentation.font("Helvetica-Bold").fillColor("black").fontSize(14);
    pdfPresentation.text(product.description, 400, 25);

    // Embed a font, set the font size, and render some text
    pdfPresentation.font("Helvetica-Bold").fillColor("black").fontSize(14);
    pdfPresentation.text(`Price: $99.99`, 25, 400);

    // Embed a font, set the font size, and render some text
    pdfPresentation.font("Helvetica-Bold").fillColor("black").fontSize(14);
    pdfPresentation.text(`Available Quantity: ${product.quantity}`, 25, 450);

    // Add an image, constrain it to a given size, and center it vertically and horizontally
    pdfPresentation.image("static/images/product.png", {
      fit: [400, 300],
      align: "center",
      valign: "bottom",
    });
  });

  pdfPresentation.end();

  return {
    presentation_message: "Presentation Created Success",
    presentatio_name: `${username}_presentation.pdf`,
  };
};
