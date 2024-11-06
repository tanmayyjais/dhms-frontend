import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function ComplaintsScreen() {
  const [department, setDepartment] = useState('');
  const [description, setDescription] = useState('');
  const student = useSelector((state: RootState) => state.auth.user);

  const handleComplaintSubmit = async () => {
    if (!department || !description) {
      Alert.alert('Error', 'Please select a department and enter a description.');
      return;
    }

    if (!student) {
      Alert.alert('Error', 'User information is missing. Please log in again.');
      return;
    }

    if (!student.hostelDetails) {
      Alert.alert('Error', 'Hostel details are missing. Please update your profile with room information.');
      return;
    }

    try {
      const complaintData = {
        department,
        description,
        student: {
          name: student.name,
          roomNumber: student.hostelDetails?.roomNumber || 'N/A',
          block: student.hostelDetails?.block || 'N/A',
          phoneNumber: student.phonenumber,
          email: student.email,
        },
      };

      await axios.post('http://192.168.1.102:5000/api/complaints', complaintData);
      Alert.alert('Success', 'Complaint submitted successfully');
    } catch (error) {
      console.error('Complaint submission failed:', error);
      Alert.alert('Error', 'Complaint submission failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File a Complaint</Text>

      <Text style={styles.label}>Select Department:</Text>
      <Picker
        selectedValue={department}
        style={styles.dropdown}
        onValueChange={(itemValue) => setDepartment(itemValue)}
      >
        <Picker.Item label="Select a department" value="" />
        <Picker.Item label="Electrical" value="electrical" />
        <Picker.Item label="Water" value="water" />
        <Picker.Item label="Furniture" value="furniture" />
        <Picker.Item label="Cleaning" value="cleaning" />
      </Picker>

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe your issue..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleComplaintSubmit}>
        <Text style={styles.submitButtonText}>Submit Complaint</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  dropdown: {
    height: 50,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});