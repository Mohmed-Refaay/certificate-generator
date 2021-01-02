import React, { useState } from "react";



import { Input, Button } from "@material-ui/core";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fileDownload from "js-file-download";
import FormContainer from "./style";
import logo from "./assets/logo.png";

import pdf from "./blankCerti.pdf";
import googleFonts from "./assets/fonts/GoogleSansDisplay-Regular-v1.27.ttf";

const App = () => {
  const [name, setName] = useState("");
  const [purpose, setpurpose] = useState("");

  async function modifyPdf() {
    const existingPdfBytes = await fetch(pdf).then((res) => res.arrayBuffer());
    const fontBytes = await fetch(googleFonts).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes);

    const textWidth = customFont.widthOfTextAtSize(name, 50);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { height, width } = firstPage.getSize();

    firstPage.drawText(name, {
      x: width / 2 - textWidth / 2,
      y: height / 2 + 50,
      size: 50,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(purpose, {
      x: 155,
      y: height / 2,
      size: 20,
      font: customFont,
      color: rgb(0.95, 0.6, 0),
      maxWidth: 540,
    });

    const pdfBytes = await pdfDoc.save();

    fileDownload(pdfBytes, `${name}-Certificate.pdf`);
  }

  return (
    <FormContainer>
      <img className="Img" src={logo} alt="logo" />

      <div className="inputsContainer">
        <Input
          autoFocus
          placeholder="Name"
          value={name}
          className="nameInput"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Purpose"
          value={purpose}
          onChange={(e) => setpurpose(e.target.value)}
        />
      </div>
      <Button
        className="btn"
        primary
        variant="contained"
        disabled={!name || !purpose}
        onClick={modifyPdf}
      >
        Print The Certificate
      </Button>
    </FormContainer>
  );
};

export default App;
