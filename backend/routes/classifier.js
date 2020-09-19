var express = require('express');
let fs = require('fs'),
    PDFParser = require("pdf2json");
var bodyParser = require('body-parser');
let request = require('request');
let ONESIGNAL_ACCESS_TOKEN = "ODhhZmM3Y2UtZDc0OS00Y2YyLWEwOTAtZGViOTU2M2I2ZmY5";
let ONESIGNAL_APP_ID = "a950c90c-d6fa-4efe-8e7a-eb13bb8c036d";
var router = express.Router();

/* GET users listing. */
router.get('/average', function (req, res, next) {
    res.json({emissions: 29, unit: 'tons/year'});
});

router.get('/reduction', function (req, res, next) {


    res.json([
        {
            name: 'Purchase more efficient vehicle',
            tonsSaved: 2.2,
            dollarsSaved: '686',
            upfrontCosts: 2000,
            proportion: {percentage: 43, category: 'Car'}
        },
        {
            name: 'Purchase electric vehicle',
            tonsSaved: 4.3,
            dollarsSaved: '922',
            upfrontCosts: 15000,
            proportion: {percentage: 43, category: 'Car'}
        },
        {name: 'Work from home', tonsSaved: 1.2, dollarsSaved: '545', upfrontCosts: 0, proportion: {percentage: 43, category: 'Car'}},
        {name: 'Carpool to work', tonsSaved: 0.9, dollarsSaved: '362', upfrontCosts: 0, proportion: {percentage: 43, category: 'Car'}},
        {name: 'Reduce air travel', tonsSaved: 0.7, dollarsSaved: '102', upfrontCosts: 0, proportion: {percentage: 22, category: 'Flight'}},
        {name: 'Ride my bike', tonsSaved: 0.5, dollarsSaved: '165', upfrontCosts: 0, proportion: {percentage: 43, category: 'Car'}},
        {
            name: 'Take public transportation',
            tonsSaved: 0.4,
            dollarsSaved: '165',
            upfrontCosts: 0,
            proportion: {percentage: 43, category: 'Car'}
        },
        {name: 'Practice eco driving', tonsSaved: 0.4, dollarsSaved: '110', upfrontCosts: 0, proportion: {percentage: 43, category: 'Car'}},
        {name: 'Turn of lights', tonsSaved: 0.1, dollarsSaved: '46', upfrontCosts: 0, proportion: {percentage: 7, category: 'Home'}},
        {
            name: 'Purchase high efficiency heating',
            tonsSaved: 0.1,
            dollarsSaved: '46',
            upfrontCosts: 0,
            proportion: {percentage: 7, category: 'Home'}
        },
        {name: 'Reduce my waste', tonsSaved: 0.4, dollarsSaved: '17', upfrontCosts: 0, proportion: {percentage: 7, category: 'Home'}},
        {
            name: 'Eat a low carbon diet',
            tonsSaved: 0.7,
            dollarsSaved: '419',
            upfrontCosts: 0,
            proportion: {percentage: 7, category: 'Food'}
        },
    ]);
});


// multipart/form-data;
router.post('/analyse-pdf', (req, res, next) => {

    let pdfParser = new PDFParser();
    fs.writeFileSync("transactions.pdf", Buffer.from(req.body.data.toString('utf-8'), 'base64'));
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => {
        fs.writeFileSync("parsedPdf.json", JSON.stringify(pdfData));
        const yOffset = 15.506;
        const pages = pdfData.formImage.Pages;
        const texts = pages[1].Texts; // get through all pages

        //TODO read lines until next date appears
        // y between lines 0.638
        // y between line with separator 0.753

        const parsedPages = extractTransactionRowsFromPdf(pdfData.formImage);
        parsedPages.forEach(rows => {
            rows.forEach(row => {
                console.log(JSON.stringify(row));
            })
        })


    });


    pdfParser.loadPDF('transactions.pdf');

    setTimeout(() => pushToUser("0977b6cb-1066-4324-878d-4e96fd4c3407", ["4e38d9da-6139-4f33-a3d1-2cea822d6c30"]), 2000);

    res.sendStatus(200);
});


