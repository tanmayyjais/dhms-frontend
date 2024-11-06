import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { signup } from '../../redux/actions/authActions';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function SignupScreen({ navigation }) {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [block, setBlock] = useState('');
  const [idnumber, setIdNumber] = useState('');
  const [enrollmentnumber, setEnrollmentNumber] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phonenumber: '',
    password: '',
    roomNumber: '',
    block: '',
    idnumber: '',
    enrollmentnumber: ''
  });

  const validateFields = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      phonenumber: '',
      password: '',
      roomNumber: '',
      block: '',
      idnumber: '',
      enrollmentnumber: ''
    };

    if (!name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }

    if (!phonenumber || phonenumber.length < 10) {
      newErrors.phonenumber = 'Enter a valid phone number';
      valid = false;
    }

    if (!password || password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    if (!idnumber) {
      newErrors.idnumber = 'ID Number is required';
      valid = false;
    }

    if (!enrollmentnumber) {
      newErrors.enrollmentnumber = 'Enrollment Number is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async () => {
    if (!validateFields()) {
      Alert.alert('Error', 'Please fix the errors before submitting.');
      return;
    }
  
    try {
      const userData = {
        name,
        email,
        phonenumber: Number(phonenumber),
        hostelDetails: { roomNumber, block },
        idnumber: Number(idnumber),
        enrollmentnumber,
        role: 'student',
      };
  
      await dispatch(signup({ ...userData, password }));  // Add password only for the signup call
  
      Alert.alert('Success', 'Registration successful! Please log in.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Signup</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          placeholderTextColor="#666666"
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#666666"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phonenumber}
          onChangeText={(text) => setPhoneNumber(text)}
          placeholderTextColor="#666666"
          keyboardType="phone-pad"
        />
        {errors.phonenumber ? <Text style={styles.errorText}>{errors.phonenumber}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#666666"
          secureTextEntry
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Room Number"
          value={roomNumber}
          onChangeText={(text) => setRoomNumber(text)}
          placeholderTextColor="#666666"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Block"
          value={block}
          onChangeText={(text) => setBlock(text)}
          placeholderTextColor="#666666"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="ID Number"
          value={idnumber}
          onChangeText={(text) => setIdNumber(text)}
          placeholderTextColor="#666666"
          keyboardType="numeric"
        />
        {errors.idnumber ? <Text style={styles.errorText}>{errors.idnumber}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enrollment Number"
          value={enrollmentnumber}
          onChangeText={(text) => setEnrollmentNumber(text)}
          placeholderTextColor="#666666"
          keyboardType="numeric"
        />
        {errors.enrollmentnumber ? <Text style={styles.errorText}>{errors.enrollmentnumber}</Text> : null}
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <LinearGradient colors={['#439DFE', '#F687FF']} style={styles.submitGradient}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? <Text style={styles.loginTextBold}>Login</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    marginBottom: 24,
  },
  inputContainer: {
    width: width - 56,
    height: 50,
    backgroundColor: '#1D1D1D',
    borderRadius: 15,
    marginBottom: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    color: '#FF4C4C',
    fontSize: 14,
    marginTop: 5,
  },
  signupButton: {
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
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  loginText: {
    marginTop: 16,
    color: '#666666',
    fontSize: 16,
  },
  loginTextBold: {
    fontWeight: 'bold',
    color: '#439DFE',
  },
});
