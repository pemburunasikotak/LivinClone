import {
    View,
    Text,
    ImageBackground,
    Image,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    StatusBar,
    Dimensions,
    Animated,
    FlatList,
    Alert,
    ScrollView,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import SharpCornerRoundedSideBox from '../components/SharpCornerRoundedSideBox';
const { width, height } = Dimensions.get('window'); // Mendapatkan dimensi layar

const FrontScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const [openModalPenawaran, setOpenModalPenawaran] = useState(false);

    const inputRef = useRef(null);

    const navigation = useNavigation();

    const { login, userName, bcaId } = useAuth();

    useEffect(() => {
        if (modalVisible) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [modalVisible]);

    const checkLogin = async () => {
        console.log('MASUK disini', password);
        if (password == 'ankermagic') {
            console.log('MASUK1', password);
            navigation.navigate('Change User');
            setPassword('');
            setOpenModalLogin(false);
            return;
        }
        const isLoginSuccessful = await login(password);
        console.log('MASUK2', isLoginSuccessful);
        if (isLoginSuccessful) {
            setPassword('');
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeTabs' }],
            });
            setOpenModalLogin(false);
        }
    };

    const data = [
        {
            header: 'Hati-hati Terhadap Aplikasi Palsu ‼️',
            content: 'Karena data pribadi Anda bisa dicuri 👉',
        },
        {
            header: 'Investasi Penuh Berkah',
            content: 'Cek dan beli ST014 sekarang !',
        },
        {
            header: 'Investasi Cukup dari 1 Aplikasi',
            content: 'Lebih lengkap, praktis, dan cuan abis!',
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);

    const [isChecked, setIsChecked] = useState(false);


    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        setActiveIndex(index);
    };


    const [index, setIndex] = useState(0);
    const translateY = useRef(new Animated.Value(0)).current; // Mulai dari bawah
    useEffect(() => {
        const startAnimation = () => {
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.delay(4000),
                Animated.timing(translateY, {
                    toValue: 100,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                if (index === 3) {
                    setIndex(0);
                } else {
                    setIndex(index + 1);
                }
                startAnimation();
            });
        };
        startAnimation();
    }, []);

    const translateIntipSaldo = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startAnimation = () => {
            Animated.sequence([
                Animated.timing(translateIntipSaldo, {
                    toValue: 5, // Turun ke bawah sejauh 50px
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.delay(1000), // Tunggu sebelum muncul lagi
                Animated.timing(translateIntipSaldo, {
                    toValue: -5, // Kembali ke atas untuk muncul ulang
                    duration: 1000, // Instan ke posisi atas lagi
                    useNativeDriver: true,
                }),
            ]).start(() => {
                startAnimation(); // Loop animasi
            });
        };

        startAnimation();
        return () => {
            translateIntipSaldo.setValue(-10);
        };
    }, []);


    const [secureText, setSecureText] = useState(true);
    const [password, setPassword] = useState('');
    const [isUserVisible, setisUserVisible] = useState(false);
    const toggleUserVisibility = () => {
        setisUserVisible(!isUserVisible);
    };
    const [intipSaldo, setIntipSaldo] = useState(false)
    const handleIntipSaldo = ()=> {
        setIntipSaldo(!intipSaldo)
    }
    return (
        <View
            style={{
                backgroundColor: '#F6F6F6',
                // height: '100%',
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
            }}>
            <StatusBar
                translucent
                backgroundColor="#F6F6F6"
                barStyle="dark-content"
            />
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{
                    backgroundColor: '#F6F6F6',
                    display: 'flex',
                    flexDirection: 'row',
                    height: 20,
                    marginTop: 80,
                    width: '100vh'
                }}>
                    <View style={{ width: 50 }}>
                    </View>
                    <TouchableOpacity style={{ flex: 1 }} onPress={handleIntipSaldo}>
                        <Text style={styles.greetingText}>Aktifkan Intip Saldo</Text>
                    </TouchableOpacity>
                    <View style={{ width: 50 }}>
                        <TouchableOpacity>
                            <Image
                                source={require('../assets/icons/icon_headset_2.png')}
                                style={{
                                    height: 20,
                                    width: 25,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={{ width: 50, width: '100%', height: 25 }}> 
                    <Animated.View
                        style={{
                            transform: [{translateY: translateIntipSaldo }],
                            // opacity: opacityIntipSaldo,
                        }}
                    > 
                        <Image 
                            source={require('../assets/livin/intipsaldo.png')}
                            style={{
                                height: 20,
                                width: 20,
                                justifyContent:'center',
                                alignSelf:'center',
                            }}
                        />
                    </Animated.View>
                </View>
                <View style={{ backgroundColor: '#F6F6F6' }}>
                    <Image
                        source={require('../assets/livin/logolivin2.png')}
                        resizeMode="cover"
                        style={{
                            height: '75%',
                            width: '100%',
                        }}
                    />
                    <TouchableOpacity onPress={() => setOpenModalPenawaran(!openModalPenawaran)}>
                        <Animated.View
                            style={{
                                transform: [{ translateY }],
                                marginHorizontal: 20,
                                padding: 10,
                                backgroundColor: '#0D47A1',
                                borderRadius: 10,
                                flexDirection: 'row',
                                marginBottom: 20,
                            }}>
                            <View style={{ width: '93%' }}>
                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>
                                    {data[index]?.header}
                                </Text>
                                <Text style={{ color: '#FFF' }}>{data[index]?.content}</Text>
                            </View>
                            <View
                                style={{
                                    backgroundColor: '#FFF',
                                    padding: 5,
                                    borderRadius: 50,
                                    height: 20,
                                    width: 20,
                                    alignSelf: 'center',
                                }}>
                                <Image
                                    style={{ height: 10, width: 10, alignSelf: 'center' }}
                                    source={require('../assets/livin/arrow.png')}
                                />
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    backgroundColor: '#F6F6F6',
                    height: 200,
                    borderTopLeftRadius: 18,
                    borderTopRightRadius: 18,
                    borderWidth: 0.4,
                    borderColor: '#d1d1d1',
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                }}>
                <ScrollView 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}  // Pastikan indikator muncul
                    // scrollIndicatorInsets={{ left: 10, right: 10 }} // Perpanjang area indikator
                    // contentContainerStyle={{ paddingRight: 20 }} 
                    style={{ 
                        borderRadius: 10,
                        display: 'flex',
                        flexDirection: 'row',
                        paddingHorizontal: 12,
                        marginTop: 10, 
                 }}>
                        <MenuItem
                            label="e-money"
                            imageUri={require('../assets/livin/emonay.png')}
                            disabled
                            style={{
                                width: 80,
                            }}
                        />
                        <MenuItem
                            label="Quick Pick"
                            imageUri={require('../assets/livin/quickpick.png')}
                            disabled
                            style={{
                                width: 80,
                            }}
                        />
                        <MenuItem
                            label="QR Bayar"
                            imageUri={require('../assets/livin/qrbayar.png')}
                            disabled
                            style={{
                                width: 80,
                            }}
                        />
                        <MenuItem
                            label="QR Terima Transfer"
                            imageUri={require('../assets/livin/qrterima1.png')}
                            disabled
                            style={{
                                width: 80,
                            }}
                        />
                        <MenuItem
                            label="Setor Tarik"
                            imageUri={require('../assets/livin/setortarik.png')}
                            disabled
                            style={{
                                width: 80,
                            }}
                        />
                        <MenuItem
                            label="Setor Tarik"
                            imageUri={require('../assets/livin/setortarik.png')}
                            disabled
                            style={{
                                width: 80,
                            }}
                        />
                </ScrollView>
                <View style={{ padding: 20, height: 90 }}>
                    <TouchableOpacity
                        onPress={() => setOpenModalLogin(!modalVisible)}
                        style={{
                            backgroundColor: '#007CFD',
                            flex: 1,
                            borderRadius: 30,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            height: 50,
                            alignSelf: 'center',
                        }}>
                        <Text
                            style={{
                                color: '#FFF',
                                fontSize: 16,
                                fontWeight: '700',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                            }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent
                visible={openModalLogin}
                onRequestClose={() => setOpenModalLogin(false)}>
                <ImageBackground
                    source={require('../assets/livin/bgblur.png')}
                    resizeMode="cover"
                    style={{
                        width: '100%',
                        height: '100%',
                        flex: 1,
                        backgroundColor: 'rgba(246, 246, 246, 0.76)',
                    }}>
                    <View style={[styles.modalBackground]}>
                        <TouchableOpacity onPress={() => setOpenModalLogin(false)}>
                            <Text style={{ fontSize: 20, color: '#FFF' }}>X</Text>
                        </TouchableOpacity>
                        <StatusBar backgroundColor="rgba(246, 246, 246, 0.9)" translucent />
                        <View
                            style={{
                                width: '100%',
                                height: '100%',
                                padding: 20,
                                borderColor: 'white',
                            }}>
                            <TouchableOpacity
                                onPress={() => setOpenModalLogin(false)}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    width: '100%',
                                }}>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                        marginRight: 10,
                                        color: '#808080',
                                    }}>
                                    X
                                </Text>
                            </TouchableOpacity>
                            <View>
                                <Image
                                    source={require('../assets/livin/logolivinlogin.png')}
                                    resizeMode="center"
                                    style={{
                                        height: 80,
                                        width: 80,
                                        alignSelf: 'center',
                                        marginBottom: 20,
                                        marginTop: 30,
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: '#FFF',
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    paddingHorizontal: 20,
                                    width: '100%',
                                    marginTop: 50,
                                    marginBottom: 20,
                                    borderWidth: 2,
                                    borderColor: '#1696E6',
                                    borderStyle: 'solid',
                                }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor="#aaa"
                                    secureTextEntry={!isUserVisible}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity
                                    style={styles.icon}
                                    onPress={toggleUserVisibility}>
                                    <Image
                                        style={{
                                            marginLeft: 10,
                                            height: 20,
                                            width: 20,
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            resizeMode: 'contain',
                                        }}
                                        resizeMode="contain"
                                        source={
                                            !isUserVisible
                                                ? require('../assets/livin/eyeenable.png') // Ikon untuk mata tertutup
                                                : require('../assets/livin/eyedisable.png')
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    gap: 8,
                                }}>
                                <TouchableOpacity
                                    onPress={checkLogin}
                                    disabled={!password}
                                    style={{
                                        backgroundColor: password
                                            ? '#1696E6'
                                            : 'rgba(201, 197, 197, 0.94)',
                                        borderRadius: 30,
                                        padding: 4,
                                        width: '100%',
                                        display: 'flex',
                                    }}>
                                    <View>
                                        <Text
                                            style={[
                                                {
                                                    color: 'white',
                                                    textAlign: 'center',
                                                    padding: 8,
                                                    fontSize: 20,
                                                    fontWeight: 'bold',
                                                    color: password ? '#FFF' : '#aaa',
                                                    width: '100%',
                                                },
                                            ]}>
                                            Login
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={{ textAlign: 'center' }}
                                onPress={() => {
                                    navigation.navigate('Change Code');
                                    setOpenModalLogin(false);
                                }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        color: '#0066AE',
                                        marginTop: 40,
                                    }}>
                                    Lupa Password?
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </Modal>
            <Modal
                animationType="fade"
                visible={openModalPenawaran}
                transparent
                // presentationStyle="fullScreen"
                onRequestClose={() => setOpenModalPenawaran(false)}>
                <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                    <StatusBar backgroundColor="rgba(255, 255, 255, 1)" translucent />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginTop: 10 }}>
                        <View style={{ width: 30 }}>
                        </View>
                        <View ><Text style={{ fontSize: 18, fontWeight: 'bold' }}>Penawaran Spesial</Text></View>
                        <TouchableOpacity style={{ width: 30 }} onPress={() => setOpenModalPenawaran(false)}>
                            <Text style={{ fontSize: 18, color: '#8a8a8a' }}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:'80%', padding:10}}>
                        <FlatList
                            data={[
                                {
                                    id: "1",
                                    title: "Hati-hati Terhadap Aplikasi Palsu",
                                    description:
                                        "Waspada terhadap file aplikasi palsu dari sumber tak dikenal dalam bentuk foto, undangan, atau dokumen lainnya karena bisa mencuri data pribadi Anda.",
                                    image: require("../assets/livin/bg_1.png"),
                                },
                                {
                                    id: "2",
                                    title: "Investasi Penuh Berkah",
                                    description:
                                        "Dapatkan alternatif investasi syariah yang bisa jadi passive income kamu, kupon minimal 6,5% untuk tenor 2 tahun!",
                                    image: require("../assets/livin/bg_2.png"),
                                },
                                {
                                    id: "3",
                                    title: "",
                                    description:
                                        "Waspada terhadap file aplikasi palsu dari sumber tak dikenal dalam bentuk foto, undangan, atau dokumen lainnya karena bisa mencuri data pribadi Anda.",
                                    image: require("../assets/livin/bg_3.png"),
                                },
                            ]}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => <OfferCard item={item} />}
                            ref={flatListRef}
                            keyExtractor={(item) => item.id}
                            onScroll={handleScroll}
                        />
                    </View>
                    <View style={{
                         flexDirection: 'row',
                         marginTop: 10,
                         textAlign: 'center',
                         justifyContent: 'center',
                    }}>
                        {data.map((_, index) => (
                        <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
                        ))}
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                visible={intipSaldo}
                transparent
                // presentationStyle="fullScreen"
                onRequestClose={() => setIntipSaldo(false)}>
                <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                    <StatusBar backgroundColor="rgba(255, 255, 255, 1)" translucent />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginTop: 10 }}>
                        <View style={{ width: 30 }}>
                        </View>
                        <TouchableOpacity style={{ width: 30 }} onPress={() => setIntipSaldo(false)}>
                            <Text style={{ fontSize: 18, color: '#8a8a8a' }}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:'70%', padding:10,}}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign:'center'}}>Aktifkan Intip Saldo</Text>
                        <Text style={{textAlign:'center', paddingHorizontal:20, marginTop:20, fontSize:15, color: 'rgb(152, 152, 152)'}}>Penasaran transfer masuk atau sisa limit kartu kredit ? Cukup intip tanpa login</Text>
                        <View style={{ display:'flex', justifyContent:'center', flex:1}}>
                            <Image 
                                source={require('../assets/front/hold_phone.png')}
                                style={{
                                    alignSelf:'center',
                                }}
                            />
                        </View>
                    </View>
                    <View style={{display:'flex', flexDirection:'row', padding:20}}>
                        <TouchableOpacity
                            onPress={() => setIsChecked(!isChecked)} 
                            style={{
                            width: 24,
                            height: 24,
                            borderRadius: 5,
                            borderWidth: 2,
                            borderColor: isChecked ? '#005EB1' : '#a8a8a8',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 10
                            }}
                        >
                            {isChecked && 
                            <Image 
                                source={require('../assets/front/check.png')}
                                style={{width:18, height:18}}
                            />
                            }
                        </TouchableOpacity>
                        <Text style={{width:'90%', color: 'rgb(152, 152, 152)'}}>Dengan mengaktifkan, saya telah membaca dan menyetujui syarat dan ketentuan untuk Intip Saldo</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <TouchableOpacity
                            onPress={() => setIntipSaldo(false)}
                            disabled={!isChecked}
                            style={{
                            backgroundColor: isChecked ? '#1696E6' : 'rgba(201, 197, 197, 0.94)',
                            borderRadius: 30,
                            padding: 4,
                            width: '80%',
                            justifyContent: 'center',
                            alignItems: 'center', // Tambahan agar teks dalam tombol juga tengah
                            }}
                        >
                            <Text
                            style={{
                                color: isChecked ? '#FFF' : '#aaa',
                                textAlign: 'center',
                                padding: 8,
                                fontSize: 20,
                                fontWeight: 'bold',
                                width: '100%',
                            }}
                            >
                            Aktifkan Sekarang
                            </Text>
                        </TouchableOpacity>
                        </View>
                </View>
            </Modal>

        </View>
    );
};
const OfferCard = ({ item }) => (
    <View style={{
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginHorizontal: 10,
        width: 350,
        elevation: 5,
        margin:10,
    }}>
        <Image source={item.image} style={{
            width: "100%",
            height: 350,
            borderTopRightRadius:10,
            borderTopLeftRadius:10
        }} />
        <View style={{
            padding: 15,
        }}>
            <Text style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 5,
            }}>{item.title}</Text>
            <Text style={{
                fontSize: 14,
                color: "#666",
                marginBottom: 10,
            }}>{item.description}</Text>
            <TouchableOpacity onPress={()=>{console.log('cek cek')}} style={{
                backgroundColor: "#007BFF",
                borderRadius: 5,
                alignItems: "center",
                borderRadius:50,
                padding:15,
                marginTop:15
            }}>
                <Text style={{
                    color: "#FFF",
                    fontSize: 14,
                    fontWeight: "bold",
                }}>Cek Sekarang</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const MenuItem = ({
    label = '',
    imageUri,
    imageHeight = 80,
    imageWidth = 80,
    ...props
}) => {
    return (
        <TouchableOpacity {...props} style={{ flex: 1, ...props.style }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <SharpCornerRoundedSideBox
                    height={50}
                    width={50}
                    imageWidth={imageWidth}
                    imageHeight={imageHeight}
                    sideRadius={10}
                    fill="#007AFF"
                    imageUri={imageUri}
                />
                <Text style={{ textAlign: 'center', color: '#9E9E9E', fontSize: 12 }}>
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        height: height * 0.35,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#CCC',
        marginHorizontal: 5,
      },
      activeDot: {
        backgroundColor: '#007BFF',
      },
    card: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        borderRadius: 5,
        padding: 10,
    },
    contentContainer: {
        marginTop: -height * 0.2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flex: 1,
    },
    greetingText: {
        color: '#8B8B8B',
        // color:rgb(139, 139, 139),
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 12,
        marginLeft: 20,
    },
    menuContainer: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    cardText: {
        textAlign: 'left', // Teks rata kiri
        color: '#0066AE',
        fontSize: 14,
    },
    menuItem: {
        padding: 8,
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        borderWidth: 0.2,
        borderColor: 'white',
        height: height * 0.12,
    },
    menuIcon: {
        width: 60,
        height: 60,
    },
    menuText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    additionalMenuContainer: {
        marginTop: 24,
        gap: 13,
        flex: 1,
    },
    additionalMenuItem: {
        backgroundColor: 'white',
        borderRadius: 8,
    },
    additionalMenuGradient: {
        padding: 12,
        borderRadius: 4,
        height: 57,
        alignItems: 'center',
        justifyContent: 'center',
    },
    additionalMenuText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        color: '#0066AE',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
        fontWeight: '700',
    },
    modalInput: {
        backgroundColor: 'white',
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
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
        borderRadius: 40,
        width: 150,
        textAlign: 'center',
        alignSelf: 'center',
        height: 50,
    },
    modalButtonText: {
        color: 'white',
        textAlign: 'center',
        padding: 8,
        fontWeight: 'bold',
        fontSize: 20,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    containerPassword: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        margin: 0,
        padding: 0,
    },
    input: {
        flex: 1,
        // borderBottomWidth: 1,
        borderBottomColor: '#888',
        fontSize: 18,
        color: '#000',
    },
    label: {
        position: 'absolute',
        // left: 10,
        fontSize: 18,
        zIndex: 1,
    },
    eyeIcon: {
        padding: 5,
        marginLeft: 10,
    },

    dot: {
        width: 10, // Size of the dot
        height: 10, // Size of the dot
        borderRadius: 5, // Make the dot circular
        margin: 5, // Space between dots
        backgroundColor: '#C4C4C4', // Default inactive color (light gray)
    },
    activeDot: {
        backgroundColor: '#007AFF', // Active dot color (blue, for example)
        width: 12, // Slightly larger than inactive dot
        height: 12, // Slightly larger than inactive dot
    },
    inactiveDot: {
        backgroundColor: '#C4C4C4', // Inactive dot color (light gray)
        width: 10, // Default size for inactive dot
        height: 10, // Default size for inactive dot
    },
    pagerView: {
        width: '100%',
        height: 200,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FrontScreen;
