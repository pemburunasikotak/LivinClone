import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {useLock} from '../../contexts/AuthContext';

const modalContentMap = {
  user: {
    title: 'Masukkan Nama User',
    placeholder: 'Nama User',
    keyboardType: 'default',
  },
  rek: {
    title: 'Masukkan No Rekening',
    placeholder: 'No Rekening',
    keyboardType: 'numeric',
  },
  bcaid: {
    title: 'Masukkan BCA ID',
    placeholder: 'No BCA ID',
    keyboardType: 'default',
  },
  limit: {
    title: 'Masukkan Limit Date',
    placeholder: 'Limit Date',
  },
};

const ModalChange = ({
  modalVisible = false,
  modalType,
  setModalVisible,
  handleModalSubmit,
}) => {
  const {limitDate} = useLock();

  const [inputValue, setInputValue] = useState(
    modalType === 'limit' ? limitDate || new Date() : '',
  );

  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    handleModalSubmit(inputValue);
    handleClose();
  };

  const handleClose = () => {
    setModalVisible(false);
    setInputValue(modalType === 'limit' ? new Date() : '');
    setOpen(false);
  };

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {modalContentMap[modalType]?.title || 'Isi Modal'}
          </Text>
          {modalType === 'limit' ? (
            <>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.modalInput}
                onPress={() => setOpen(true)}>
                <TextInput
                  value={moment(inputValue).format('DD/MM/YYYY')}
                  placeholder="Select Date"
                  editable={false}
                />
              </TouchableOpacity>
              <DatePicker
                modal
                open={open}
                date={inputValue} // Ensure this is a Date object
                mode="date"
                onConfirm={selectedDate => {
                  setOpen(false);
                  setInputValue(selectedDate); // Make sure selectedDate is a Date object
                }}
                onCancel={() => setOpen(false)}
              />
            </>
          ) : (
            <TextInput
              style={styles.modalInput}
              placeholder={modalContentMap[modalType]?.placeholder || ''}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType={
                modalContentMap[modalType]?.keyboardType || 'default'
              }
            />
          )}
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleClose}>
              <Text style={styles.actionButtonText}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSubmit}>
              <Text style={styles.actionButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalChange;

const styles = StyleSheet.create({
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
    padding: 8,
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
