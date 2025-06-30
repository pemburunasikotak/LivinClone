import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Image} from 'react-native-svg';
import {useAuth} from '../contexts/AuthContext';

const MutasiModal = () => {
  const [modalMutasi, setModalMutasi] = useState(false);
  const currentMonth = new Date().toLocaleString('id-ID', {month: 'long'});
  const currentDate = new Date().toLocaleString('id-ID', {day: 'numeric'});
  const {formatSaldo, mutasi, updateMutasi, } = useAuth();
  const dataMutasi = typeof(mutasi) =="string" ? JSON.parse(mutasi) : mutasi || []
  const [currentEntry, setCurrentEntry] = useState({
    bulan: '',
    tanggal: '',
    bank: '',
    nama: '',
    noreg: '',
    nominal: '',
    status: 'in',
    keterangan: '',
    detaiKeterangan: '',
  });

  const generateId = () => {
    const randomId = Math.floor(Math.random() * 1000000);
    return randomId;
  };

  const handleModalSubmit = () => {
    const indexBulan = dataMutasi.findIndex(
      item => item.bulan === selectedMonth,
    );
    console.log('INDEX BULAN', indexBulan, currentEntry);
    if (currentEntry.id) {

      if (indexBulan !== -1) {
        const updatedData = [...dataMutasi];
        updatedData[indexBulan].data = updatedData[indexBulan].data.map(entry =>
          entry.id === currentEntry.id
            ? {
                ...currentEntry,
                nominal: Number(currentEntry.nominal),
                bulan: currentEntry.bulan || selectedMonth,
                status: currentEntry.status || 'in',
              }
            : entry,
        );
        console.log('MASUK PAK EKO', updatedData)
        updateMutasi(updatedData);
      }
    } else {
      // ADD mode
      if (indexBulan !== -1) {
        console.log('TAMBAH DATA DI BULAN YANG SUDAH ADA');
        const updatedData = [...dataMutasi];
        updatedData[indexBulan].data.push({
          ...currentEntry,
          bulan: currentEntry.bulan || selectedMonth,
          nominal: Number(currentEntry.nominal),
          id: generateId(),
          // tanggal: selectedDay || 1,
          status: currentEntry.status || 'in',
        });
        updateMutasi(updatedData);
      } else {
        console.log('TAMBAH DATA DI BULAN BARU');
        updateMutasi([
          ...dataMutasi,
          {
            bulan: currentEntry.bulan || selectedMonth,
            data: [
              {
                ...currentEntry,
                bulan: currentEntry.bulan || selectedMonth,
                nominal: Number(currentEntry.nominal),
                id: generateId(),
                status: currentEntry.status || 'in',
              },
            ],
          },
        ]);
      }
    }

    setModalMutasi(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentEntry({
      bulan: '',
      tanggal: '',
      bank: '',
      nama: '',
      noreg: '',
      nominal: '',
      status: '',
      keterangan: '',
      detaiKeterangan: '',
    });
  };

  const handleDeleteEntry = (bulan, index) => {
    console.log('HAPUS DATA DI BULAN YANG SUDAH ADA', bulan, index,dataMutasi);
    const updatedData = dataMutasi?.map(item => {
      if (item.bulan === bulan) {
        return {
          ...item,
          data: item.data.filter((_, i) => i !== index),
        };
      }
      return item;
    });
    updateMutasi(updatedData || []);
  };

  const handleEditEntry = (bulan, index) => {
    const bulanData = dataMutasi.find(item => item.bulan === bulan);
    const selectedEntry = bulanData.data[index];
    setCurrentEntry({...selectedEntry, bulan});
    setSelectedMonth(bulan);
    setModalMutasi(true);
  };
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  return (
    <View style={{flex: 1, padding: 20}}>
      <TouchableOpacity
        onPress={() => setModalMutasi(true)}
        style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Tambah Mutasi</Text>
      </TouchableOpacity>

      <ScrollView>
        {dataMutasi.map((item, bulanIndex) => (
          <View key={bulanIndex} style={styles.bulanContainer}>
            <Text style={styles.bulanTitle}>{item.bulan}</Text>
            {item.data.map((entry, index) => (
              <View key={entry.id} style={styles.entryItem}>
                {/* <View>
                  <Text>{entry.tanggal} {entry.bulan}</Text>
                  <Text>Status :{entry.status}</Text>
                  <Text>Nominal : {entry.nominal}</Text>
                  <Text>Keterangan : {entry.keterangan}</Text>
                </View> */}
                <View>
                  <View key={index} style={{marginBottom: 10, width: '100%'}}>
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
                        {entry.tanggal}
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
                            entry.status == 'in'
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
                          {entry.keterangan}
                        </Text>
                        <View style={{marginTop: 10, color: '#eaeaea'}}>
                          <Text style={{color: '#a8a8a8'}}>
                            {entry.status == 'in'
                              ? 'Transfer BI Fast'
                              : `${entry?.keterangan || ''}`}
                          </Text>
                          {entry?.detaiKeterangan && (
                            <Text>{entry?.detaiKeterangan}</Text>
                          )}
                          {entry.status == 'in' ? (
                            <>
                              <Text style={{color: '#a8a8a8'}}>
                                Dari {entry?.bank}
                              </Text>
                              <Text style={{color: '#a8a8a8'}}>
                                {entry.nama} {entry.noreg}
                              </Text>
                            </>
                          ) : (
                            <>
                              {entry.keterangan == 'Transfer' && (
                                <>
                                  <Text style={{color: '#a8a8a8'}}>
                                    {entry.nama} {entry.noreg}
                                  </Text>
                                </>
                              )}
                            </>
                          )}
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
                              entry.status == 'in'
                                ? '#40A845'
                                : 'rgb(53, 52, 52)',
                            fontWeight: 'bold',
                          }}>
                          {entry.status == 'in' ? '+' : '-'}
                          {formatSaldo(entry?.nominal)}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color:
                              entry.status == 'in'
                                ? '#40A845'
                                : 'rgb(53, 52, 52)',
                            fontWeight: '600',
                            paddingRight: 10,
                          }}>
                          00
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.entryActions}>
                  <TouchableOpacity
                    onPress={() => handleEditEntry(item.bulan, index)}>
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteEntry(item.bulan, index)}>
                    <Text style={styles.deleteText}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={modalMutasi}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalMutasi(false)}>
        <ScrollView>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Input Mutasi
              </Text>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Bulan</Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    borderRadius: 5,
                    backgroundColor: '#f9f9f9',
                    paddingVertical: 0,
                  }}>
                  <Picker
                    selectedValue={currentEntry['bulan']}
                    onValueChange={itemValue => setSelectedMonth(itemValue)}>
                    {Array.from({length: 12}, (_, i) => (
                      <Picker.Item
                        key={i}
                        color="black"
                        label={`${new Date(2025, i, 1).toLocaleString('id-ID', {
                          month: 'long',
                        })}`}
                        value={`${new Date(2025, i, 1).toLocaleString('id-ID', {
                          month: 'long',
                        })}`}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Tanggal</Text>
                  <TextInput
                    value={
                      currentEntry['tanggal']
                        ? currentEntry['tanggal'].toString()
                        : ''
                    }
                    keyboardType={'default'}
                    onChangeText={text =>
                      setCurrentEntry({...currentEntry, tanggal: text})
                    }
                    style={styles.inputBox}
                  />
                </View>

                {[
                  'bank',
                  'nama',
                  'noreg',
                  'nominal',
                  'status',
                  'keterangan',
                  'detaiKeterangan',
                ].map(field => (
                  <View key={field} style={styles.formGroup}>
                    <Text style={styles.label}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </Text>
                    {field === 'status' ? (
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: '#ccc',
                          padding: 10,
                          borderRadius: 5,
                          backgroundColor: '#f9f9f9',
                          paddingVertical: 0,
                        }}>
                        <Picker
                          selectedValue={selectedDay}
                          onValueChange={itemValue =>
                            setCurrentEntry({
                              ...currentEntry,
                              [field]: itemValue,
                            })
                          }>
                          {[
                            {label: 'Pemasukan', value: 'in'},
                            {label: 'Pengeluaran', value: 'out'},
                          ].map((status, index) => (
                            <Picker.Item
                              key={index}
                              color="blue"
                              label={status.label}
                              value={status.value}
                            />
                          ))}
                        </Picker>
                      </View>
                    ) : (
                      <TextInput
                        value={
                          currentEntry[field]
                            ? currentEntry[field].toString()
                            : ''
                        }
                        keyboardType={
                          field === 'nominal' ? 'numeric' : 'default'
                        }
                        onChangeText={text =>
                          setCurrentEntry({...currentEntry, [field]: text})
                        }
                        style={styles.inputBox}
                      />
                    )}
                  </View>
                ))}
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setModalMutasi(false)}>
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
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#2e86de',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  bulanContainer: {
    marginBottom: 20,
  },
  bulanTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  entryItem: {
    backgroundColor: '#ecf0f1',
    padding: 10,
    marginBottom: 5,
    borderRadius: 6,
  },
  entryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  editText: {
    color: 'blue',
  },
  deleteText: {
    color: 'red',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formGroup: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#2e86de',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default MutasiModal;
