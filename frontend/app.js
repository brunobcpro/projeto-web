const axios = require("axios");
const cheerio = require("cheerio");

// Fazendo uma solicitação GET para a rota localhost:3000
axios.post("http://localhost:3000",{nome:"Bruno",senha:"12345"})
  .then(response => {
    const htmlContent = response.data;
    console.log(htmlContent)

    // Carregando o HTML com o cheerio
    const $ = cheerio.load(htmlContent);

    // Exemplo: Obtendo o conteúdo de uma tag <h1>
    const h1Content = $("h1").text();
    console.log("Conteúdo do <h1>:", h1Content);
  })
  .catch(error => {
    console.error("Erro ao buscar HTML:", error);
  });
