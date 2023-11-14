import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import Ganhos from './Inside/Ganhos';
import Gasto from './Inside/Gasto';
import Perfil from './Inside/Perfil';
import Historico from './Inside/Historico';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Home() {

  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="Gastos"
      screenOptions={{
        tabBarActiveTintColor: '#E4E4E4',
        tabBarStyle: { backgroundColor: '#2C3229', borderTopWidth: 0 /* Removendo a borda superior */ },
      }}>

      <Tab.Screen
        name="Historico"
        component={Historico}
        options={{
          headerShown: false,
          tabBarLabel: 'Histórico',
          tabBarIcon: () => (
            <MaterialIcons name="history" size={28} color="#E4E4E4" />
          ),
          /* tabBarBadge: 3, */     // Isso é para mostrar a quantidade de notificações no ícone
        }} />

      <Tab.Screen
        name="Gastos"
        component={Gasto}
        options={{
          headerShown: false,
          tabBarLabel: 'Início',
          tabBarIcon: () => (
            <AntDesign name="home" size={24} color="#E4E4E4" />
          ),
        }} />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerShown: false,
          tabBarLabel: 'Perfil',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" color={"#E4E4E4"} size={28} />
          ),
        }} />
    </Tab.Navigator>
  );
}
