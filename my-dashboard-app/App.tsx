import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import Dashboard1 from './Dashboard1';
import Dashboard2 from './Dashboard2';
import Dashboard3 from './Dashboard3';
import Dashboard4 from './Dashboard4';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Agnos Gestão Empresarial' }} 
        />
        <Stack.Screen 
          name="Dashboard1" 
          component={Dashboard1} 
          options={{ title: 'Dashboard : Comparação Anual' }}
        />
        <Stack.Screen 
          name="Dashboard2" 
          component={Dashboard2} 
          options={{ title: 'Dashboard : Evoluçao dos Valores' }}
        />
        <Stack.Screen 
          name="Dashboard3" 
          component={Dashboard3} 
          options={{ title: 'Dashboard : Crescimento Percentual' }}
        />
        <Stack.Screen 
          name="Dashboard4" 
          component={Dashboard4}  
          options={{ title: 'Dashboard: Resumido' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
