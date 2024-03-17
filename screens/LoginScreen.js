import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = async () => {
    navigation.navigate('Testpage');
    
      // try {
      //     const response = await fetch(`http://10.87.13.193:8080/api/v1/user/email/password/login`, {
      //         method: 'POST',
      //         headers: {
      //             'Content-Type': 'application/json',
      //         },
      //         body: JSON.stringify({
      //             email: email,
      //             password: password,
      //         }),
      //     });
  
      //     console.log('Response:', response); // Log the full response
      //     console.log('Status Code:', response.status); // Log the status code
  
      //     if (response.ok) {
      //         // Login successful
      //         const data = await response.json(); // assuming the server returns a JSON response
      //         console.log('Login successful:', data);
      //         navigation.navigate('NextPage'); // Navigate to the next page after successful login
      //     } else {
      //         // Handle login error
      //         const errorData = await response.text(); // You can also use response.json() if your server sends JSON
      //         console.error('Login failed:', errorData);
      //     }
      // } catch (error) {
      //     console.error('Network error:', error);
      // }

  
    // IMPLEMENTING BACKEND API CALL...STILL TRYNA DO IT 
};


  
  const handleForgotPasswordPress = () => {
    // TODO: Navigate to your Forgot Password Screen
    console.log('Forgot Password pressed');
  };

  const handleSignUpPress = () => {
    // TODO: Navigate to your Sign Up Screen
    console.log('Sign pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPasswordPress}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUpPress}>
        <Text style={styles.signUp}>Don’t have an account? Sign up <Text style={styles.signUpHere}>HERE</Text></Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    height: 100, // Adjust based on your logo's aspect ratio
    resizeMode: 'contain', // or 'cover', depending on your preference
  },
  inputContainer: {
    width: '80%',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
  },
  forgotPassword: {
    color: 'blue',
    marginVertical: 10,
  },
  signUp: {
    textAlign: 'center',
    marginTop: 10,
    },
    signUpHere: {
    textDecorationLine: 'underline',
    }
    });
    
    export default LoginScreen;
    
    
