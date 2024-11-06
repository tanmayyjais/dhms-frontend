import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { login } from '../../redux/actions/authActions';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const validateFields = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }

    if (!password || password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateFields()) {
      Alert.alert('Error', 'Please fix the errors before submitting.');
      return;
    }

    try {
      await dispatch(login(email, password));
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to College Hostel</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
          }}
          onBlur={() => {
            if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
              setErrors((prevErrors) => ({ ...prevErrors, email: 'Enter a valid email address' }));
            }
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#666"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
          }}
          onBlur={() => {
            if (!password || password.length < 8) {
              setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 8 characters' }));
            }
          }}
          secureTextEntry
          placeholderTextColor="#666"
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <LinearGradient colors={['#439DFE', '#F687FF']} style={styles.submitGradient}>
          <Text style={styles.loginButtonText}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Don't have an account? <Text style={styles.signupTextBold}>Sign Up</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    width: width - 56,
    backgroundColor: '#1D1D1D',
    borderRadius: 15,
    marginBottom: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    color: '#FFF',
    fontSize: 16,
  },
  errorText: {
    color: '#FF4C4C',
    fontSize: 14,
    marginTop: 5,
  },
  loginButton: {
    width: width - 56,
    height: 53,
    marginTop: 20,
  },
  submitGradient: {
    flex: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  signupText: {
    marginTop: 16,
    color: '#666',
    fontSize: 16,
  },
  signupTextBold: {
    fontWeight: 'bold',
    color: '#439DFE',
  },
});
