import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ChangeSaldoScreen from '../screens/ChangeSaldoScreen';
import MInfoScreen from '../screens/MInfoScreen/MInfoScreen';
import LinearGradient from 'react-native-linear-gradient';
import HomeScreenV2 from '../screens/HomeScreenV2';


const DisabledScreen = () => <ScreenComponent title="Disabled" />;

const ScreenComponent = ({ title }) => (
  <View style={styles.screen}>
    <Text style={{ fontSize: 20 }}>{title}</Text>
  </View>
);

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: [{
          height: 60,
          backgroundColor:'#FFF',
          borderTopRightRadius:20,
          borderTopLeftRadius:20,
        }]
      }}>
      <Tab.Screen
        name="Beranda"
        component={HomeScreenV2}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                require('../assets/livin/beranda.png')
              }
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Riwayat"
        component={DisabledScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: { display: 'none' },
        }}
      />
      <Tab.Screen
        name="Produk Anda"
        component={DisabledScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/livin/produkanda.png')
                  : require('../assets/livin/produkanda.png')
              }
              style={styles.icon}
            />
            
          ),
          tabBarButton: props => (
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={styles.disabledTab}>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
        }}
      />
      <Tab.Screen
        name="QRIS"
        component={DisabledScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: _ => (
            <View
              style={{
                // backgroundColor: 'white',
                // borderRadius: 20,
                // marginBottom: 12,
                // marginTop:50
                marginBottom: 10

              }}>
              <Image
                source={require('../assets/livin/qrtengah.png')}
                style={{
                  height: 50,
                  width: 50,
                  // marginBottom:10,
                  resizeMode: 'contain',
                }}
              />
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../assets/livin/qristext.png')}
                  style={{
                    height: 35,
                    width: 35,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>
          ),
          tabBarButton: props => (
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={styles.disabledTab}>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
        }}
      />

      {/* Notifikasi Disabled */}
      <Tab.Screen
        name="Sukha"
        component={DisabledScreen}
        options={{
          headerShown: false,
          tabBarIcon: _ => (
            <Image
              source={require('../assets/livin/sukha.png')}
              style={styles.icon}
            />
          ),
          tabBarButton: props => (
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={styles.disabledTab}>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
        }}
      />
      <Tab.Screen
        name="Loyalty"
        component={DisabledScreen}
        options={{
          headerShown: false,
          tabBarIcon: _ => (
            <Image
              source={require('../assets/livin/loyality.png')}
              style={styles.icon}
            />
          ),
          tabBarButton: props => (
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={styles.disabledTab}>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
        }}
      />
    </Tab.Navigator>
    // </ImageBackground>
  );
}

// Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  tabBarStyle: {
    height: 60,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // backgroundColor: 'transparent',
    position: 'relative',

  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    color: '#FFFFFF',
  },
  disabledTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBackground: {
    flex: 1,
  },
  header: {
    height: 100,
  },
});
