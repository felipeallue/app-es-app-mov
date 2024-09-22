import React, { useState, useEffect } from 'react';
import { View, Dimensions, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { PieChart } from 'react-native-chart-kit';

export default function DashboardPizza() {
  const [chartData, setChartData] = useState([]);

  // Função para buscar os dados da API
  const fetchDataFromAPI = async () => {
    try {
      const response = await axios.get('http://locahost:3000/dados'); // Substitua pelo IP do seu servidor
      const jsonData = response.data;

      // Preparar os dados para o gráfico de pizza
      const data = [
        { name: '2021', value: jsonData.reduce((acc, item) => acc + parseFloat(item['Valor 2021'] || 0), 0), color: '#FF6384' },
        { name: '2022', value: jsonData.reduce((acc, item) => acc + parseFloat(item['Valor 2022'] || 0), 0), color: '#36A2EB' },
        { name: '2024', value: jsonData.reduce((acc, item) => acc + parseFloat(item['Valor 2024'] || 0), 0), color: '#FFCE56' },
        { name: '2025', value: jsonData.reduce((acc, item) => acc + parseFloat(item['Valor 2025'] || 0), 0), color: '#4BC0C0' },
        { name: '2026', value: jsonData.reduce((acc, item) => acc + parseFloat(item['Valor 2026'] || 0), 0), color: '#9966FF' }
      ];

      setChartData(data);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard (Comparação Anual)</Text>
      <Button title="Carregar Dados" onPress={fetchDataFromAPI} />

      {/* Gráfico de Pizza */}
      {chartData.length > 0 && (
        <PieChart
          data={chartData.map(item => ({
            name: item.name,
            population: item.value,
            color: item.color,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          }))}
          width={Dimensions.get('window').width - 30}
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
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
