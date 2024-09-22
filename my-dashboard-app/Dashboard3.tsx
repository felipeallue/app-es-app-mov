import React, { useState, useEffect } from 'react';
import { View, Dimensions, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';

export default function DashboardCrescimentoPercentual() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Função para calcular o crescimento percentual entre dois valores
  const calcularCrescimentoPercentual = (valorAtual, valorAnterior) => {
    if (valorAnterior === 0) return 0; // Evitar divisão por zero
    return ((valorAtual - valorAnterior) / valorAnterior) * 100;
  };

  // Função para buscar os dados da API
  const fetchDataFromAPI = async () => {
    try {
      const response = await axios.get('http://locahost:3000/dados'); // Substitua pelo IP do seu servidor
      const jsonData = response.data;

      // Preparar os dados para o gráfico de crescimento percentual
      const labels = ['2022', '2024', '2025', '2026'];
      
      // Extraímos os valores de 2021 como base de comparação
      const valor2021 = jsonData.reduce((acc, item) => acc + parseFloat(item['Valor 2021'] || 0), 0);
      const valor2022 = jsonData.reduce((acc, item) => acc + parseFloat(item['Valor 2022'] || 0), 0);
      const valor2024 = jsonData.reduce((acc, item) => acc + parseFloat(item['Valor 2024'] || 0), 0);
      const valor2025 = jsonData.reduce((acc, item) => acc + parseFloat(item['Valor 2025'] || 0), 0);
      const valor2026 = jsonData.reduce((acc, item) => acc + parseFloat(item['Valor 2026'] || 0), 0);

      // Calculando o crescimento percentual para cada ano
      const crescimentoPercentual = [
        calcularCrescimentoPercentual(valor2022, valor2021), // Crescimento de 2022 em relação a 2021
        calcularCrescimentoPercentual(valor2024, valor2022), // Crescimento de 2024 em relação a 2022
        calcularCrescimentoPercentual(valor2025, valor2024), // Crescimento de 2025 em relação a 2024
        calcularCrescimentoPercentual(valor2026, valor2025), // Crescimento de 2026 em relação a 2025
      ];

      // Preparando os dados para o gráfico
      setChartData({
        labels,
        datasets: [
          {
            data: crescimentoPercentual,
            color: () => `rgba(75, 192, 192, 1)`, // Cor da linha
            strokeWidth: 2, // Espessura da linha
          },
        ],
      });
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard de Crescimento Percentual</Text>
      <Button title="Carregar Dados" onPress={fetchDataFromAPI} />

      {/* Gráfico de Crescimento Percentual */}
      {chartData.labels.length > 0 && (
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 30}
          height={300}
          yAxisLabel="%"
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            strokeWidth: 2, // Espessura da linha
          }}
          bezier // Curvas suaves no gráfico
          verticalLabelRotation={30} // Rotação dos rótulos do eixo X
          fromZero={true} // Iniciar o eixo Y do zero
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
