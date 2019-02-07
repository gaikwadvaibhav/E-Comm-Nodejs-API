const multer = require('multer');
var path = require('path')
var XLSX = require('xlsx');
var xlsx = require("node-xlsx");
var async = require("async");
var json2xls = require('json2xls');
var fs = require('fs');

var userModel = require('../models/user')

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/attachment/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, datetimestamp + path.extname(file.originalname));
    }
});

// Define font files
var fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
};

var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

var docDefinition = {
    // ...
};

var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('document.pdf'));
pdfDoc.end();


var upload = multer({ //multer settings for single file
    storage: storage,
    limits: {
        fileSize: 32 * 1024 * 1024
    }
}).single('file');

//multer settings for multiple file
var storage1 = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/attachment1/');
    },
    filename: function (req, file, callback) {
        var datetimestamp = Date.now();
        const fileName = file.originalname.split('.').slice(0, -1).join('.')
        const extention = file.originalname.substr((Math.max(0, file.originalname.lastIndexOf(".")) || Infinity) + 1)
        callback(null, fileName + "-" + datetimestamp + "." + extention);
    }
});
var upload1 = multer({
    storage: storage1
}).array("file", 12)

module.exports = {

    // Upload multiple files
    uploadFiles: (req, res) => {
        console.log('req', req.files)
        upload1(req, res, function (err) {
            if (err) {
                res.status(500).send({
                    message: 'Error occured',
                    error: err
                })
            } else {
                res.status(200).json({
                    message: 'files uploaded successfully',
                    file: req.files,
                });
            }
        })
    },

    // Upload any type of file upto 32MB size
    uploadFile: (req, res) => {
        var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
        console.log('docDefinition', docDefinition)

        // var pdfData = PdfPrinter.createPdf(docDefinition);
        // console.log('pdfData------', pdfData)
        // pdfData.write('pdfs/basics.pdf')

        console.log('req', req)
        upload(req, res, function (err) {
            // for json format data
            const workbook = XLSX.readFile(req.file.path, {
                cellDates: true
            })
            // read xlsx file in JSON format
            const sheet_name_list = workbook.SheetNames;
            const SheetJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
            console.log('SheetJson', SheetJson)

            // create xlsx file 
            const SheetJson12 = XLSX.utils.json_to_sheet(SheetJson)
            console.log('SheetJson12', SheetJson12)

            var xls = json2xls(SheetJson);
            fs.writeFileSync('test-file.xlsx', xls, 'binary');



            async.each(SheetJson, (record, callback) => {
                console.log('record------------', record)

                var user = new userModel(record)
                console.log('user-----------', user)
                user.save((err) => {
                    if (err) {
                        callback(err)
                    } else {
                        callback()
                    }
                })
            })

            if (err) {
                res.status(500).send({
                    message: 'Error occured',
                    error: err
                })
            } else {
                res.status(200).json({
                    message: 'file uploaded successfully',
                    file: SheetJson12,
                });
            }
        })
    }



}