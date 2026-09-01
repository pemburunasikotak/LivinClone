import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
  Dimensions,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth, useLock} from '../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const dataMaster = [
  [require('../assets/livin/newui/transfer_rupiah.png'), 'Transfer Rupiah'],
  [require('../assets/livin/newui/bayar_va.png'), 'Bayar/VA'],
  [require('../assets/livin/newui/tap_to_pay.png'), 'Top-up'],
  [require('../assets/livin/newui/emonay.png'), 'e-money'],
  [require('../assets/livin/newui/setor_tunai.png'), 'Setor Tarik'],
  [require('../assets/livin/newui/transfer_vals.png'), 'Transfer Valas'],
  [require('../assets/livin/newui/investasi.png'), 'Investasi'],
  [require('../assets/livin/newui/qris.png'), 'QR Terima'],
  [require('../assets/livin/newui/tap_to_pay.png'), 'Tap to Pay'],
  [require('../assets/livin/newui/lihat_semua.png'), 'Lihat Semua'],
];

const livinMudah = [
  {
    id: '1234234',
    image: require('../assets/livin/newui/qris_livin_mudah.png'),
    detail: 'Bayar pakai CC, Tabungan, Paylater',
  },
  {
    id: '32132312',
    image: require('../assets/livin/newui/va_livin_mudah.png'),
    detail: 'Bayar apa saja tinggal copas VA',
  },
  {
    id: '912312',
    image: require('../assets/livin/newui/reksadana_livin_mudah.png'),
    detail: 'Reksa Dana, SBN, jual beli saham, bisa',
  },
  {
    id: '83213',
    image: require('../assets/livin/newui/akses_livin_mudah.png'),
    detail: 'Akses cepat ke transaksi pilihan',
  },
  {
    id: '123923',
    image: require('../assets/livin/newui/transfer_livin_mudah.png'),
    detail: 'Transfer lengkap ke 18 valuta asing',
  },
];
const ewallet = [
  {
    id: '123',
    image: require('../assets/livin/logowalet/shopepay.png'),
  },
  {
    id: '234',
    image: require('../assets/livin/logowalet/linkaja.png'),
  },
  {
    id: '456',
    image: require('../assets/livin/logowalet/dana.png'),
  },
  {
    id: '542',
    image: require('../assets/livin/logowalet/gopay.png'),
  },
  {
    id: '432',
    image: require('../assets/livin/logowalet/ovo.png'),
  },
];

const menuItems1 = [
  {
    title: 'KPR',
    description: 'Rumah idaman dengan bunga kompetitif.',
    icon: require('../assets/livin/newui/aset_kpr.png'),
  },
  {
    title: 'Tabungan Baru',
    description: 'Atur pengeluaran dengan tabungan baru.',
    icon: require('../assets/livin/newui/tabungan_active.png'),
  },
];

const menuItem2 = [
  {
    title: 'Tabungan Rencana',
    description: 'Konsisten menabung sesuai tujuan Anda.',
    icon: require('../assets/livin/newui/rencanca_tabungan.png'),
  },
  {
    title: 'Deposito',
    description: 'Simpanan untuk bekal masa depan.',
    icon: require('../assets/livin/newui/deposito.png'),
  },
];

const promoItems = [
  {
    title: 'Promo QRIS',
    desc: 'Beli barang lucu dapat cashback\nhingga Rp100 ribu di Miniso',
    image: require('../assets/livin/newui/promo1.png'),
  },
  {
    title: 'Promo QRIS',
    desc: 'Diskon spesial hingga 50% di Alfamart',
    image: require('../assets/livin/newui/promo1.png'),
  },
  {
    title: 'Promo QRIS',
    desc: 'Belanja hemat dan dapet cashback di Indomaret',
    image: require('../assets/livin/newui/promo1.png'),
  },
];

const dataContentDetail = [
  {
    name: 'tabungan',
    header: 'Tabungan Now IDR',
    detail: 'RP',
    icon: require('../assets/livin/paltinum.png'),
  },
  {
    name: 'deposite',
    header: 'Deposito',
    detail: 'Simpan untuk bekal masa depan.',
    icon: require('../assets/livin/newui/deposite_active.png'),
  },
  {
    name: 'kartukredit',
    header: 'Belum Ada Kartu Kredit',
    detail: 'Nantikan penawaran dari kami, ya.',
    icon: require('../assets/livin/newui/cc_active.png'),
  },
  {
    name: 'pinjaman',
    header: 'KPR',
    detail: 'Rumah idaman dengan bunga kompetitif.',
    icon: require('../assets/livin/newui/pinjaman_active.png'),
    more: 'Lihat Penawaran Lainnya',
  },
  {
    name: 'investasi',
    header: 'Beli Saham',
    detail: 'Untung cepat dengan strategi jual-beli tepat.',
    icon: require('../assets/livin/newui/investasi_active.png'),
    more: 'Semua Produk Investasi',
  },
];