router.get('/transaction-data', (req, res, next) => {
    res.json([
        {
            transactionId: 1,
            date: "01.02.20",
            text: "EAT.CH",
            location: "ZURICH CH",
            category: "Food",
            price: "38.70",
            carbon: 0.3,
            score: 0.8,
        },
        {
            transactionId: 2,
            date: "02.02.20",
            text: "Coop Pronto Dubendorfer.",
            location: "Zurich CH",
            category: "Groceries",
            price: "12.25",
            carbon: 0.2,
            score: 0.7
        },
        {
            transactionId: 3,
            date: "05.02.20",
            text: "SOCAR Buhlwiesen",
            location: "Dubendorf CH",
            category: "Car",
            price: "58.20",
            carbon: 65,
            score: 0.9
        },
        {
            transactionId: 3,
            date: "24.02.20",
            text: "Agrola Tankstelle",
            location: "Bern CH",
            category: "Car",
            price: "65.20",
            carbon: 100,
            score: 0.9
        },
        {
            transactionId: 4,
            date: "08.02.20",
            text: "IKEA Dt. NL Freiburg",
            location: "Freiburg im B DE",
            category: "Goods",
            price: "212.20",
            carbon: 4.2,
            score: 0.85
        },
        {
            transactionId: 5,
            date: "09.02.20",
            text: "Shamrock Irish Pub",
            location: "Zurich CH",
            category: "Food",
            price: "15.20",
            carbon: 0.2,
            score: 0.3
        },
        {
            transactionId: 6,
            date: "11.02.20",
            text: "Press & Books",
            location: "Zuerich CH",
            category: "Goods",
            price: "15.20",
            carbon: 0.2,
            score: 0.85
        },
        {
            transactionId: 7,
            date: "18.02.20",
            text: "Thai Airways",
            location: "Zurich CH",
            category: "Flight",
            price: "1002.00",
            carbon: 870,
            score: 0.95
        },
        {
            transactionId: 8,
            date: "18.02.20",
            text: "Europcar.com/de",
            location: "Hamburg DE",
            category: "Car",
            price: "120.00",
            carbon: 210,
            score: 0.8
        },
        {
            transactionId: 9,
            date: "18.02.20",
            text: "APPLE.COM/BILL",
            location: "ITUNES.COM IE",
            category: "Internet",
            price: "1.50",
            carbon: 0,
            score: 0.8
        },
        {
            transactionId: 10,
            date: "23.02.20",
            text: "DEICHMANN",
            location: "München DE",
            category: "Goods",
            price: "55.20",
            carbon: 85,
            score: 0.75
        }


    ])

});

let extractTransactionRowsFromPdf = function (data) {
    var myPages = [];
    const yOffset = 15.506;

    for (var p = 0; p < data.Pages.length; p++) {
        var page = data.Pages[p];

        var rows = []; // store Texts and their x positions in rows

        for (var t = 0; t < page.Texts.length; t++) {
            var text = page.Texts[t];

            var foundRow = false;
            for (var r = rows.length - 1; r >= 0; r--) {

                // y value of Text falls within the y-value range, add text to row:
                var maxYdifference = 0.638;
                if (rows[r].y - maxYdifference < text.y && text.y < rows[r].y + maxYdifference) {

                    // only add value of T to data (which is the actual text):
                    for (var i = 0; i < text.R.length; i++) {
                        rows[r].data.push({
                            text: decodeURIComponent(text.R[i].T),
                            x: text.x
                        });
                    }
                    ;
                    foundRow = true;
                }
            }
            ;
            if (!foundRow) {
                // create new row:
                var row = {
                    y: text.y,
                    data: []
                };

                // add text to row:
                for (var i = 0; i < text.R.length; i++) {
                    row.data.push({
                        text: decodeURIComponent(text.R[i].T),
                        x: text.x
                    });
                }
                ;

                // add row to rows:
                rows.push(row);
            }

        }
        ;


        // filter y offset
        const filteredRows = rows.filter(row => row.y > yOffset);
        // sort each extracted row
        for (var i = 0; i < filteredRows.length; i++) {
            filteredRows[i].data.sort(comparer)
        }


        // add rows to pages:
        myPages.push(filteredRows);
    }
    ;

    return myPages;
}


let comparer = function (a, b) {
    /*
        Compares two objects by their 'x' properties.
    */
    if (a.x > b.x) {
        return 1;
    }
    if (a.x < b.x) {
        return -1;
    }
    // a must be equal to b
    return 0;
}

let pushToUser = function (template, players) {
    request({
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Basic ' + ONESIGNAL_ACCESS_TOKEN
            },
            url: 'https://onesignal.com/api/v1/notifications',
            json: true,
            method: 'POST',
            body: {
                "include_player_ids": players,
                "app_id": ONESIGNAL_APP_ID,
                "template_id": template
            }
        }, function (error, response) {
            if (error) {
                console.log(error);
            }
        }
    )
}


module.exports = router;
