const fs = require('fs');

function arquivoJson(arquivo, callback) {
  fs.readFile(arquivo, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo JSON:', err);
      return callback(err, null);
    }

    try {
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON:', parseError);
      callback(parseError, null);
    }
  });
}

function elementoPorId(arquivo, idDesejado, callback) {
  arquivoJson(arquivo, (err, jsonData) => {
    if (err) {
      return callback(err, null);
    }

    const elemento = jsonData.find(elemento => elemento.id === idDesejado);
    if (elemento) {
      callback(null, elemento);
    } else {
      callback(`Elemento com ID ${idDesejado} não encontrado.`, null);
    }
  });
}

module.exports = { elementoPorId, arquivoJson };
