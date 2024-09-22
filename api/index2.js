const express = require('express');
const XLSX = require('xlsx');
const path = require('path');
const app = express();
const port = 3000;  // Pode ajustar a porta conforme necessário

// Função para ler o arquivo XLSX e retornar os dados
function readExcelFile() {
  const filePath = path.join(__dirname, 'DRE_Consolidated.xlsx');  // Caminho do arquivo XLSX
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];  // Pegando a primeira sheet
  const jsonData = XLSX.utils.sheet_to_json(sheet);  // Convertendo a planilha para JSON
  return jsonData;
}

// Rota para retornar os dados da planilha consolidada
app.get('/dados', (req, res) => {
  try {
    const data = readExcelFile();  // Lê os dados da planilha
    res.json(data);  // Retorna os dados em formato JSON
  } catch (error) {
    res.status(500).send('Erro ao ler o arquivo XLSX.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
