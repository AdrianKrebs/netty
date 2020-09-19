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


// multipart/form-data;
router.post('/analyse-pdf', (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    console.log(req.files); // the uploaded file object
    let pdfParser = new PDFParser();
    fs.writeFileSync("transactions.pdf", req.files.file.data);
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => {
        fs.writeFileSync("parsedPdf.json", JSON.stringify(pdfData));
        const yOffset = 15.506;
        const pages = pdfData.formImage.Pages;
        const texts = pages[1].Texts;

        //TODO read lines until next date appears
        // y between lines 0.638
        // y between line with separator 0.753

        let firstLine = texts.filter(text => text.y === yOffset).map(entry => entry.R[0].T);

        res.json([
            {
                transactionId: 1,
                date: "01.02.20",
                text: "EAT.CH",
                location: "ZURICH CH",
                category: "Fastfood-Restaurants",
                emissioCategory: "Food",
                price: "38.70",
                carbon: 0.3,
                score: 0.8
            },
            {
                transactionId: 2,
                date: "02.02.20",
                text: "Coop Pronto Dubendorfer.",
                location: "Zurich CH",
                category: "Supermärkte, Lebensmittel",
                emissionCategory: "Groceries",
                carbon: 0.2,
                score: 0.7
            },
            {
                transactionId: 3,
                date: "05.02.20",
                text: "SOCAR Buhlwiesen",
                location: "Dubendorf CH",
                category: "Tankstellen",
                emissionCategory: "Car",
                price: "58.20",
                carbon: 5.2,
                score: 0.9
            },
            {
                transactionId: 4,
                date: "15.02.20",
                text: "IKEA Dt. NL Freiburg",
                location: "Freiburg im B DE",
                category: "Möbel und Inneneinrichtung",
                emissionCategory: "Goods",
                price: "212.20",
                carbon: 4.2,
                score: 0.85
            },
            {
                transactionId: 5,
                date: "16.02.20",
                text: "Shamrock Irish Pub",
                location: "Zurich CH",
                category: "Restaurants",
                emissionCategory: "Food",
                price: "15.20",
                carbon: 0.2,
                score: 0.85
            }




        ])
    });


    pdfParser.loadPDF('transactions.pdf');

    res.sendStatus(200);
});


module.exports = router;
