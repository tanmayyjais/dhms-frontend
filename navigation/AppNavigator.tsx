import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import LoginScreen from '../components/Auth/LoginScreen';
import SignupScreen from '../components/Auth/SignupScreen';
import ComplaintsScreen from '../components/Complaints/ComplaintScreen';
import DashboardScreen from '../components/Dashboard/DashboardScreen';
import { RootState } from '../redux/store';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
  ComplaintsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Stack.Navigator initialRouteName="Login">
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="ComplaintsScreen" component={ComplaintsScreen} />
        </>
    </Stack.Navigator>
  );
}
