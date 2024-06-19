"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retirosReport = exports.multipleReport = exports.singleReport = void 0;
const documents_1 = require("./documents");
const pdfmake_1 = __importDefault(require("pdfmake"));
const fs_1 = __importDefault(require("fs"));
const retirosDocument_1 = require("./retirosDocument");
let fonts = {
    Roboto: {
        normal: 'src/middleware/pdf/fonts/Roboto-Regular.ttf',
        bold: 'src/middleware/pdf/fonts/Roboto-Medium.ttf',
        italics: 'src/middleware/pdf/fonts/Roboto-Italic.ttf',
        bolditalics: 'src/middleware/pdf/fonts/Roboto-MediumItalic.ttf'
    }
};
const printer = new pdfmake_1.default(fonts);
function singleReport(prestamo) {
    const individualDocDefinition = (0, documents_1.createIndividualdDocDefinition)(prestamo);
    const pdfDoc = printer.createPdfKitDocument(individualDocDefinition);
    pdfDoc.pipe(fs_1.default.createWriteStream('individualReport.pdf'));
    pdfDoc.end();
}
exports.singleReport = singleReport;
function multipleReport(prestamos, from, to) {
    const grupalDocDefinition = (0, documents_1.createGrupalDocDefinition)(prestamos, from, to);
    const pdfDoc = printer.createPdfKitDocument(grupalDocDefinition);
    pdfDoc.pipe(fs_1.default.createWriteStream('grupalReport.pdf'));
    pdfDoc.end();
}
exports.multipleReport = multipleReport;
function retirosReport(retiros, from, to) {
    const retiroDocDefinition = (0, retirosDocument_1.createRetirosDocDefinition)(retiros, from, to);
    const pdfDoc = printer.createPdfKitDocument(retiroDocDefinition);
    pdfDoc.pipe(fs_1.default.createWriteStream('retirosReport.pdf'));
    pdfDoc.end();
}
exports.retirosReport = retirosReport;