const getInitial = userName => {
  if (!userName) return '';

  const words = userName.trim().split(' ');

  if (words.length >= 2) {
    return words[0][0].toUpperCase() + words[1][0].toUpperCase();
  } else {
    const word = words[0];
    if (word.length >= 2) {
      return word[0].toUpperCase() + word[word.length - 1].toUpperCase();
    } else {
      return word[0].toUpperCase() + word[0].toUpperCase();
    }
  }
};

const shortenName = name => {
  if (!name) return '';
  const maxLength = 15;
  if (name.length > maxLength) {
    return name.substring(0, maxLength) + '***';
  } else {
    return name;
  }
};
const HomeScreen = () => {
  const {userName, saldo, logout} = useAuth();
  const [isActive, setIsActive] = useState('tabungan');
  const [issaldoVisible, setSaldoVisible] = useState(false);
  const navigation = useNavigation();
  const handleChangeMenu = menu => {
    setIsActive(menu);
  };
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setActiveIndex(index);
  };

  const handleLogout = () => {
    setShowModal(false);
    logout();
    navigation.reset({
      index: 0,
      routes: [{name: 'Front'}],
    });
  };

  const screenWidth = Dimensions.get('window').width;
  const cardSize = (screenWidth - 70) / 2;
  return (
    <LinearGradient colors={['#3BBDFE', '#D2F0FF']} style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor="#3BBDFE" />
      <View style={styles.containerContenHome}>
        <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
          <View style={styles.contentHeader}>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              {getInitial(userName)}
            </Text>
          </View>
          <View>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              {shortenName(userName)}
            </Text>
            <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                10
              </Text>
              <Image
                resizeMode="contain"
                style={{height: 20, width: 50}}
                source={require('../assets/livin/logolivinputih.png')}
              />
              <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                {' '}
                {'>'}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerNavbar}>
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
              setShowModal(true);
            }}>
            <Image
              style={styles.logoutIcon}
              source={require('../assets/livin/keluar.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{backgroundColor: 'transparent'}}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          style={{
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}>
          <View
            style={{
              padding: 16,
            }}>
            <View style={styles.card}>
              <View style={[styles.rowSpaceBetween, {padding: 16}]}>
                <Text style={styles.title}>Rekening</Text>
                <View style={[styles.row, {gap: 10}]}>
                  <TouchableOpacity
                    onPress={() => setSaldoVisible(!issaldoVisible)}
                    style={{display: 'flex', flexDirection: 'row', gap: 4}}>
                    <Text style={styles.link}>Saldo</Text>
                    <Image
                      style={[styles.iconMata]}
                      resizeMode="contain"
                      source={
                        issaldoVisible
                          ? require('../assets/livin/eyeenable.png')
                          : require('../assets/livin/eyedisable.png')
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                    <Text style={styles.link}>Atur</Text>
                    <Image
                      style={[styles.iconMata]}
                      resizeMode="contain"
                      source={require('../assets/livin/atur.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.tabMenu, {paddingHorizontal: 8}]}>
                <TouchableOpacity
                  onPress={() => handleChangeMenu('tabungan')}
                  style={styles.tabItem}>
                  <Image
                    style={{height: 25, width: 25, padding: 10}}
                    resizeMode="contain"
                    source={
                      isActive === 'tabungan'
                        ? require('../assets/livin/newui/tabungan_active.png')
                        : require('../assets/livin/newui/tabungan_non_active.png')
                    }
                  />
                  <Text style={styles.tabLabel}>Tabungan</Text>
                  <ActiveIcon isActive={isActive} name={'tabungan'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.tabItem}
                  onPress={() => handleChangeMenu('deposite')}>
                  <Image
                    style={{height: 25, width: 25, padding: 10}}
                    resizeMode="contain"
                    source={
                      isActive === 'deposite'
                        ? require('../assets/livin/newui/deposite_active.png')
                        : require('../assets/livin/newui/deposite_non_active.png')
                    }
                  />
                  <Text style={styles.tabLabelGray}>Deposito</Text>
                  <ActiveIcon isActive={isActive} name={'deposite'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.tabItem}
                  onPress={() => handleChangeMenu('kartukredit')}>
                  <Image
                    style={{height: 25, width: 25, padding: 10}}
                    resizeMode="contain"
                    source={
                      isActive === 'kartukredit'
                        ? require('../assets/livin/newui/cc_active.png')
                        : require('../assets/livin/newui/cc_non_active.png')
                    }
                  />
                  <Text style={styles.tabLabelGray}>Kartu Kredit</Text>
                  <ActiveIcon isActive={isActive} name={'kartukredit'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.tabItem}
                  onPress={() => handleChangeMenu('pinjaman')}>
                  <Image
                    style={{height: 25, width: 25, padding: 10}}
                    resizeMode="contain"
                    source={
                      isActive === 'pinjaman'
                        ? require('../assets/livin/newui/pinjaman_active.png')
                        : require('../assets/livin/newui/pinjaman_non_active.png')
                    }
                  />
                  <Text style={styles.tabLabelGray}>Pinjaman</Text>
                  <ActiveIcon isActive={isActive} name={'pinjaman'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.tabItem}
                  onPress={() => handleChangeMenu('investasi')}>
                  <Image
                    style={{height: 25, width: 25, padding: 10}}
                    resizeMode="contain"
                    source={
                      isActive === 'investasi'
                        ? require('../assets/livin/newui/investasi_active.png')
                        : require('../assets/livin/newui/investasi_non_active.png')
                    }
                  />
                  <Text style={styles.tabLabelGray}>Investasi</Text>
                  <ActiveIcon isActive={isActive} name={'investasi'} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 2,
                  width: '100%',
                  backgroundColor: '#F3F3F3',
                  marginTop: -10,
                }}
              />
              <ContentDetail
                active={isActive}
                saldo={saldo}
                issaldoVisible={issaldoVisible}
              />
            </View>
            <View style={[styles.card, {padding: 16}]}>
              <TouchableOpacity
                style={[styles.rowSpaceBetween]}
                // onPress={() => navigation.navigate('Change Saldo')}
                >
                <Text style={styles.title}>Transaksi Favorit</Text>
                <View style={[styles.row, {gap: 10}]}>
                  <Text style={styles.link}>Atur</Text>
                  <TouchableOpacity
                  // onPress={() => navigation.navigate('Change Saldo')}
                  >
                    <Image
                      style={[styles.iconMata]}
                      resizeMode="contain"
                      source={require('../assets/livin/atur.png')}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <View style={styles.grid}>
                {dataMaster.map(([icon, label], i) => (
                  <TouchableOpacity key={i} style={styles.iconItem}>
                    <Image
                      style={{height: 50, width: 50, padding: 10}}
                      resizeMode="contain"
                      source={icon}
                    />
                    <Text style={styles.iconLabel}>{label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <ImageBackground
                source={require('../assets/livin/newui/background.png')}
                resizeMode="stretch"
                style={{
                  width: '100%',
                  height: 60,
                  flex: 1,
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    gap: 10,
                  }}>
                  <Image
                    style={{height: 20, width: 20, padding: 10}}
                    resizeMode="contain"
                    source={require('../assets/livin/newui/qris_bawah.png')}
                  />
                  <Text style={styles.bannerText}>
                    Baru! Belanja di mana saja tinggal tap HP
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={[styles.card, {padding: 16}]}>
              <View style={[styles.rowSpaceBetween]}>
                <View style={{width: '60%'}}>
                  <Text style={styles.title}>
                    Atur Quick Pick{' '}
                    <Text style={[styles.newTabTitle, {color: '#3BBDFE'}]}>
                      →
                    </Text>{' '}
                  </Text>
                  <Text style={styles.newTabDesc}>
                    Bikin transaksi rutin Anda makin cepat dan praktis
                  </Text>
                </View>
                <View style={[styles.row]}>
                  <Image
                    style={{height: 60, width: 60, padding: 10}}
                    resizeMode="contain"
                    source={require('../assets/livin/newui/atur_quict.png')}
                  />
                </View>
              </View>
            </View>
            <View style={[styles.card, {padding: 16}]}>
              <View style={[styles.rowSpaceBetween]}>
                <Text style={styles.title}>e-Wallet </Text>
                <View style={[styles.row, {gap: 10}]}>
                  <Text style={styles.link}>Hubungkan</Text>
                  <TouchableOpacity>
                    <Image
                      style={[styles.iconMata]}
                      resizeMode="contain"
                      source={require('../assets/livin/newui/hubungkan.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                  display: 'flex',
                  padding: 10,
                  marginTop: 10,
                  flexDirection: 'row',
                }}>
                {ewallet.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={{
                      // backgroundColor: '#FEECEA',
                      padding: 4,
                      borderRadius: 10,
                      marginRight: 8,
                      borderColor: '#F0F1F2',
                      borderWidth: 1,
                    }}>
                    <Image
                      style={{width: 40, height: 40, margin: 5}}
                      resizeMode="contain"
                      source={item.image}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={[styles.card, {padding: 16}]}>
              <View style={[styles.rowSpaceBetween]}>
                <Text style={styles.title}>Livin' Lebih Mudah</Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                  display: 'flex',
                  marginTop: 10,
                  flexDirection: 'row',
                  gap: 10,
                }}>
                {livinMudah.map(item => (
                  <ContenLivinMudah item={item} key={item.id} />
                ))}
              </ScrollView>
            </View>
            <View style={[styles.card, {padding: 16}]}>
              <View style={[styles.rowSpaceBetween]}>
                <Text style={styles.title}>Produk Pilihan</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                  marginTop: 20,
                }}>
                {menuItems1.map(item => (
                  <CardProduk
                    item={item}
                    key={item.title}
                    cardSize={cardSize}
                  />
                ))}
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                  marginTop: 20,
                }}>
                {menuItem2.map(item => (
                  <CardProduk
                    item={item}
                    key={item.title}
                    cardSize={cardSize}
                  />
                ))}
              </View>
            </View>
            <View style={[styles.card, {padding: 16}]}>
              <View style={[styles.rowSpaceBetween]}>
                <Text style={styles.title}>Promo Terbaru</Text>
                <TouchableOpacity style={[styles.row, {gap: 10}]}>
                  <Text style={styles.link}>
                    Semua Promo{' '}
                    <Text style={[styles.newTabTitle, {color: '#3BBDFE'}]}>
                      →
                    </Text>{' '}
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}>
                {promoItems.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: screenWidth,
                    }}>
                    <Image
                      style={{width: '85%', height: 150, margin: 5}}
                      resizeMode="contain"
                      source={item.image}
                    />
                  </View>
                ))}
              </ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                {promoItems.map((_, index) => (
                  <View
                    key={index}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor:
                        activeIndex === index ? '#007AFF' : '#ccc',
                      marginHorizontal: 4,
                    }}
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
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
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={{fontSize: 20, color: '#2a2a2a'}}>X</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{fontSize: 16}}>
                Pastikan semua aktivitas sudah selesai, ya.
              </Text>
              <Text style={{fontWeight: 16}}>
                Terima kasih telah mengakses Livin' hari ini
              </Text>
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
    </LinearGradient>
  );
};

