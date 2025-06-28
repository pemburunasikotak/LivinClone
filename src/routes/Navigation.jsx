import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FrontScreen from '../screens/FrontScreen';
import {useAuth, useLock} from '../contexts/AuthContext';
import {ActivityIndicator, View} from 'react-native';
import BottomTabs from '../components/BottomTabs';
import ChangeCodeScreen from '../screens/ChangeCodeScreen';
import ChangeSaldoScreen from '../screens/ChangeSaldoScreen';
import ChangeUserScreen from '../screens/ChangeUserScreen/ChangeUserScreen';
import SplashScreen from '../screens/SplashScreen';
import TabunganNowScreen from '../screens/TabunganNowScreen';
import TabunganV2 from '../screens/TabunganV2';
import MutasiModal from '../screens/ModalMutasiSaldo';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {isLogin, loading} = useAuth();
  const {isLocked} = useLock();

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0066AE" />
      </View>
    );
  }

  return (
    <NavigationContainer style={{backgroundColor:'#FFF'}}>
      <Stack.Navigator
        // initialRouteName={isLocked ? 'Front' : isLogin ? 'Home' : 'Front'}>
        initialRouteName={'Splash'}>
        {/* initialRouteName={'Mutasi'}> */}
        <Stack.Screen
          name="Front"
          component={FrontScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tabungan"
          component={TabunganV2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tabungan Now"
          component={TabunganV2}
          // component={TabunganNowScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeTabs"
          component={BottomTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Change User"
          component={ChangeUserScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Change Code"
          component={ChangeCodeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Change Saldo"
          component={ChangeSaldoScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Mutasi"
          component={MutasiModal}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
