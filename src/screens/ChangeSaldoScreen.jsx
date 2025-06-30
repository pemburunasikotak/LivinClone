import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth} from '../contexts/AuthContext';

const ChangeSaldoScreen = () => {
  const {updateSaldo, updateSaldoTertahan, saldo, saldoTertahan, formatSaldo} = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleModalSubmit = async () => {
    if(modalType === "saldo"){
        if (inputValue) {
          await updateSaldo(inputValue);
          setModalVisible(false);
          setInputValue('');
        }
    }else if(modalType === "saldoTertahan"){
      if (inputValue) {
        await updateSaldoTertahan(inputValue);
        setModalVisible(false);
        setInputValue('');
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#EBEBEB'}}>
      <View style={{padding: 16}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#005BAC',
          }}>
          Ganti Saldo
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 24,
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
              setModalType('saldo');
              setInputValue(saldo);
              setModalVisible(true);
            }}>
            <LinearGradient
              style={styles.modalButtonGradient}
              colors={['#1696E6', '#02387F']}>
              <Text style={styles.modalButtonText}>Saldo</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModalType('saldoTertahan');
              setInputValue(saldoTertahan);
              setModalVisible(true);
            }}>
            <LinearGradient
              style={styles.modalButtonGradient}
              colors={['#1696E6', '#02387F']}>
              <Text style={styles.modalButtonText}>Tertahan</Text>
            </LinearGradient>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              navigation.navigate('Mutasi');
            }}>
            <LinearGradient
              style={styles.modalButtonGradient}
              colors={['#1696E6', '#02387F']}>
              <Text style={styles.modalButtonText}>Mutasi</Text>
            </LinearGradient>
          </TouchableOpacity> */}
        </View>
      <View style={{paddingLeft:0, justifyContent:'center'}}>
          <Text style={{textAlign:'center'}}>SALDO SAAT INI : <Text style={{fontWeight:'800', color:'red' }}>{formatSaldo(saldo)}</Text></Text>
          <Text style={{textAlign:'center'}}>SALDO TERTAHAN SAAT INI : <Text style={{fontWeight:'800', color:'red'}}>{formatSaldo(saldoTertahan)}</Text></Text>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
            </Text>
            <TextInput
              style={styles.modalInput}
              defaultValue={inputValue}
              onChangeText={text => {
                if (modalType === 'saldo') {
                  const numericText = text.replace(/[^0-9]/g, '');
                  setInputValue(numericText);
                }else if (modalType ==="saldoTertahan") {
                  const numericText = text.replace(/[^0-9]/g, '');
                  setInputValue(numericText);
                }
                else {
                  setInputValue(text);
                }
              }}
              keyboardType={modalType === 'saldo' ? 'numeric' : 'default'}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.actionButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleModalSubmit}>
                <Text style={styles.actionButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

export default ChangeSaldoScreen;