const CardProduk = ({item, cardSize}) => {
  return (
    <View style={[styles.containerCardProduk, {width: cardSize}]}>
      <ImageBackground
        source={require('../assets/livin/newui/bg_card_pilihan.png')}
        style={styles.imageCardProduk}
        resizeMode="cover">
        <View style={{padding: 10}}>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 14, color: '#000'}}>
              {item.title}
            </Text>
            <Text style={{fontSize: 12, color: '#444', marginTop: 4}}>
              {item.description}
            </Text>
          </View>
          <Image
            source={item.icon}
            style={styles.imageProduk}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const ContenLivinMudah = ({item}) => {
  return (
    <View
      style={{
        height: 170,
        width: 150,
        borderRadius: 10,
        borderColor: '#F0F1F2',
        borderWidth: 2,
        gap: 10,
        marginRight: 10,
      }}>
      <View
        style={{
          width: 80,
          height: 80,
          alignSelf: 'center',
          marginTop: 20,
          display: 'flex',
          backgroundColor: '#FFF',
          justifyContent: 'center',
        }}>
        <Image
          resizeMode="contain"
          source={item.image}
          style={{
            height: 70,
            width: 70,
            alignSelf: 'center',
          }}
        />
      </View>
      <View>
        <Text style={{textAlign: 'center', fontWeight: '600', padding: 5}}>
          {item?.detail}
        </Text>
      </View>
    </View>
  );
};

