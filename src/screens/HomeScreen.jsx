import {
  View,
  Text,
  StatusBar,
  useColorScheme,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Modal,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {useIndicator} from '../contexts/IndicatorContext';
import SharpCornerRoundedSideBox from '../components/SharpCornerRoundedSideBox';
import SharpCornerRoundedSideBoxScroll from '../components/SharpCornerRoundedSideBoxScroll';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';

export const showToast = () => {
  Toast.show(
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image 
              source={require('../assets/livin/checklist.png')} // Ganti dengan URL atau require() lokal
              style={{ width: 20, height: 20, marginRight: 10 }}
          />
          <Text style={{ color: 'white' }}>Nomor rekening berhasil disalin.</Text>
      </View>,
      {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP, // Menampilkan di atas
          shadow: true,
          animation: true,
          hideOnPress: true,
          backgroundColor: 'black', // Bisa diganti sesuai desain
      }
  );
};


const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const navigation = useNavigation();

  const {logout, userName, formatSaldo, bcaId, noRekening, saldo} = useAuth();

  const {color, changeToGreen} = useIndicator();

  const [showModal, setShowModal] = useState(false);

  const formatDate = () => {
    const now = new Date();
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return now.toLocaleDateString('id-ID', options); // Format Indonesia
  };

  const handleLogout = () => {
    setShowModal(false);
    logout();
    navigation.reset({
      index: 0,
      routes: [{name: 'Front'}],
    });
  };

  const [issaldoVisible, setSaldoVisible] = useState(false);

  const togglesaldoVisibility = () => {
    setSaldoVisible(!issaldoVisible);
  };

  const [isUserVisible, setisUserVisible] = useState(false);

  const toggleUserVisibility = () => {
    setisUserVisible(!isUserVisible);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      changeToGreen();
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const maskBcaId = bcaId => {
    if (bcaId.length <= 3) return bcaId; // Jika string terlalu pendek, tidak perlu masking
    const firstTwo = bcaId.slice(0, 2); // Ambil 2 karakter pertama
    const lastOne = bcaId.slice(-1); // Ambil 1 karakter terakhir
    const maskedMiddle = '*'.repeat(bcaId.length - 3); // Bintang di tengah
    return `${firstTwo}${maskedMiddle}${lastOne}`;
  };

  const maskSaldo = saldo => {
    // if (saldo.length <= 3) return saldo; // Jika string terlalu pendek, tidak perlu masking
    // const firstTwo = saldo.slice(0, 3); // Ambil 2 karakter pertama
    const maskedMiddle = '*'.repeat(saldo.length); // Bintang di tengah
    return `${maskedMiddle}`;
  };

  const maskRekening = saldo => {
    const numberStr = saldo.toString(); // Ubah angka menjadi string
    const formattedNumber = numberStr.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '$1 - $2 - $3',
    );
    return formattedNumber;
  };

  const changeSaldo = saldo => {
    const newSaldo = saldo.toString().replace(/\./g, ',');
    return `${newSaldo}.00`;
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: '#33A1FE'}}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="#33A1FE"
        />
        <View style={styles.headerContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require('../assets/livin/logolivinputih.png')}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 25,
              // marginTop: 15,
            }}>
            <TouchableOpacity>
              <Image
                style={styles.logoutIcon}
                source={require('../assets/livin/notifsurat.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.logoutIcon}
                source={require('../assets/livin/seting.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log('cek', showModal);
                setShowModal(true);
              }}>
              <Image
                style={styles.logoutIcon}
                source={require('../assets/livin/keluar.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView 
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor:"#33A1FE"
          }}
        >
          <View style={styles.headerContainer}>
            <Image
              style={{width: 7, height: 40}}
              source={require('../assets/livin/pentung.png')}
            />
            <View>
              <Text style={{fontSize: 18, color: '#C1E8F9', fontWeight: 'bold'}}>
                Raih Keterangan Ramadan
              </Text>
              <Text style={{fontSize: 14, color: '#C1E8F9'}}>
                Bersama FOMO Ramadan 2025
              </Text>
            </View>
            <View>
              <Image
                style={{width: 100, height: 40}}
                source={require('../assets/livin/fomo.png')}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#FFF',
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              flex: 1,
              marginTop: 50,
            }}>
            <View style={{...styles.card, marginTop: -50}}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <View style={styles.topSection}>
                    <View
                      style={{
                        backgroundColor: '#F6F6F6',
                        padding: 10,
                        borderRadius: 50,
                      }}>
                      <Text>PR</Text>
                    </View>
                    <View style={{flex: 1, marginHorizontal: 10}}>
                      <Text style={{fontSize: 14, fontWeight: '600'}}>
                        Hi, {userName}
                      </Text>
                      <View
                        style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                        <Image
                          style={styles.logoutIcon}
                          source={require('../assets/livin/member.png')}
                        />
                        <View style={{width: 100, justifyContent: 'center'}}>
                          <Text style={{fontSize: 12}}>Member Explorer</Text>
                        </View>
                        <View style={{justifyContent: 'center'}}>
                          <Image
                            style={{height: 11, width: 11}}
                            source={require('../assets/livin/detail.png')}
                          />
                        </View>
                      </View>
                    </View>
                    <View>
                      <TouchableOpacity>
                        <Image
                          style={{height: 15, width: 60}}
                          source={require('../assets/livin/livinpoint.png')}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: 5,
                        }}>
                        <Image
                          style={styles.logoutIcon}
                          source={require('../assets/livin/coin.png')}
                        />
                        <Text style={{fontSize: 12, alignSelf: 'center'}}>
                          10
                        </Text>
                        <TouchableOpacity
                          style={{marginLeft: 5, justifyContent: 'center'}}>
                          <Image
                            style={{height: 11, width: 11}}
                            source={require('../assets/livin/detail.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Tabungan Now')}
                    style={{
                      margin: 20,
                      borderRadius: 15,
                      backgroundColor: '#F6F6F6',
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <View style={{width: '70%', padding: 10}}>
                      <Text style={{fontWeight: '200', fontSize: 10}}>
                        Tabungan NOW IDR
                      </Text>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <View style={{display: 'flex', flexDirection: 'row', }}>
                          {isUserVisible ? (
                            <View style={{display:'flex', flexDirection:'row', overflow: 'hidden'}}>
                              <Text 
                                numberOfLines={1}
                                adjustsFontSizeToFit={true}
                                style={{fontWeight: 'bold'}}>
                                {formatSaldo(saldo)}
                              </Text>
                              <Text style={{fontSize: 10}}>00</Text>
                            </View>
                          ) : (
                            <Text style={{fontWeight: 'bold'}}>Rp *******</Text>
                          )}
                        </View>
                        <TouchableOpacity onPress={toggleUserVisibility}>
                          <Image
                            style={[styles.iconMata, {marginLeft: 10}]}
                            resizeMode="contain"
                            source={
                              isUserVisible
                                ? require('../assets/livin/eyeenable.png') // Ikon untuk mata tertutup
                                : require('../assets/livin/eyedisable.png')
                            }
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '20%',
                        display: 'flex',
                        padding: 5,
                        justifyContent: 'flex-end',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{height: 50, width: 60, alignSelf: 'flex-end'}}
                        source={require('../assets/livin/card.jpeg')}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={showToast}
                      style={{
                        width: '10%',
                        backgroundColor: '#E5F2FF',
                        borderTopRightRadius: 15,
                        borderBottomRightRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{
                          height: 15,
                          width: 15,
                          alignSelf: 'center',
                          justifyContent: 'center',
                        }}
                        source={require('../assets/livin/iconcopy.png')}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{
                marginBottom: 0,
                flex: 1,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  marginTop: 10,
                  paddingBottom:50
                }}>
                <View style={styles.greetingContainer}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={{flex: 1, fontWeight: 600, fontSize: 16}}>
                      Favorit Anda
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center', // Pastikan sejajar vertikal
                        gap: 10,
                      }}>
                      <Text style={{color: '#005EB1', fontWeight: '600'}}>
                        Atur
                      </Text>
                      <TouchableOpacity>
                        <Image
                          style={{width: 15, height: 15}}
                          source={require('../assets/livin/atur.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{flex: 4, marginTop: 20}}>
                  <LinearGradient
                    style={{paddingHorizontal: 16}}
                    colors={['#FFF', '#F4F9FD']}>
                    <View style={styles.row}>
                      <MenuItem
                        label="Transfer Rupiah"
                        imageUri={require('../assets/livin/transferrupiah.png')}
                        disabled
                      />
                      <MenuItem
                        label="Bayar/VA"
                        imageUri={require('../assets/livin/bayarva.png')}
                        disabled
                      />
                      <MenuItem
                        label="Top-up"
                        imageUri={require('../assets/livin/topup.png')}
                        disabled
                      />
                      <MenuItem
                        label="e-money"
                        imageUri={require('../assets/livin/emonay.png')}
                        disabled
                      />
                      <MenuItem
                        label="QR Terima Transfer"
                        imageUri={require('../assets/livin/qrterima.png')}
                        disabled
                      />
                    </View>
                  </LinearGradient>
                </View>
                <View>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <View style={{paddingLeft: 20, paddingRight: 10}}>
                        <Image
                          style={{
                            height: 30,
                            width: 40,
                          }}
                          source={require('../assets/livin/jempol.png')}
                        />
                      </View>
                      <MenuItemFavorit label="Transfer" disabled />
                      <MenuItemFavorit label="Bayar" disabled />
                      <MenuItemFavorit label="Top-up" disabled />
                      {/* <MenuItemFavorit label="Layanan" disabled /> */}
                      <MenuItemFavorit label="Layanan"  onPress={()=>  navigation.navigate('Change Saldo')}/>
                    </View>
                  </ScrollView>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 16,
                    }}>
                    <MenuItem
                      label="Quick Pick"
                      imageUri={require('../assets/livin/quickpick.png')}
                      disabled
                      style={{marginRight: 5}}
                    />
                    <MenuItem
                      label="Tagih Uang"
                      imageUri={require('../assets/livin/tagih.png')}
                      disabled
                      style={{marginRight: 5}}
                    />
                    <MenuItem
                      label="Setor Tarik"
                      imageUri={require('../assets/livin/setortarik.png')}
                      style={{marginRight: 5}}
                      disabled
                    />
                    <MenuItem
                      label="Investasi"
                      imageUri={require('../assets/livin/investasi.png')}
                      style={{marginRight: 5}}
                      disabled
                    />
                    <MenuItem
                      label="KPR"
                      imageUri={require('../assets/livin/kpr.png')}
                      disabled
                    />
                  </View>
                </View>
                <View style={{...styles.greetingContainer, marginTop: 30}}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={{flex: 1, fontWeight: 600, fontSize: 18}}>
                      e-Wallet
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center', // Pastikan sejajar vertikal
                        gap: 10,
                      }}>
                      <Text style={{color: '#005EB1', fontWeight: '600'}}>
                        Atur
                      </Text>
                      <TouchableOpacity>
                        <Image
                          style={{width: 15, height: 15}}
                          source={require('../assets/livin/atur.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <ScrollView 
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                    style={{
                      display: 'flex',
                      padding:10,
                      borderRadius: 10,
                      marginTop:10,
                      borderColor: '#eaeaea',
                      borderWidth: 1,
                      flexDirection:'row',
                    }}>
                    <View style={{padding:10, paddingRight:25, justifyContent:'center'}}>
                      <Image
                        resizeMode='contain'
                        style={{width: 20, height: 18,}}
                        source={require('../assets/livin/logowalet/plus_update.png')}
                      />
                    </View>
                    <TouchableOpacity style={{backgroundColor:'#FEECEA', padding:5, borderRadius:10, marginRight:10}}>
                      <Image
                        style={{width: 30, height: 30, margin:5}}
                        resizeMode='contain'
                        source={require('../assets/livin/logowalet/shopepay.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#FEEAEA', padding:5, borderRadius:10, marginRight:10}}>
                      <Image
                        style={{width: 30, height: 30, margin:5}}
                        resizeMode='contain'
                        source={require('../assets/livin/logowalet/linkaja.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#E6F4FD', padding:5, borderRadius:10, marginRight:10}}>
                      <Image
                        style={{width: 30, height: 30, margin:5}}
                        resizeMode='contain'
                        source={require('../assets/livin/logowalet/dana.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#E7F6FB', padding:5, borderRadius:10, marginRight:10}}>
                      <Image
                        style={{width: 30, height: 30, margin:5}}
                        resizeMode='contain'
                        source={require('../assets/livin/logowalet/gopay.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#EFEAF9', padding:5, borderRadius:10, marginRight:50}}>
                      <Image
                        style={{width: 30, height: 30, margin:5}}
                        resizeMode='contain'
                        source={require('../assets/livin/logowalet/ovo.png')}
                      />
                    </TouchableOpacity>
                  </ScrollView>
                </View>
                <View style={{...styles.greetingContainer, marginTop: 30}}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={{flex: 1, fontWeight: 600, fontSize: 18}}>
                      Checkout Belanja & Tiket
                    </Text>
                  </View>
                  <ScrollView 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{
                      display: 'flex',
                      marginTop:10,
                      flexDirection:'row',
                      gap:10,
                    }}>
                      <View style={{
                        height:200, 
                        width:150,
                        borderRadius: 10, 
                        // margin:10,
                        backgroundColor:'#F3F9FF',
                        borderColor:'#F0F1F2',
                        borderWidth:2,
                        gap:10,
                        marginRight:10,
                      }}>
                        <View style={{
                          width:80,
                          height:80,
                          alignSelf:'center',
                          marginTop:20,
                          display:'flex',
                          backgroundColor:'#FFF',
                          justifyContent: 'center', 
                          borderRadius:40,
                          borderWidth:2,
                          borderColor:'#F0F1F2',
                        }}>
                          <Image 
                            resizeMode='contain'
                            source={require('../assets/livin/logowalet/sopelogo.png')}
                            style={{
                              height:50,
                              width:50,
                              alignSelf:'center'
                            }}
                          />
                        </View>
                        <View>
                          <Text style={{textAlign:'center'}}>Shopee Indonesia</Text>
                        </View>
                        <TouchableOpacity style={{ display: 'flex', alignSelf:'center',backgroundColor:'#007CFD', padding:7, width:100, borderRadius:20}}>
                          <Text style={{color:'#FFF', textAlign:'center', fontWeight:'bold'}}>Bayar</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{
                        height:200, 
                        width:150,
                        borderRadius: 10, 
                        // margin:10,
                        backgroundColor:'#F3F9FF',
                        borderColor:'#F0F1F2',
                        borderWidth:2,
                        gap:10,
                        marginRight:10,
                      }}>
                        <View style={{
                          width:80,
                          height:80,
                          alignSelf:'center',
                          marginTop:20,
                          display:'flex',
                          backgroundColor:'#FFF',
                          justifyContent: 'center', 
                          borderRadius:40,
                          borderWidth:2,
                          borderColor:'#F0F1F2',
                        }}>
                          <Image 
                            resizeMode='contain'
                            source={require('../assets/livin/logowalet/logotokopedia.png')}
                            style={{
                              height:50,
                              width:50,
                              alignSelf:'center'
                            }}
                          />
                        </View>
                        <View>
                          <Text style={{textAlign:'center'}}>Tokopedia</Text>
                        </View>
                        <TouchableOpacity style={{ display: 'flex', alignSelf:'center',backgroundColor:'#007CFD', padding:7, width:100, borderRadius:20}}>
                          <Text style={{color:'#FFF', textAlign:'center', fontWeight:'bold'}}>Bayar</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{
                        height:200, 
                        width:150,
                        borderRadius: 10, 
                        // margin:10,
                        backgroundColor:'#F3F9FF',
                        borderColor:'#F0F1F2',
                        borderWidth:2,
                        gap:10,
                        marginRight:10,
                      }}>
                        <View style={{
                          width:80,
                          height:80,
                          alignSelf:'center',
                          marginTop:20,
                          display:'flex',
                          backgroundColor:'#FFF',
                          justifyContent: 'center', 
                          borderRadius:40,
                          borderWidth:2,
                          borderColor:'#F0F1F2',
                        }}>
                          <Image 
                            resizeMode='contain'
                            source={require('../assets/livin/logowalet/lazadalogo.png')}
                            style={{
                              height:50,
                              width:50,
                              alignSelf:'center'
                            }}
                          />
                        </View>
                        <View>
                          <Text style={{textAlign:'center'}}>Lazada</Text>
                        </View>
                        <TouchableOpacity style={{ display: 'flex', alignSelf:'center',backgroundColor:'#007CFD', padding:7, width:100, borderRadius:20}}>
                          <Text style={{color:'#FFF', textAlign:'center', fontWeight:'bold'}}>Bayar</Text>
                        </TouchableOpacity>
                      </View>
                  </ScrollView>
                </View>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
        
        <Modal
          animationType="slide"
          transparent
          visible={showModal}
          onRequestClose={() => setShowModal(false)}>
          <View style={[styles.modalBackground, {justifyContent: 'flex-end'}]}>
            <StatusBar backgroundColor="rgba(0,0,0,0.5)" translucent />
            <View style={styles.modalContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  Ingin Log Out ?
                </Text>
                <TouchableOpacity onPress={()=> setShowModal(false)}>
                  <Text style={{fontSize: 20, color:'#2a2a2a'}}>X</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{fontSize:16}}>Pastikan semua aktivitas sudah selesai, ya.</Text>
                <Text style={{fontWeight:16}}>Terima kasih telah mengakses Livin' hari ini</Text>
              </View>
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleLogout}>
                  <View
                    style={{
                      // borderWidth: 1,
                      backgroundColor: '#1696E6',
                      borderRadius: 30,
                      padding: 4,
                    }}>
                    <Text style={[styles.modalButtonText, {color: '#FFF'}]}>
                      Log Out
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const MenuItem = ({label = '', imageUri, ...props}) => {
  return (
    <TouchableOpacity {...props} style={{flex: 1, ...props.style}}>
      <View style={{justifyContent: 'center', alignItems: 'center', gap: 8}}>
        <SharpCornerRoundedSideBox
          height={60}
          sideRadius={10}
          fill="#007AFF"
          imageUri={imageUri}
        />
        <Text
          style={{
            textAlign: 'center',
            color: '#005EB1',
            fontSize: 10,
            fontWeight: 'bold',
          }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const MenuItemScorll = ({label = '', imageUri, ...props}) => {
  return (
    <TouchableOpacity {...props} style={{flex: 1, ...props.style}}>
      <View style={{justifyContent: 'center', alignItems: 'center', gap: 8}}>
        <SharpCornerRoundedSideBoxScroll
          height={60}
          sideRadius={10}
          fill="#007AFF"
          imageUri={imageUri}
        />
        <Text
          style={{
            textAlign: 'center',
            color: '#005EB1',
            fontSize: 10,
            fontWeight: 'bold',
          }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const MenuItemFavorit = ({label = '', imageUri, ...props}) => {
  return (
    <TouchableOpacity {...props} style={{flex: 1, ...props.style}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          paddingVertical: 8,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          borderRadius: 30,
          margin: 5,
          borderColor: '#eaeaea',
          borderWidth: 1,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#005EB1',
            fontSize: 10,
            fontWeight: 'bold',
          }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    // paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#33A1FE',
    // backgroundColor: 'red',
  },
  logo: {
    width: 80,
    height: 60,
  },
  logoutIcon: {
    width: 20,
    height: 20,
  },
  iconMata: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  greetingContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    paddingTop: 0,
    marginBottom: '-10%',
    borderTopEndRadius: 10,
  },
  greetingText: {
    fontSize: 18,
    color: '#6E96B2',
    fontWeight: '300',
  },
  greetingName: {
    fontSize: 22,
    color: '#3371A4',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  imageBackground: {
    marginTop: '-15%',
    width: '100%',
  },
  menuContainer: {
    marginTop: '5%',
    marginLeft: '5%',
    flexDirection: 'row',
    gap: 8,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuIcon: {
    height: 100,
    width: 80,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 5,
  },
  footerImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    aspectRatio: 5,
    alignSelf: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1aa1',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: '30%',
    padding: 30,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: '#23679A',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  modalButton: {
    flex: 1,
  },
  modalButtonGradient: {
    borderRadius: 30,
    padding: 4,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    padding: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 30,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelCard: {
    fontSize: 16,
    color: '#5CCBDE',
    // fontWeight: 'bold',
  },
  accountNumber: {
    fontSize: 16,
    color: '#5CCBDE',
    // fontWeight: 'bold',
    // letterSpacing: 1,
  },
  arrow: {
    fontSize: 20,
    paddingLeft: 10,
    color: '#5CCBDE',
  },
  eyeIcon: {
    fontSize: 16,
    color: '#888',
  },
  balanceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  currency: {
    fontSize: 22,
    color: '#39627E',
    marginRight: 10,
    fontWeight: 'bold',
  },
  balance: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2B5D81',
  },
  bottomSection: {
    alignItems: 'center',
    height: 40,
  },
  bayar: {
    fontSize: 18,
    color: '#3371A4',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  textSelengkapnya: {
    fontSize: 14,
    color: '#3371A4',
    fontWeight: 300,
  },
  containerCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    borderTopWidth: 1, // Menambah ketebalan garis
    borderRightWidth: 1, // Menambah ketebalan garis
    borderLeftWidth: 1, // Menambah ketebalan garis
    borderColor: '#ccc', // Warna garis lebih jelas
    marginTop: 20,
  },
});

export default HomeScreen;
