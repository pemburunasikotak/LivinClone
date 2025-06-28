import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../../contexts/AuthContext';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';


const { width, height } = Dimensions.get('window');

const ModalMInfo = ({ modalVisible, closeModal }) => {
  const [loading, setLoading] = useState(true);

  const { saldo, noRekening, formatSaldo } = useAuth();

  const [saldoNew, setSaldoNew] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('items')
      .doc('singleItem') // Access the fixed document
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          const dataa = documentSnapshot.data();
          setSaldoNew(dataa.name);
        } else {
          console.log('Document does not exist');
          setSaldoNew([]); // Clear data if document doesn't exist
        }
      });

    return () => subscriber(); // Unsubscribe on cleanup
  }, []);

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      transparent
      onRequestClose={closeModal}>
      <View style={styles.modalBackground}>
        <View
          style={{
            ...styles.modalContainer,
            ...(loading ? { height: 'auto' } : {}),
          }}>
          {!loading && (
            <View style={{ height: 50 }}>
              <Text
                style={{
                  ...styles.headerText,
                  // fontSize: 20,
                  textAlign: 'center',
                }}
              >
                m-Info
              </Text>
            </View>
          )}
          {loading ? (
            <ActivityIndicator size="large" color="#005BAC" />
          ) : (
            <>
              <View style={{ flex: 1 }}>
                <View style={{ marginBottom: 24 }}>
                  <Text>m-Info:</Text>
                  <Text>
                    {moment(Date.now()).format('DD/MM/YYYY HH:mm:ss')}
                  </Text>
                </View>
                <Text>{`${noRekening ? noRekening : 'REKENING TIDAK DITEMUKAN'
                  } ${saldoNew ? formatSaldo(saldoNew) : saldo ? formatSaldo(saldo) : 'Rp. 0,00'}`}</Text>
              </View>

              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <LinearGradient
                  style={styles.modalButtonGradient}
                  colors={['#1696E6', '#02387F']}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
          {loading && (
            <View style={{ height: 50 }}>
              <Text
                style={{
                  // ...styles.headerText,
                  // fontSize: 20,
                  marginTop:25,
                  textAlign: 'center',
                }}
              >
                {'Sending'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalMInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002344',
  },
  header: {
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  headerImage: {
    width: 55,
    height: 55,
    marginRight: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005BAC',
  },
  menuWrapper: {
    flex: 6,
    padding: 16,
  },
  menuContainer: {
    backgroundColor: 'white',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
    color: '#005BAC',
  },
  subMenuContainer: {
    backgroundColor: '#f9f9f9',
    paddingLeft: 32,
  },
  subMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  subMenuText: {
    fontSize: 14,
    color: '#005BAC',
  },
  iconNext: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  footer: {
    height: 93,
  },
  footerImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: width * 0.8,
    height: height * 0.5,
    justifyContent: 'space-between',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#005BAC',
    borderRadius: 5,
  },
  closeText: {
    color: 'white',
    fontSize: 16,
  },
  modalButton: {
    width: '100%',
  },
  modalButtonGradient: {
    borderRadius: 4,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    padding: 16,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
