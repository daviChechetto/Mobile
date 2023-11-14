import React, { useState } from 'react';

import 'react-native-gesture-handler';

import { StyleSheet, Text, TouchableOpacity, Image, View, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { auth, signInWithEmailAndPassword } from '../fb';

// usando o expo.fyi para os icones
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState(true);
  const navigation = useNavigation();

  const signIn = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      if (user) {
        // Login bem-sucedido
        navigation.navigate('Home');
      } else {
        // Credenciais inválidas
        console.log('Credenciais inválidas'); // Define a mensagem de erro
      }
    } catch (error) {
      console.log('Erro ao fazer login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient style={styles.container} colors={['#AFFFA8', '#4E724B']}>
      <Image style={styles.logo} source={require('../assets/ReaLogo.png')} />

      <View style={styles.view}>
        <View style={styles.senha}>
          <Ionicons name="person" style={styles.icon} size={24} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            underlineColorAndroid="transparent"
            onChangeText={setEmail}
            value={email}
          />
        </View>

        <View style={styles.senha}>
          <FontAwesome5 name="key" style={styles.icon} size={24} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={estado}
            underlineColorAndroid="transparent"
            onChangeText={setSenha}
            value={senha}
          />
          <TouchableOpacity style={styles.btnEye} onPress={() => setEstado(!estado)}>
            {estado ? (
              <Ionicons name="eye-off" style={styles.eye} size={24} />
            ) : (
              <Ionicons name="eye" style={styles.eye} size={24} />
            )}
          </TouchableOpacity>
          
        </View>
      </View>

      <TouchableOpacity style={[styles.btn, { marginTop: 80, paddingHorizontal: 64 }]} onPress={signIn}>
        <Text style={styles.txtBtn}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Cadastrar')}>
        <Text style={styles.txtBtn}>Cadastrar</Text>
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
  logo: {
    height: 165,
    width: 150,
    marginBottom: 100,
  },
  view: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    right: 12,
  },
  icon: {
    color: '#292D32',
    marginBottom: 35,
  },
  input: {
    width: 200,
    marginTop: 2,
    height: 30,
    backgroundColor: '#E4E4E4',
    borderWidth: 0,
    borderRadius: 13,
    paddingLeft: 10,
  },
  btn: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#2C3229',
    paddingHorizontal: 50,
    paddingVertical: 5,
  },
  txtBtn: {
    color: '#fff',
  },
  eye: {
    color: '#292D32',
  },
  senha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnEye: {
    marginLeft: -28,
  },
});
