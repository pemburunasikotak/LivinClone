import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';


const ChangeCodeScreen = () => {
  const navigation = useNavigation();
  const { userPin, updateUserPin } = useAuth();

  const [value, setValue] = useState({
    pin: '',
    new_pin: '',
    confirm_pin: '',
  });

  const handleInputChange = (field, value) => {
    setValue(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOk = () => {
    const { new_pin } = value;
    updateUserPin(new_pin);
    Alert.alert('Sukses', 'Kode akses berhasil diubah');
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#EBEBEB' }}>
      {/* <StatusBar backgroundColor="#007BFF" barStyle="light-content" /> */}
      <View style={{ flex: 1,  }}>
        <View style={{ marginTop:50, }}>
        <Text style={styles.fontMobileBca}>Change Pin</Text>
      </View>
        <View style={styles.inputWrapper}>
          <InputWithIcon
            label="Kode akses yang baru"
            secureTextEntry
            onChangeText={text => handleInputChange('new_pin', text)}
          />
          <InputWithIcon
            label="Konfirmasi kode akses yang baru"
            secureTextEntry
            onChangeText={text => handleInputChange('confirm_pin', text)}
          />
        </View>
      </View>
      <View
        style={{
          // backgroundColor: 'black',
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 16,
        }}>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => navigation.goBack()}>
          <LinearGradient
            style={styles.modalButtonGradient}
            colors={['#1696E6', '#02387F']}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalButton} onPress={handleOk}>
          <LinearGradient
            style={styles.modalButtonGradient}
            colors={['#1696E6', '#02387F']}>
            <Text style={styles.modalButtonText}>OK</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InputWithIcon = ({ label, secureTextEntry, onChangeText }) => {
  return (
    <View style={styles.inputRow}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder="Input 6 alphanum"
        secureTextEntry={secureTextEntry}
        placeholderTextColor="gray"
        onChangeText={onChangeText}
      />
      <Image
        source={require('../assets/icons/next-blue.png')}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalButton: {
    width: '40%',
  },
  fontMobileBca: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#005BAC',
  },
  modalButtonGradient: {
    borderRadius: 4,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    padding: 8,
    fontWeight: 'bold',
    fontSize: 18,
  },
  inputWrapper: {
    backgroundColor: 'white',
    margin: 18,
    gap: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    padding: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    width: 160, // Lebar label agar konsisten
    // color: '#005BAC',
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
});

export default ChangeCodeScreen;
