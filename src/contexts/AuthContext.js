import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {useIndicator} from './IndicatorContext';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-root-toast';
import {Text, View} from 'react-native';
import { resetToFront } from '../routes/navigationRef';

// AuthContext
export const AuthContext = createContext();

// LockContext
export const LockContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [saldoTertahan, setSaldoTertahan] = useState(0);
  const [userName, setUserName] = useState('Poker');
  const [userPin, setUserPin] = useState('pokermember');
  const [noRekening, setNoRekening] = useState('1234567');
  const [bcaId, setBcaId] = useState('POKER 12988');
  const [loading, setLoading] = useState(true);
  const [mutasi, setMutasi] = useState([]);

  const [isLocked, setIsLocked] = useState(false);
  const [limitDate, setLimitDate] = useState(new Date());

  const {setColor} = useIndicator();

  // Load user data from AsyncStorage
  const loadUserData = async () => {
    try {
      setColor('#1D64E1');
      const loginStatus = await AsyncStorage.getItem('isLogin');
      const storedSaldo = await AsyncStorage.getItem('saldo');
      const storedSaldoTertahan = await AsyncStorage.getItem('saldoTertahan');
      const storedUserName = await AsyncStorage.getItem('userName');
      const storedUserPin = await AsyncStorage.getItem('userPin');
      const storedNoRekening = await AsyncStorage.getItem('noRekening');
      const storedLimitDate = await AsyncStorage.getItem('limitDate');
      const storedBcaId = await AsyncStorage.getItem('bcaId');
      const storeMutasi = await AsyncStorage.getItem('mutasi');

      if (loginStatus !== null) setIsLogin(loginStatus === 'true');
      if (storedSaldo !== null) setSaldo(parseFloat(storedSaldo));
      if (storedSaldoTertahan !== null)
        setSaldoTertahan(parseFloat(storedSaldoTertahan));
      if (storedUserName !== null) setUserName(storedUserName);
      if (storedUserPin !== null) setUserPin(storedUserPin);
      if (storedNoRekening !== null) setNoRekening(storedNoRekening);
      if (storedLimitDate !== null) setLimitDate(new Date(storedLimitDate));
      if (storedBcaId !== null) setBcaId(storedBcaId);
      if (storeMutasi !== null) {
        let parsed = storeMutasi;
        while (typeof parsed === 'string') {
          try {
            parsed = JSON.parse(parsed);
          } catch (error) {
            console.error('Gagal parse JSON:', error);
            break;
          }
        }
        setMutasi(parsed);
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage', error);
    } finally {
      setLoading(false);
    }
  };

  // Save user data to AsyncStorage
  const saveUserData = async (
    newSaldo,
    newUserName,
    newUserPin,
    newNoRekening,
    newBcaid,
    newMutasi,
    newSaldoTertahan,
  ) => {
    try {
      await AsyncStorage.setItem('saldo', newSaldo.toString());
      await AsyncStorage.setItem('userName', newUserName);
      await AsyncStorage.setItem('userPin', newUserPin);
      await AsyncStorage.setItem('noRekening', newNoRekening);
      await AsyncStorage.setItem('bcaId', newBcaid);
      await AsyncStorage.setItem('mutasi', JSON.stringify(newMutasi));
      await AsyncStorage.setItem('saldoTertahan', newSaldoTertahan.toString());
    } catch (error) {
      console.error('Error saving data to AsyncStorage', error);
    }
  };
  const login = async pin => {
    console.log('noRekening:', noRekening);
    
    // 1. Cek lock status terbaru dari Firestore terlebih dahulu
    const locked = await checkLockStatus(noRekening);
    if (locked) {
      alert('Akun terkunci. Anda tidak dapat login.');
      return false;
    }

    // 2. Jika akun tidak terkunci, baru verifikasi PIN
    const userPinUpdate = await AsyncStorage.getItem('userPin');

    if (userPinUpdate === pin) {
      await AsyncStorage.setItem('isLogin', 'true');
      setIsLogin(true);
      return true;
    } else {
      alert('Pin salah. Coba lagi.');
      return false;
    }
  };

  // Logout the user
  const logout = async () => {
    await AsyncStorage.setItem('isLogin', 'false');
    setIsLogin(false);
    setColor('#1D64E1');
  };

  // Update saldo
  const updateSaldo = newSaldo => {
    setSaldo(newSaldo);
    saveUserData(
      newSaldo,
      userName,
      userPin,
      noRekening,
      bcaId,
      mutasi,
      saldoTertahan,
    );
  };

  // Update saldo Tertahan
  const updateSaldoTertahan = newSaldoTertahan => {
    setSaldoTertahan(newSaldoTertahan);
    saveUserData(
      saldo,
      userName,
      userPin,
      noRekening,
      bcaId,
      mutasi,
      newSaldoTertahan,
    );
  };

  // Update user information
  const updateUserName = newName => {
    setUserName(newName);
    saveUserData(
      saldo,
      newName,
      userPin,
      noRekening,
      bcaId,
      mutasi,
      saldoTertahan,
    );
  };

  const updateUserPin = newPin => {
    if (!isLocked) {
      setUserPin(newPin);
      saveUserData(
        saldo,
        userName,
        newPin,
        noRekening,
        bcaId,
        mutasi,
        saldoTertahan,
      );
    }
  };

  const updateNoRekening = async newNoRekening => {
    if (!newNoRekening || newNoRekening.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Nomor rekening tidak valid',
      });
      return;
    }

    try {
      const besok = new Date();
      besok.setDate(besok.getDate() + 1);

      const limit = besok.toISOString().split('T')[0];
      setNoRekening(newNoRekening);
      await firestore().collection('mandiri').doc(newNoRekening).set({
        noRekening: newNoRekening,
        saldo: 0,
        saldoTertahan: 0,
        limit: limit,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Toast.show(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: 'white'}}>
            Nomor rekening berhasil ditambahkan.
          </Text>
        </View>,
      );
    } catch (error) {
      Toast.show(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: 'white'}}>
            Nomor rekening gagal ditambahkan.
          </Text>
        </View>,
      );
    }
    saveUserData(
      saldo,
      userName,
      userPin,
      newNoRekening,
      bcaId,
      mutasi,
      saldoTertahan,
    );
  };

  // Update saldo
  const updateBcaid = newBcaid => {
    setBcaId(newBcaid);
    saveUserData(
      saldo,
      userName,
      userPin,
      noRekening,
      newBcaid,
      mutasi,
      saldoTertahan,
    );
  };
  // Update saldo
  const updateMutasi = newMutasi => {
    setMutasi(newMutasi);
    saveUserData(
      saldo,
      userName,
      userPin,
      noRekening,
      bcaId,
      newMutasi,
      saldoTertahan,
    );
  };

  // Format saldo
  const formatSaldo = saldo => {
    return `Rp ${new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(saldo)}`;
  };

  // Lock status logic
  const checkLockStatus = async (accountNo = noRekening) => {
    try {
      const targetAccount = accountNo || noRekening;
      const doc = await firestore().collection('mandiri').doc(targetAccount).get();
      if (doc.exists) {
        const data = doc.data();
        const today = moment();
        const limit = moment(data.limit);
        const locked = today.isAfter(limit);
        setIsLocked(locked);
        setLimitDate(limit.format('YYYY-MM-DD'));
        return locked;
      } else {
        console.warn('Dokumen tidak ditemukan.');
      }
    } catch (error) {
      console.error('Gagal mengambil limitDate:', error);
    }
    return false;
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    checkLockStatus(noRekening);
  }, [limitDate]);

  useEffect(() => {
    if (isLocked) {
      logout();
      resetToFront();
    }
  }, [isLocked]);

  const setLockDate = async date => {
    setLimitDate(date);
    try {
      await AsyncStorage.setItem('limitDate', date.toISOString());
    } catch (error) {
      console.error('Error saving limitDate to AsyncStorage', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        saldo,
        userName,
        userPin,
        noRekening,
        bcaId,
        saldoTertahan,
        mutasi,
        login,
        logout,
        updateSaldo,
        updateUserName,
        updateUserPin,
        updateNoRekening,
        loading,
        formatSaldo,
        updateBcaid,
        updateSaldoTertahan,
        updateMutasi,
      }}>
      <LockContext.Provider
        value={{
          isLocked,
          setIsLocked,
          limitDate,
          setLockDate,
        }}>
        {children}
      </LockContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useLock = () => useContext(LockContext);
