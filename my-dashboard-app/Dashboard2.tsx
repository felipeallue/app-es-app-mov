import React, { useState, useEffect } from 'react';
import { View, Dimensions, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';

export default function DashboardLinhas() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Função para buscar os dados da API
  const fetchDataFromAPI = async () => {
    try {
      const response = await axios.get('http://locahost:3000/dados'); // Substitua pelo IP do seu servidor
      const jsonData = response.data;

      // Preparar os dados para o gráfico de linha
      const labels = ['2021', '2022', '2024', '2025', '2026'];
      const evolucao = [
        jsonData.reduce((acc, item) => acc + parseFloat(item['Valor 2021'] || 0), 0),
        jsonData.reduce((acc, item) => acc + parseFloat(item['Valor 2022'] || 0), 0),
        jsonData.reduce((acc, item) => acc + parseFloat(item['Valor 2024'] || 0), 0),
        jsonData.reduce((acc, item) => acc + parseFloat(item['Valor 2025'] || 0), 0),
        jsonData.reduce((acc, item) => acc + parseFloat(item['Valor 2026'] || 0), 0)
      ];

      setChartData({
        labels,
        datasets: [
          {
            data: evolucao,
            color: () => `rgba(255, 206, 86, 1)`,
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
      <Text style={styles.title}>Dashboard (Evolução dos Valores)</Text>
      <Button title="Carregar Dados" onPress={fetchDataFromAPI} />

      {/* Gráfico de Linhas */}
      {chartData.labels.length > 0 && (
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 30}
          height={300}
          yAxisLabel="R$"
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2, // Espessura da linha
          }}
          bezier
          verticalLabelRotation={30}
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
