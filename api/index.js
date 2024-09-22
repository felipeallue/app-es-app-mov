const express = require('express');
const XLSX = require('xlsx');
const path = require('path');
const app = express();
const port = 3000;

// Função para ler o arquivo XLSX e retornar dados como JSON
function readExcelFile(fileName) {
  const filePath = path.join(__dirname, fileName);
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Primeira planilha
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet); // Converte para JSON
}
function readAndFilterExcelFile(fileName, year, month) {
    const filePath = path.join(__dirname, fileName);
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Primeira planilha
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
  
    // Filtrar os dados com base no ano e mês
    const filteredData = jsonData.filter(item => {
      const data = new Date(item.Data); // Supondo que a coluna de data no arquivo XLSX seja chamada 'Data'
      return data.getFullYear() === parseInt(year) && data.getMonth() + 1 === parseInt(month);
    });
  
    return filteredData;
  }
  
// API 1 - Dashboard 1
app.get('/dados1', (req, res) => {
  try {
    const dados = readExcelFile('contabilidade1.xlsx');
    res.json(dados);
  } catch (error) {
    res.status(500).send('Erro ao ler o arquivo XLSX para Dashboard 1.');
  }
});

// API 2 - Dashboard 2
app.get('/dados2', (req, res) => {
    const { year, month } = req.query; // Recebe os parâmetros de ano/mês via query string
    try {
      const filteredData = readAndFilterExcelFile('contabilidade2.xlsx', year, month);
      console.log(filteredData);    
      res.json(filteredData);
    } catch (error) {
        console.log(error);
      res.status(500).send('Erro ao ler o arquivo XLSX.');
    }
  });

// API 3 - Dashboard 3
app.get('/dados3', (req, res) => {
  try {
    const dados = readExcelFile('contabilidade3.xlsx');
    res.json(dados);
  } catch (error) {
    res.status(500).send('Erro ao ler o arquivo XLSX para Dashboard 3.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
