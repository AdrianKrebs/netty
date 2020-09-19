var express = require('express');
let fs = require('fs'),
    PDFParser = require("pdf2json");

var router = express.Router();

/* GET users listing. */
router.get('/average', function (req, res, next) {
    res.json({emissions: 29, unit: 'tons/year'});
});

router.get('/reduction', function (req, res, next) {


    res.json([
    {name: 'more efficient vehicle', tonsSaved: 2.2, dollarsSaved: '686', upfrontCosts: 2000},
    {name: 'purchase alternative fuel vehicle', tonsSaved: 3.0, dollarsSaved: '958', upfrontCosts: 17000},
    {name: 'purchase electric vehicle', tonsSaved: 4.3, dollarsSaved: '922', upfrontCosts: 15000},
    {name: 'Work from home', tonsSaved: 1.0, dollarsSaved: '545', upfrontCosts: 0},
    {name: 'Ride my bike', tonsSaved: 0.5, dollarsSaved: '165', upfrontCosts: 0},
    {name: 'Take public transportation', tonsSaved: 0.4, dollarsSaved: '165', upfrontCosts: 0},
    {name: 'Practice eco driving', tonsSaved: 0.4, dollarsSaved: '110', upfrontCosts: 0},
    {name: 'Carpool to work', tonsSaved: 0.9, dollarsSaved: '362', upfrontCosts: 0},
    {name: 'Reduce air travel', tonsSaved: 0.4, dollarsSaved: '102', upfrontCosts: 0},
    {name: 'Turn of lights', tonsSaved: 0.1, dollarsSaved: '46', upfrontCosts: 0},
    {name: 'Purchase high efficiency heating', tonsSaved: 0.1, dollarsSaved: '46', upfrontCosts: 0},
    {name: 'Reduce my waste', tonsSaved: 0.4, dollarsSaved: '17', upfrontCosts: 0},
    {name: 'Eat a low carbon diet', tonsSaved: 0.7, dollarsSaved: '419', upfrontCosts: 0},
    ]);
});


router.post('/analyse-pdf',  (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    console.log(req.files); // the uploaded file object
    let pdfParser = new PDFParser();
    fs.writeFileSync("sample.pdf", req.files.file.data);
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", pdfData => {
        fs.writeFileSync("F1040EZ.json", JSON.stringify(pdfData));
    });

    pdfParser.loadPDF('sample.pdf');

    res.sendStatus(200);
});


module.exports = router;
