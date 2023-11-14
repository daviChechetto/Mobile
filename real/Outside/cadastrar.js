import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, database, getAuth, auth } from '../fb';

export default function Cadastrar({navigator}) {
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [nCompleto, setNCompleto] = useState('');
  const [salario, setSalario] = useState('');
  const navigation = useNavigation();

  const cadastrarUsuario = async () => {
    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      if (user) {
        // Salva os dados no Firestore Database e obtém a referência do documento
        const docRef = await addDoc(collection(database, 'Usuarios'), {
          nome: nCompleto,
          email: user.email,
          senha: senha,
          salario: salario,
          createdAt: new Date(),
        });


        // Redireciona para a tela de login ou realiza outras ações necessárias
        navigation.navigate('Login');
      } else {
        console.log('Erro ao cadastrar o usuário');
      }
    } catch (error) {
      console.log('Erro ao cadastrar o usuário:', error);
    }
  };

  return (
    <LinearGradient style={styles.container} colors={['#AFFFA8', '#4E724B']}>
      <TouchableOpacity style={styles.iconBack} onPress={() => navigation.navigate('Login')}>
        <AntDesign name="left" color="#292D32" size={40}/>
      </TouchableOpacity>

      <AntDesign name="adduser" size={120} style={styles.logo} />

      <View style={styles.inputs}>
        <Ionicons name="person" style={styles.icon} size={24}/>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          underlineColorAndroid="transparent"
          onChangeText={setNCompleto}
        />
      </View>
        
      <View style={styles.inputs}>
        <FontAwesome5 name="key" style={styles.icon} size={24}/>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={setSenha}
        />
      </View>
        
      <View style={styles.inputs}>
        <Octicons name="key" style={styles.icon} size={24} />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
        />
      </View>
        
      <View style={styles.inputs}>
        <MaterialCommunityIcons name="email-outline" style={styles.icon} size={24}/>
        <TextInput
          style={styles.input}
          placeholder="Email"
          KeyboardType="email-adrees"
          underlineColorAndroid="transparent"
          onChangeText={setEmail}
        />
      </View>
        
      <View style={styles.inputs}>
        <FontAwesome5 name="money-bill-wave" style={styles.icon} size={24} />
        <TextInput
          style={styles.input}
          placeholder="Salário Mínimo"
          underlineColorAndroid="transparent"
          onChangeText={setSalario}
        />
      </View>
        
      <TouchableOpacity style={styles.btn} onPress={cadastrarUsuario}>
        <Text style={styles.txtBtn}>Cadastrar-se</Text>
      </TouchableOpacity>
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
  logo: {
    color:"#292D32",
    marginBottom:50,
  },
  icon:{
    color:"#292D32",
    marginRight:10
  },
  iconBack:{
    width:"90%",
    flexDirection:"row",
    marginLeft:"10%"
  },
  gradient: {
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width:200,
    marginTop: 2,
    marginBottom:4,
    height: 30,
    backgroundColor: "#E4E4E4",
    borderWidth: 0,
    borderRadius: 13,
    paddingLeft:10,
  },
  btn: {
    marginTop: 50,
    borderRadius: 10,
    backgroundColor: "#2C3229",
    paddingHorizontal: 50,
    paddingVertical:5,
  },
  txtBtn: {
    color:"#fff"
  },
  inputs: {
    flexDirection:"row",
    alignItems:"center",
    right:17,
    marginBottom:24
  },
})