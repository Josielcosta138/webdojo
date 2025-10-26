const fs = require('fs');
const pdf = require('pdf-parse');

//Lê e extrai o texto do PDF dp caminho expecificado
function readPdfFile(path){
    const dataBuffer = fs.readFileSync(path);

    return pdf(dataBuffer).then(data => data.text);
}

module.exports = {readPdfFile};