const ActiveIcon = ({isActive, name}) => {
  if (isActive === name) {
    return <View style={styles.activeIcon} />;
  }
};

const ContentDetail = ({active, issaldoVisible}) => {
  const navigation = useNavigation();
  const {formatSaldo, noRekening, logout} = useAuth();
  const [saldoNow, setSaldoNow] = useState(0);

  useEffect(() => {
    const subscriber = firestore()
      .collection('mandiri')
      .doc(noRekening) 
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          const dataa = documentSnapshot.data();
          setSaldoNow(dataa.saldo);
        } else {
          console.log('Document does not exist');
        }
      });

    return () => subscriber(); // Unsubscribe on cleanup
  }, []);
  const data = dataContentDetail.find(item => item.name === active);
  return (
    <View>
      {data?.name === 'tabungan' ? (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate('Tabungan Now')}
            style={{
              padding: 20,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View style={{flex: 1, padding: 10}}>
              <Text style={styles.newTabTitle}>
                {data?.header}{' '}
                <Text style={[styles.newTabTitle, {color: '#3BBDFE'}]}>→</Text>
              </Text>
              {issaldoVisible ? (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    overflow: 'hidden',
                  }}>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                    style={{fontWeight: 'bold'}}>
                    {formatSaldo(saldoNow)}
                  </Text>
                  <Text style={{fontSize: 10}}>00</Text>
                </View>
              ) : (
                <Text style={{fontWeight: 'bold'}}>Rp *******</Text>
              )}
            </View>
            <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
              <Image
                style={{
                  height: 56, 
                  width: 34, 
                  borderRadius: 2,
                  transform: [{rotate: '90deg'}]
                }}
                resizeMode="cover"
                source={data?.icon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
              flexDirection: 'row',
              gap: 10,
            }}>
            <Text
              style={{
                fontSize: 12,
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#3BBDFE',
              }}>
              Produk Tabungan Lain
            </Text>
            <View
              style={{
                borderRadius: 20,
                borderColor: '#3BBDFE',
                borderWidth: 1,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  // color: '#555',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#3BBDFE',
                  width: 18,
                  height: 18,
                }}>
                +
              </Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={[styles.newTab, styles.newTebV2]}>
          <View style={{flex: 1}}>
            <Text style={styles.newTabTitle}>
              {data?.header}{' '}
              <Text style={[styles.newTabTitle, {color: '#3BBDFE'}]}>→</Text>
            </Text>
            <Text style={styles.newTabDesc}>{data?.detail}</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Image
              style={{height: 30, width: 30}}
              resizeMode="contain"
              source={data?.icon}
            />
          </View>
        </TouchableOpacity>
      )}
      {Boolean(data?.more) && (
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 8,
            marginBottom: 10,
            flexDirection: 'row',
            gap: 10,
          }}>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#3BBDFE',
            }}>
            {data.more}
            {data.name === 'investasi' && (
              <Text style={[styles.newTabTitle, {color: '#3BBDFE'}]}>→</Text>
            )}
          </Text>
          {data.name == 'pinjaman' && (
            <View
              style={{
                borderRadius: 20,
                borderColor: '#3BBDFE',
                borderWidth: 1,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#3BBDFE',
                  width: 18,
                  height: 18,
                }}>
                +
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContenHome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  contentHeader: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: '50%',
    height: 40,
    width: 40,
    justifyContent: 'center',
  },
  newTebV2: {
    margin: 16,
    borderColor: '#F3F3F3',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  scroll: {
    paddingBottom: 80,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  logoutIcon: {
    width: 25,
    height: 25,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    // padding: 16,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    color: '#3BBDFE',
    fontWeight: '600',
  },
  iconSpacing: {
    marginHorizontal: 6,
  },
  tabMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,
  },
  tabItem: {
    alignItems: 'center',
    width: '20%',
  },
  tabLabel: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
  tabLabelGray: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
  newTab: {
    marginTop: 16,
    backgroundColor: '#F6FAFF',
    padding: 12,
    borderRadius: 12,
  },
  newTabTitle: {
    fontWeight: '600',
    color: '#4C4C4C',
    fontSize: 16,
  },
  newTabDesc: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
  iconMata: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  iconItem: {
    width: '20%',
    alignItems: 'center',
    marginVertical: 10,
  },
  iconLabel: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginTop: 6,
  },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#ECF7FF',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  bannerText: {
    marginLeft: 8,
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 13,
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
  containerCardProduk: {
    borderRadius: 16,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    height: 150,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    overflow: 'hidden',
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
  headerNavbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  imageCardProduk: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  imageProduk: {
    width: 40,
    height: 40,
    marginRight: 40,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  activeIcon: {
    height: 8,
    width: '100%',
    backgroundColor: '#FDBA07',
    marginTop: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});

export default HomeScreen;
