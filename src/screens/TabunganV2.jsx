import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {showToast} from './HomeScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';

const TabunganNowScreen = () => {
  const navigation = useNavigation();
  const {noRekening, saldo, formatSaldo, saldoTertahan, mutasi} = useAuth();
  const [heightContent, setHeightContent] = useState(0)
  const bottomSheetRef = useRef(null);
  const handleSheetChanges = useCallback(index => {
    setHeightContent(index)
  }, []);
  const snapPoints = ['50%', '100%'];

  const menuItems = Array.from({length: 12}, (_, i) =>
    new Date(2025, i, 1).toLocaleString('id-ID', {month: 'long'}),
  );
  const currentMonth = new Date().toLocaleString('id-ID', {month: 'long'});
  const currentDate = new Date().toLocaleString('id-ID', { day: 'numeric' });
  const currentMonthCapitalized = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
  const currentYear = new Date().getFullYear();

  const index = menuItems.indexOf(currentMonthCapitalized);

  if (index !== -1) {
    const afterCurrent = menuItems.slice(index + 1);
    const beforeAndCurrent = menuItems.slice(0, index + 1);
    const reordered = afterCurrent.concat(beforeAndCurrent);
    menuItems.splice(0, menuItems.length, ...reordered);
  }

  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(menuItems.length - 1);

  useEffect(() => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: false });
      }
    }, 100);
  }, []);

  const dataHasil = [
    {
      bulan: 'Januari',
      data: [
        {
          tanggal: `19 Januari ${currentYear}`,
          bank: 'BANK PERMATA',
          nama: 'Hotman Cahaya',
          noreg: '99213123112',
          nominal: 10000000,
          status: 'in',
          keterangan:'Tranfer Rupiah'
        },
        {
          tanggal: `28 Januari ${currentYear}`,
          bank: 'BANK BCA',
          nama: 'FAUZAN DASILVA',
          noreg: '788123912',
          nominal: 20000000,
          status: 'out',
          keterangan: 'Tranfer Rupiah'
        },
        {
          tanggal: `28 Januari ${currentYear}`,
          bank: 'BANK BCA',
          nama: 'EDI PUTRA',
          noreg: '99213123112',
          nominal: 7000,
          status: 'out',
          keterangan:'Biaya',
          detaiKeterangan: "Biaya Tranfer"
      },
      ],
    },
    {
      bulan: 'Februari',
      data: [
        {
          tanggal: `19 Februari ${currentYear}`,
          bank: 'BANK JAGO',
          nama: 'Hotman Cahaya',
          noreg: '99213123112',
          nominal: 10000000,
          status: 'in',
          keterangan:'Tranfer Rupiah'
        },
        {
          tanggal: `28 Februari ${currentYear}`,
          bank: 'BANK BCA',
          nama: 'FAUZAN DASILVA',
          noreg: '788123912',
          nominal: 50000000,
          status: 'out',
          keterangan: 'Tranfer Rupiah'
        },
      ],
    },
    {
      bulan: 'Maret',
      data: [
        {
          tanggal: `19 Maret ${currentYear}`,
          bank: 'BANK JAGO',
          nama: 'Hotman Cahaya',
          noreg: '99213123112',
          nominal: 10000000,
          status: 'in',
        },
        {
          tanggal: `20 Maret ${currentYear}`,
          bank: 'BANK BCA',
          nama: 'FAUZAN DASILVA',
          noreg: '788123912',
          nominal: 2000000,
          status: 'out',
          keterangan: 'Tranfer'
        },
      ],
    },
  ];

  const dataKosong = {
    bulan: menuItems[activeIndex],
    data: [],
  };
  
  const dataBulanBerjalan = {
    bulan : currentMonth,
    data: [
        {
          tanggal: `${currentDate} ${currentMonth} ${currentYear}`,
          bank: 'BANK BCA',
          nama: 'DASILVA',
          noreg: '781231233',
          nominal: 35000000,
          status: 'in',
          keterangan: 'Tranfer Rupiah'
        },
        {
          tanggal: `${currentDate-1} ${currentMonth} ${currentYear}`,
          bank: 'BANK BCA',
          nama: 'EDI PUTRA',
          noreg: '788123912',
          nominal: 20000000,
          status: 'out',
          keterangan: 'Tranfer Rupiah'
        },
        {
            tanggal: `${currentDate-1} ${currentMonth} ${currentYear}`,
            bank: 'BANK BCA',
            nama: 'EDI PUTRA',
            noreg: '99213123112',
            nominal: 7000,
            status: 'out',
            keterangan:'Biaya',
            detaiKeterangan: "Biaya Tranfer"
        },
        {
          tanggal: `${currentDate-2} ${currentMonth} ${currentYear}`,
          bank: 'BANK BCA',
          nama: 'FAUZAN DASILVA',
          noreg: '788123912',
          nominal: 8000000,
          status: 'out',
          keterangan: 'Tranfer Rupiah'
        },
        {
            tanggal: `${currentDate-2} ${currentMonth} ${currentYear}`,
            bank: 'BANK BCA',
            nama: 'EDI PUTRA',
            noreg: '99213123112',
            nominal: 7000,
            status: 'out',
            keterangan: 'Biaya',
            detaiKeterangan: "Biaya Tranfer"
        },
        {
            tanggal: `${currentDate-4} ${currentMonth} ${currentYear}`,
            bank: 'BANK BCA',
            nama: 'EDI PUTRA',
            noreg: '788123912',
            nominal: 2000000,
            status: 'in',
            keterangan:'Tranfer Rupiah'
        },
        {
            tanggal: `${currentDate-4} ${currentMonth} ${currentYear}`,
            bank: 'BANK BCA',
            nama: 'EDI PUTRA',
            noreg: '788123912',
            nominal: 40000000,
            status: 'in',
            keterangan:'Tranfer Rupiah'
        },
    ]
  }

  // const cek  = menuItems[activeIndex] == currentMonth
  // const dataTransaksi =cek ? dataBulanBerjalan : dataHasil.find(item => item.bulan == menuItems[activeIndex]) || dataKosong;
  const dataMutasi = typeof(mutasi) === "string" ? JSON.parse(mutasi) : mutasi
  const dataTransaksi =  dataMutasi.find(item => item.bulan == menuItems[activeIndex]) || dataKosong;

  const betul = true;
  if (betul)
    return (
      <GestureHandlerRootView
        style={{
          flex: 1,
          backgroundColor: '#33A1FE',
        }}>
        <StatusBar barStyle={'dark-content'} backgroundColor="#33A1FE" />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 16,
            backgroundColor: '#33A1FE',
          }}>
          <View style={{width: '33%'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/livin/arrowleft.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{width: '33%'}}>
            <Image
              resizeMode="contain"
              style={{
                height: 70,
                width: 100,
                alignSelf: 'flex-end',
                borderRadius: 10,
              }}
              source={require('../assets/livin/tabungannow/cardmandiri.png')}
            />
          </TouchableOpacity>
          <View
            style={{
              width: '33%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 20,
            }}>
            <TouchableOpacity>
              <Image
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                  textAlign: 'center',
                }}
                source={require('../assets/livin/info.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{
                  height: 20,
                  width: 20,
                }}
                source={require('../assets/livin/seting.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{padding: 16, color: '#FFF'}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              color: '#FFF',
            }}>
            Tabungan NOW IDR
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#FFF',
              }}>
              {noRekening}
            </Text>
            <TouchableOpacity onPress={showToast}>
              <Image
                resizeMode="contain"
                style={{
                  height: 15,
                  width: 15,
                  marginLeft: 5, // Jarak antara teks dan ikon copy hanya 5
                }}
                source={require('../assets/livin/tabungannow/copy.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={{fontWeight: 'bold', color: '#FFF', fontSize: 20}}>
              {formatSaldo(saldo)}
            </Text>
            <Text style={{fontSize: 12, color: '#FFF', fontWeight: 'bold'}}>
              00
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Text style={{color: '#FFF'}}>Nominal Tertahan</Text>
            <Text style={{color: '#FFF', marginLeft: 20}}>
              {' '}
              {formatSaldo(saldoTertahan)}
            </Text>
            <Text style={{fontSize: 10, color: '#FFF'}}>00</Text>
          </View>
          <View
            style={{
              height: 150,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: 140,
                width: 90,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                  backgroundColor: '#FFF',
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/livin/tabungannow/transfer.png')}
                  resizeMode="contain"
                  style={{
                    height: 50,
                    width: 50,
                    alignSelf: 'center',
                  }}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 10,
                  height: 35,
                  color: '#FFF',
                }}>
                Transfer Rupiah
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 140,
                width: 90,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                  backgroundColor: '#FFF',
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/livin/tabungannow/va.png')}
                  resizeMode="contain"
                  style={{
                    height: 50,
                    width: 50,
                    alignSelf: 'center',
                  }}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 10,
                  height: 35,
                  color: '#FFF',
                }}>
                Bayar/Va
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 140,
                width: 90,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                  backgroundColor: '#FFF',
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/livin/tabungannow/topup.png')}
                  resizeMode="contain"
                  style={{
                    height: 50,
                    width: 50,
                    alignSelf: 'center',
                  }}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 10,
                  height: 35,
                  color: '#FFF',
                }}>
                Top-up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 140,
                width: 90,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                  backgroundColor: '#FFF',
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/livin/tabungannow/kartu.png')}
                  resizeMode="contain"
                  style={{
                    height: 50,
                    width: 50,
                    alignSelf: 'center',
                  }}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 10,
                  height: 35,
                  color: '#FFF',
                }}>
                Kartu Fisik/ Virtual
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={snapPoints}
          enableContentPanningGesture={true}
          index={0}>
          <BottomSheetView
            style={{
              flex: 1,
              alignItems: 'center',
              paddingHorizontal: 10,
              backgroundColor: '#FFF',
            }}>
            <View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: 600,
                      fontSize: 18,
                      color: '#a8a8a8',
                    }}>
                    Transaksi
                  </Text>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#005EB1',
                        fontWeight: '300',
                        fontSize: 14,
                      }}>
                      E-Statement
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 15,
                  }}>
                  <View style={{width: '90%'}}>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsHorizontalScrollIndicator={false}
                      >
                      {menuItems.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => setActiveIndex(index)}
                          style={{
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            minWidth:80,
                            paddingRight:
                              index === menuItems.length - 1 ? 50 : 12,
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color:
                                activeIndex === index ? '#005EB1' : 'black',
                            }}>
                            {item}
                          </Text>
                          <View
                            style={{
                              height: 3,
                              width: '100%',
                              backgroundColor:
                                activeIndex === index
                                  ? '#005EB1'
                                  : 'transparent',
                              marginTop: 5,
                            }}
                          />
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                  <TouchableOpacity
                    style={{
                      width: '10%',
                      borderLeftWidth: 2,
                      borderColor: '#eaeaea',
                    }}>
                    <Image
                      source={require('../assets/livin/tabungannow/search.png')}
                      resizeMode="contain"
                      style={{
                        height: 30,
                        width: 30,
                        alignSelf: 'center',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{height: heightContent===0 ? "40%" : "90%"}}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                  >
                    {dataTransaksi.data.length > 0 ? (
                        dataTransaksi.data.map((item, index) => (
                          <View
                            key={index}
                            style={{marginBottom: 10, width: '100%'}}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                paddingVertical: 15,
                                borderTopWidth: 1,
                                borderColor: '#eaeaea',
                              }}>
                              <Text
                                style={{
                                  flex: 1,
                                  fontWeight: 600,
                                  fontSize: 14,
                                  color: '#a8a8a8',
                                }}>
                                {item.tanggal}
                              </Text>
                            </View>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 5,
                              }}>
                              <View style={{}}>
                                <Image
                                  resizeMode="contain"
                                  source={
                                    item.status === 'in'
                                      ? require('../assets/livin/tabungannow/transfer.png')
                                      : require('../assets/livin/tabungannow/out.png')
                                  }
                                  style={{
                                    width: 25,
                                    height: 25,
                                  }}
                                />
                              </View>
                              <View style={{paddingLeft: 1, width: '55%'}}>
                                <Text
                                  style={{
                                    color: 'black',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                  }}>
                                      {item.keterangan}
                                </Text>
                                <View style={{marginTop: 10, color: '#eaeaea'}}>
                                  <Text style={{color: '#a8a8a8'}}>
                                    {item.status === 'in'
                                      ? 'Transfer BI Fast'
                                      : `${item?.keterangan || ""}`}
                                  </Text>
                                  {item?.detaiKeterangan && (
                                      <Text>{item?.detaiKeterangan}</Text>
                                  )}
                                  {item.status === 'in' ?
                                  <>
                                      <Text style={{color: '#a8a8a8'}}>
                                      Dari {item?.bank}
                                      </Text>
                                      <Text style={{color: '#a8a8a8'}}>
                                      {item.nama} {item.noreg}
                                      </Text>
                                  </>
                                  :
                                  <>
                                      {item.keterangan =="Tranfer" && (
                                          <>
                                          <Text style={{color: '#a8a8a8'}}>
                                              {item.nama} {item.noreg}
                                              </Text>
                                          </>
                                      )}
                                  </>
                                  }
                                </View>
                              </View>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  width: '38%',
                                  justifyContent: 'flex-end',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color:
                                      item.status == 'in'
                                        ? '#40A845'
                                        : 'rgb(53, 52, 52)',
                                    fontWeight: 'bold',
                                  }}>
                                  {item.status == 'in' ? '+' : '-'}
                                  {formatSaldo(item?.nominal)}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color:
                                      item.status == 'in'
                                        ? '#40A845'
                                        : 'rgb(53, 52, 52)',
                                    fontWeight: '600',
                                    paddingRight:10,
                                  }}>
                                  00
                                </Text>
                              </View>
                            </View>
                            {index == dataTransaksi.data.length - 1 && (
                              <View style={{marginVertical: 50}}>
                                <Text style={{textAlign: 'center'}}>
                                  Anda telah mencapai ahir mutasi transaksi bulan
                                  ini
                                </Text>
                              </View>
                            )}
                          </View>
                        ))
                      ) : (
                        <View
                          style={{
                            display: 'flex',
                            marginTop:10,
                            borderTopWidth: 1,
                            width: '100%',
                            borderColor: '#eaeaea',
                            gap: 15,
                          }}>
                          <Text
                            style={{
                              fontWeight: 600,
                              fontSize: 14,
                              color: '#a8a8a8',
                              marginTop:20,
                            }}>
                            {menuItems[activeIndex]} {currentYear - 1}
                          </Text>
                          <Text style={{}}>
                            Belum ada transaksi pada bulan ini.
                          </Text>
                        </View>
                      )}
                    </ScrollView>
                </View>
                </View>
              {/* </View> */}
            </View>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    );
};

export default TabunganNowScreen;
