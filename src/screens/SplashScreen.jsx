import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Front'); // Ganti 'Home' dengan nama screen tujuan
    }, 3000); // Durasi splash screen dalam milidetik (3 detik)

    return () => clearTimeout(timer); // Membersihkan timer saat komponen tidak lagi digunakan
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/livin/splash.png')}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.viewConten}>
      </View>
      <View style={{}}>
        <Image
          style={styles.logoutIcon}
          resizeMode="contain"
          source={require('../assets/livin/logolps.png')}
        />
        <View>
          <Text style={styles.textBca}>
            PT Bank Mandiri (Persero) Tbk.berizin dan diawasi oleh Otoritas Jasa
            Keuangan (OJK) dan Bank Indonesia (BI), serta merupakan peserta
            penjaminan Lembaga Penjamin Simpanan (LPS). {"\n\n"}
            Copyright @ 2021 Bank Mandiri
          </Text>
        
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logoutIcon: {
    height: 80,
    width: 200,
    alignSelf: 'center',
  },
  textVersion: {
    textAlign: 'center',
    fontSize: 18,
    color: '#0066AE',
    fontWeight: '700',
    marginBottom: 10,
  },
  textBca: {
    textAlign: 'center',
    fontSize: 12,
    color: '#FFF',
    marginBottom: 60,
    paddingHorizontal: 30,
  },
  viewConten: {
    display: 'flex',
    flex: 1,
    // alignItems: 'flex-end',
    //  justifyContent: 'center',
    // backgroundColor:'#2a2a2a',
    height: 100,
    width: '100%',
  },
});

export default SplashScreen;
