import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getFirestore(firebaseApp);

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [salario, setSalário] = useState("");
  const [senha, setSenha] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    // Função assíncrona para buscar o documento no Firestore
    async function fetchDocumento() {
      try {
        const docRef = doc(database, 'Usuarios', 'OKT0qt8rV4F6cIHYiE3Z');
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();

          // Atualize os estados com os valores do documento
          setNome(data.nome);
          setSenha(data.senha);
          setEmail(data.email);
          setSalário(data.salario);
        } else {
          console.log('Documento não encontrado');
        }
      } catch (error) {
        console.log('Erro ao buscar o documento:', error);
      }
    }

    fetchDocumento();
  }, []);

  return (
  <LinearGradient
    style={styles.container}
    colors={['#AFFFA8', '#4E724B']}>
      
    <View style={styles.top}>
      <FontAwesome name="user-circle-o" style={styles.fotoPerfil} size={100}  />
      <View>
        <Text style={styles.txtNome}>{nome}</Text>
        <Text style={styles.txtValor}>Saldo: R$ {salario}</Text>
      </View>
    </View>
    
    <ScrollView style={styles.painel}>
      
      <Text style={styles.txt} >Email: </Text>
      <Text style={styles.txtsub} >{email}</Text>

      <Text style={styles.txt} >Nome Completo: </Text>
      <Text style={styles.txtsub} >{nome}</Text>

      <Text style={styles.txt} >Salário: </Text>
      <Text style={styles.txtsub} marginBottom={"50%"}>R$ {salario}</Text>

      <View style={styles.exit}>
        <Text style={styles.txt} >Versão:</Text>
        <Text style={styles.txtsub} >1.0.0</Text>

        <TouchableOpacity   onPress={() => navigation.navigate('Login')} >
        <Text style={styles.txt}>Log Out</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    flexDirection:"row",
    marginBottom:30
  },
  fotoPerfil:{
    color:"#292D32",
    marginLeft:"5%",
    marginTop:50,
  },
  txtNome: {
    color:"#292D32",
    fontSize:20,
    marginTop:70,
    marginLeft:10
  },
  txtValor: {
    color:"#292D32",
    fontSize:15,
    marginLeft:10
  },
  txt: {
    color:"#E4E4E4",
    fontSize:15
  },
  txtsub: {
    color:"#C3C3C3",
    fontSize:12,
    marginBottom:10
  },
  painel: {
    width: 300,
    borderRadius: 20,
    padding: "5%",
    backgroundColor:"#2C3229",
    alignSelf:"center",
    marginBottom:50
  },
  exit: {
    marginTop:"45%"
  }
});