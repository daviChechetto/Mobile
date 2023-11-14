import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, auth } from 'firebase/firestore';
import { database } from '../fb'; 

export default function Historico() {
  const [valor, setValor] = useState([]); // Estado para armazenar os dados de despesas
  const [valor1, setValor1] = useState([]); // Estado para armazenar os dados de ganhos
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, 'Gastos'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setValor(data); // Atualiza o estado com os dados buscados do Firestore
    } catch (error) {
      console.error('Erro ao buscar dados: ', error);
    }
    try {
      const querySnapshot = await getDocs(collection(database, 'Ganhos'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setValor1(data); // Atualiza o estado com os dados buscados do Firestore
    } catch (error) {
      console.error('Erro ao buscar dados: ', error);
    }
  };

  useEffect(() => {
    fetchData(); // Chama a função fetchData quando o componente é montado
  }, []);

  const handleRefresh = () => {
    fetchData(); // Chama a função fetchData para buscar os dados atualizados
  };

  return (
    <LinearGradient style={styles.container} colors={['#AFFFA8', '#4E724B']}>

      <View style={styles.bigbox}>
        <Text style={styles.title}>Despesas</Text>
        <View style={styles.box}>
          {valor.map((item, index) => (
            <Text style={styles.itens} key={index}>{item.nome} - R$ {item.valor}  </Text>
          ))}
        </View>
      </View>

      <View style={styles.bigbox}>
        <Text style={styles.title}>Ganhos</Text>
        <View style={styles.box}>
          {valor1.map((item, index) => (
            <Text style={styles.itens} key={index}>{item.nome} - R$ {item.valor}</Text>
          ))}
        </View></View>
      <TouchableOpacity style={[styles.btn]} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Atualizar</Text>
      
      </TouchableOpacity>

      

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eefafa',
    alignItems: 'center',
    justifyContent: 'center',
  },

  box: {
    backgroundColor:"#EBFCEB",
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    width:"100%"
  },
  bigbox: {
    width:"70%"
  },
  title: {
    fontSize:20,
    marginLeft:"5%"
  },
  itens: {
    marginBottom:10
  },
  btn: {
    borderRadius: 10,
    backgroundColor: "#2C3229", 
    paddingHorizontal: 4,
    paddingVertical:5,
  },
  refreshButtonText: {
    color:"#fff"
  }
});
