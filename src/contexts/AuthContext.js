import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useIndicator } from './IndicatorContext';

// AuthContext
export const AuthContext = createContext();

// LockContext
export const LockContext = createContext();

export const AuthProvider = ({ children }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString('id-ID', {month: 'long'});
  const currentDate = new Date().toLocaleString('id-ID', { day: 'numeric' });
  const [isLogin, setIsLogin] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [saldoTertahan, setSaldoTertahan] = useState(0);
  const [userName, setUserName] = useState('Poker');
  const [userPin, setUserPin] = useState('pokermember');
  const [noRekening, setNoRekening] = useState('1234567');
  const [bcaId, setBcaId] = useState('POKER 12988');
  const [loading, setLoading] = useState(true);
  const [mutasi, setMutasi] = useState([
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
          keterangan:'Tranfer Rupiah',
          id: 123
        },
        {
          tanggal: `28 Januari ${currentYear}`,
          bank: 'BANK BCA',
          nama: 'FAUZAN DASILVA',
          noreg: '788123912',
          nominal: 20000000,
          status: 'out',
          keterangan: 'Tranfer Rupiah',
          id: 1235,
        },
        {
          tanggal: `28 Januari ${currentYear}`,
          bank: 'BANK BCA',
          nama: 'EDI PUTRA',
          noreg: '99213123112',
          nominal: 7000,
          status: 'out',
          keterangan:'Biaya',
          detaiKeterangan: "Biaya Tranfer",
          id: 1236,
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
          keterangan:'Tranfer Rupiah',
          id: 1237,
        },
        {
          tanggal: `28 Februari ${currentYear}`,
          bank: 'BANK BCA',
          nama: 'FAUZAN DASILVA',
          noreg: '788123912',
          nominal: 50000000,
          status: 'out',
          keterangan: 'Tranfer Rupiah',
          id: 1238,
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
          id: 1239,
        },
        {
          tanggal: `20 Maret ${currentYear}`,
          bank: 'BANK BCA',
          nama: 'FAUZAN DASILVA',
          noreg: '788123912',
          nominal: 2000000,
          status: 'out',
          keterangan: 'Tranfer',
          id: 12310,
        },
      ],
    },
    {
      bulan: 'April',
      data: [
        {
          tanggal: `${currentDate} ${currentMonth} ${currentYear}`,
          bank: 'BANK BCA',
          nama: 'DASILVA',
          noreg: '781231233',
          nominal: 35000000,
          status: 'in',
          keterangan: 'Tranfer Rupiah',
          id: 12311,
        },
        {
          tanggal: `${currentDate-1} ${currentMonth} ${currentYear}`,
          bank: 'BANK BCA',
          nama: 'EDI PUTRA',
          noreg: '788123912',
          nominal: 20000000,
          status: 'out',
          keterangan: 'Tranfer Rupiah',
          id: 12312,
        },
        {
            tanggal: `${currentDate-1} ${currentMonth} ${currentYear}`,
            bank: 'BANK BCA',
            nama: 'EDI PUTRA',
            noreg: '99213123112',
            nominal: 7000,
            status: 'out',
            keterangan:'Biaya',
            detaiKeterangan: "Biaya Tranfer",
            id: 12313,
        },
        {
          tanggal: `${currentDate-2} ${currentMonth} ${currentYear}`,
          bank: 'BANK BCA',
          nama: 'FAUZAN DASILVA',
          noreg: '788123912',
          nominal: 8000000,
          status: 'out',
          keterangan: 'Tranfer Rupiah',
          id: 12314,
        },
        {
            tanggal: `${currentDate-2} ${currentMonth} ${currentYear}`,
            bank: 'BANK BCA',
            nama: 'EDI PUTRA',
            noreg: '99213123112',
            nominal: 7000,
            status: 'out',
            keterangan: 'Biaya',
            detaiKeterangan: "Biaya Tranfer",
            id: 12315,
        },
        {
            tanggal: `${currentDate-4} ${currentMonth} ${currentYear}`,
            bank: 'BANK BCA',
            nama: 'EDI PUTRA',
            noreg: '788123912',
            nominal: 2000000,
            status: 'in',
            keterangan:'Tranfer Rupiah',
            id: 12316,
        },
        {
            tanggal: `${currentDate-4} ${currentMonth} ${currentYear}`,
            bank: 'BANK BCA',
            nama: 'EDI PUTRA',
            noreg: '788123912',
            nominal: 40000000,
            status: 'in',
            keterangan:'Tranfer Rupiah',
            id: 12317,
        },
      ],
    },
    {
      bulan: 'Mei',
      data: [
        {
          tanggal: `19 Mei ${currentYear}`,
          bank: 'BANK JAGO',
          nama: 'Hotman Cahaya',
          noreg: '99213123112',
          nominal: 10000000,
          status: 'in',
          id: 12313,
        },
        {
          tanggal: `20 Mei ${currentYear}`,
          bank: 'BANK BCA',
          nama: 'FAUZAN DASILVA',
          noreg: '788123912',
          nominal: 2000000,
          status: 'out',
          keterangan: 'Tranfer',
          id: 12314,
        },
      ],
    },
    {
      bulan: 'Juni',
      data: [
        {
          tanggal: `19 Juni ${currentYear}`,
          bank: 'BANK JAGO',
          nama: 'Hotman Cahaya',
          noreg: '99213123112',
          nominal: 10000000,
          status: 'in',
          id: 12315,
        },
        {
          tanggal: `20 Juni ${currentYear}`,
          bank: 'BANK BCA',
          nama: 'FAUZAN DASILVA',
          noreg: '788123912',
          nominal: 2000000,
          status: 'out',
          keterangan: 'Tranfer',
          id: 12316,
        },
      ],
    },
    {
      bulan: 'Juli',
      data: [
        {
          tanggal: `19 Juli ${currentYear}`,
          bank: 'BANK JAGO',
          nama: 'Hotman Cahaya',
          noreg: '99213123112',
          nominal: 10000000,
          status: 'in',
          id: 12317,
        },
        {
          tanggal: `20 Juli ${currentYear}`,
          bank: 'BANK BCA',
          nama: 'FAUZAN DASILVA',
          noreg: '788123912',
          nominal: 2000000,
          status: 'out',
          keterangan: 'Tranfer',
          id: 12318,
        },
      ],
    },
  ]);

  const [isLocked, setIsLocked] = useState(false);
  const [limitDate, setLimitDate] = useState(new Date());

  const { setColor } = useIndicator()

  // Load user data from AsyncStorage
  const loadUserData = async () => {
    try {
      setColor("#1D64E1")
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
      if (storedSaldoTertahan !== null) setSaldoTertahan(parseFloat(storedSaldoTertahan));
      if (storedUserName !== null) setUserName(storedUserName);
      if (storedUserPin !== null) setUserPin(storedUserPin);
      if (storedNoRekening !== null) setNoRekening(storedNoRekening);
      if (storedLimitDate !== null) setLimitDate(new Date(storedLimitDate));
      if (storedBcaId !== null) setBcaId(storedBcaId);
      if (storeMutasi !== null) setMutasi(storeMutasi);
    } catch (error) {
      console.error('Error loading data from AsyncStorage', error);
    } finally {
      setLoading(false);
    }
  };

  // Save user data to AsyncStorage
  const saveUserData = async (newSaldo, newUserName, newUserPin, newNoRekening, newBcaid,  newMutasi, newSaldoTertahan ) => {
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

  // Check if the user is logged inßß
  const login = async (pin) => {
    if (isLocked) {
      alert('Akun terkunci. Anda tidak dapat login.');
      return false;
    }

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
    setColor("#1D64E1")
  };

  // Update saldo
  const updateSaldo = (newSaldo) => {
    setSaldo(newSaldo);
    saveUserData(newSaldo, userName, userPin, noRekening, bcaId,  mutasi, saldoTertahan);
  };

  // Update saldo Tertahan
  const updateSaldoTertahan = (newSaldoTertahan) => {
    setSaldoTertahan(newSaldoTertahan);
    saveUserData(saldo, userName, userPin, noRekening, bcaId,  mutasi, newSaldoTertahan);
  };

  // Update user information
  const updateUserName = (newName) => {
    setUserName(newName);
    saveUserData(saldo, newName, userPin, noRekening, bcaId, mutasi, saldoTertahan,);
  };

  const updateUserPin = (newPin) => {
    if (!isLocked) {
      setUserPin(newPin);
      saveUserData(saldo, userName, newPin, noRekening, bcaId,  mutasi, saldoTertahan,);
    }
  };

  const updateNoRekening = (newNoRekening) => {
    setNoRekening(newNoRekening);
    saveUserData(saldo, userName, userPin, newNoRekening, bcaId,  mutasi, saldoTertahan,);
  };

  // Update saldo
  const updateBcaid = (newBcaid) => {
    setBcaId(newBcaid);
    saveUserData(saldo, userName, userPin, noRekening, newBcaid,  mutasi, saldoTertahan,);
  };
  // Update saldo
  const updateMutasi = (newMutasi) => {
    setMutasi(newMutasi);
    saveUserData(saldo, userName, userPin, noRekening, bcaId, newMutasi, saldoTertahan);
  };

  // Format saldo
  const formatSaldo = (saldo) => {
    return `Rp ${new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(saldo)}`;

  };

  // Lock status logic
  const checkLockStatus = () => {
    const today = moment();
    const limit = moment(limitDate);
    setIsLocked(today.isAfter(limit));
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    checkLockStatus();
  }, [limitDate]);

  useEffect(() => {
    if (isLocked) {
      logout();
    }
  }, [isLocked]);

  const setLockDate = async (date) => {
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
      }}
    >
      <LockContext.Provider
        value={{
          isLocked,
          limitDate,
          setLockDate,
        }}
      >
        {children}
      </LockContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useLock = () => useContext(LockContext);
