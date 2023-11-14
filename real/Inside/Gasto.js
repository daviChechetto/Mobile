import React, { useState } from 'react';
import { useEffect } from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Text, Button, TouchableOpacity, Image, View, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { addDoc, collection } from 'firebase/firestore';
import Product from '../Components/Produto';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { database } from '../fb'

// Usando o expo.fyi para os ícones
import { AntDesign } from '@expo/vector-icons';

export default function Gasto() {
  const [products, setProducts] = useState([]); // Estado para armazenar os produtos
  const navigation = useNavigation();

  useEffect(() => {
    // Função executada quando o componente é montado
    const collectionRef = collection(database, 'Real');
    const q = query(collectionRef, orderBy('createAt', 'desc'));

    // Configura um snapshot para ouvir as mudanças na coleção 'Real'
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // Atualiza o estado dos produtos com os dados do Firestore
      setProducts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          valor: doc.data().valor,
          isVendido: doc.data().isVendido,
          createAt: doc.data().createAt,
        }))
      );
    });

    // Função de retorno para cancelar o snapshot quando o componente é desmontado
    return unsubscribe;
  }, []); 

  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [newItem, setNewItem] = useState({
    nome: '',
    valor: 0,
    createAt: new Date(),
  });

  const onSend = async () => {
    // Adiciona um novo documento à coleção 'Gastos' no Firestore
    await addDoc(collection(database, 'Gastos'), newItem);
  };

  return (
      <LinearGradient
        style={styles.container}
        colors={['#AFFFA8', '#4E724B']}>

        <Text style={styles.txt}>Despesas</Text>
        <Text>   </Text>
        {products.map(product=><Product key={product.id} {...product}/> )}

        <View style={styles.row}>
        <Text marginTop="40%">Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do gasto Ex: Padaria"
          underlineColorAndroid="transparent"
          onChangeText={(text) => setNewItem({...newItem, nome:text})}
        />

        <Text marginTop="10%">Valor</Text>
        <TextInput
          style={styles.input}
          placeholder="R$"
          underlineColorAndroid="transparent"
          onChangeText={(number) => setNewItem({...newItem, valor:number})}
        />

          <TouchableOpacity  style={[styles.btn, {marginTop: 20, backgroundColor:"#fff"}]} onPress={onSend} >
            <Text style={[styles.txtBtn, { color:"#000" }]} >Registrar</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={[styles.btn, {marginTop: "60%"}]} onPress={() => navigation.navigate('Ganhos')} >
            <Text style={styles.txtBtn}>Ganhos</Text>
          </TouchableOpacity>
      </View>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eefafa",
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    backgroundColor:"#CBF3C8",
    padding: 20,
    borderRadius: 10,
    height:"70%",
  },
  icon:{
    color:"#292D32",
    right:100,
  },

  input:{
    backgroundColor:"#fff",
    borderRadius:10,
    paddingHorizontal:10,
  },
  txt:{
    fontSize: 25,
    marginRight:"35%",
  },
  btn: {
    marginBottom: 10,
    marginLeft: 180,
    borderRadius: 10,
    backgroundColor: "#2C3229",
    paddingHorizontal: 10,
    paddingVertical:5,
    alignItems:"center",
  },
  txtBtn: {
    color:"#fff"
  }
});