import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth, useLock} from '../../contexts/AuthContext';
import ModalChange from './ModalChange';
import { useNavigation } from '@react-navigation/native';

const ChangeUserScreen = () => {
  const {updateUserName, updateNoRekening, updateBcaid} = useAuth();

  const navigation = useNavigation();

  const {setLockDate} = useLock();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleModalSubmit = async data => {
    if (data) {
      const functionUpdate =
        modalType === 'user'
          ? updateUserName
          : modalType === 'rek'
          ? updateNoRekening
          : modalType === 'bcaid'
          ? updateBcaid
          : setLockDate;

      await functionUpdate(data);

      setModalVisible(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#1696E6'}}>
      <View style={{padding: 16}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#005BAC',
          }}>
          BCA mobile
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: '#1696E6',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 16,
        }}>
        <View
          style={{
            flex: 1,
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 18,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16,
          }}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModalType('user');
              setModalVisible(true);
            }}>
            <LinearGradient
              style={styles.modalButtonGradient}
              colors={['#1696E6', '#02387F']}>
              <Text style={styles.modalButtonText}>User</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModalType('rek');
              setModalVisible(true);
            }}>
            <LinearGradient
              style={styles.modalButtonGradient}
              colors={['#1696E6', '#02387F']}>
              <Text style={styles.modalButtonText}>Rek</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModalType('limit');
              setModalVisible(true);
            }}>
            <LinearGradient
              style={styles.modalButtonGradient}
              colors={['#1696E6', '#02387F']}>
              <Text style={styles.modalButtonText}>Limit</Text>
            </LinearGradient>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModalType('bcaid');
              setModalVisible(true);
            }}>
            <LinearGradient
              style={styles.modalButtonGradient}
              colors={['#1696E6', '#02387F']}>
              <Text style={styles.modalButtonText}>ID</Text>
            </LinearGradient>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{...styles.modalButton, backgroundColor: 'red'}}
            onPress={() => {
              navigation.goBack();
            }}>
            <LinearGradient
              style={styles.modalButtonGradient}
              colors={['#FF0000', '#FF0000']}>
              <Text style={styles.modalButtonText}>KEMBALI</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      {modalVisible && (
        <ModalChange
          {...{
            modalType,
            modalVisible,
            setModalVisible,
            handleModalSubmit,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalButton: {
    width: '40%',
  },
  modalButtonGradient: {
    borderRadius: 4,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    padding: 8,
    fontWeight: 'bold',
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    padding: 10,
    backgroundColor: '#1696E6',
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChangeUserScreen;
