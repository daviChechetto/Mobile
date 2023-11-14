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
import {database} from '../fb'

// usando o expo.fyi para os icones
import { AntDesign } from '@expo/vector-icons';


export default function Ganhos() {

  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

    useEffect(() => {
      const collectionRef = collection(database, 'Real');
      const q = query(collectionRef, orderBy('createAt', 'desc'))
      

      const unsuscribe = onSnapshot(q, QuerySnapshot => {
        setProducts (
          QuerySnapshot.docs.map(doc => ({ 
            id: doc.id,
            name: doc.data().name,
            valor: doc.data().valor,
            isVendido: doc.data().isVendido,
            createAt: doc.data().createAt,
          })
        )
        )})

      return unsuscribe;
      
    }, [])

  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [ newItem, setNewItem] = React.useState({
    nome: '',
    valor:0 ,
    createAt: new Date(),
})

  const onSend = async() => {
    await addDoc(collection(database,'Ganhos'), newItem)
  }

  return (
    <LinearGradient
    style={styles.container}
    colors={['#AFFFA8', '#4E724B']}>

    <Text style={styles.txt}>Receitas</Text>
    <Text>   </Text>
    {products.map(product=><Product key={product.id} {...product}/> )}
    <View style={styles.row}>
      <Text style={styles.txtx}>Add</Text>
      <Text>  </Text>
    
    <Text>Nome</Text>
    <TextInput
      style={styles.input}
      placeholder="Nome do gasto Ex: Padaria"
      underlineColorAndroid="transparent"
      onChangeText={(text) => setNewItem({...newItem, nome:text})}
    />

    <Text>Valor</Text>
    <TextInput
      style={styles.input}
      placeholder="R$"
      underlineColorAndroid="transparent"
      onChangeText={(number) => setNewItem({...newItem, valor:number})}
    />

      <TouchableOpacity  style={[styles.btn, {marginTop: 20, backgroundColor:"#fff"}]} onPress={onSend} >
        <Text style={[styles.txtBtn, { color:"#000" }]} >Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={[styles.btn, {marginTop: "60%"}]} onPress={() => navigation.navigate('Home')} >
        <Text style={styles.txtBtn}>Despesas</Text>
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
  input:{
    backgroundColor:"#fff",
    borderRadius:10,
    paddingHorizontal:10,
  },
  icon:{
    color:"#292D32",
    right:100,
  },
  gradient: {
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
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