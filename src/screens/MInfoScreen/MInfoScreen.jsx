import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import InsetShadowBox from '../../components/InsetShadowBox';
import {useIndicator} from '../../contexts/IndicatorContext';
import ModalMInfo from './ModalMInfo';

const {width, height} = Dimensions.get('window');

const masterMenu = [
  {
    label: 'Info Saldo',
    type: 'menu',
    key: 'info_saldo_rekening',
  },
  {
    label: 'Mutasi Rekening',
    type: 'menu',
    key: 'mutasi_rekening',
  },
  {
    label: 'Rekening Deposito',
    type: 'menu',
    key: 'deposito_rekening',
  },
  {
    label: 'Info Reward BCA',
    type: 'menu',
    key: 'reward_bca',
  },
  {
    label: 'Info Reksadana',
    type: 'section',
    key: 'reksadana',
    submenus: [
      {
        label: 'NAB Reksadana',
        key: 'nab_reksadana',
      },
      {
        label: 'Saldo Reksadana',
        key: 'saldo_reksadana',
      },
    ],
  },
  {
    label: 'Info Kurs',
    type: 'menu',
    key: 'info_kurs',
  },
  {
    label: 'Info RDN',
    type: 'section',
    key: 'info_rdn',
    submenus: [
      {
        label: 'Info Saldo',
        key: 'saldo_rdn',
      },
      {
        label: 'Mutasi Rekening',
        key: 'mutasi_rdn',
      },
    ],
  },
  {
    label: 'Info KPR',
    type: 'section',
    key: 'info_kpr',
    submenus: [
      {
        label: 'Inquiry Pinjaman',
        key: 'pinjaman_kpr',
      },
    ],
  },
  {
    label: 'Info Kartu Kredit',
    type: 'section',
    key: 'info_kartu_kredit',
    submenus: [
      {
        label: 'Saldo',
        key: 'saldo_kartu_kredit',
      },
    ],
  },
];

const MInfoScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const {color} = useIndicator();

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View
          style={{
            padding: 16,
            backgroundColor: '#F9F9F9',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...styles.headerText,
                fontSize: 20,
                textAlign: 'center',
                width: '70%',
              }}>
              m-Info
            </Text>
            <InsetShadowBox color={color} />
          </View>
        </View>

        {/* Menu List */}
        <View style={styles.menuWrapper}>
          <View
            style={{
              overflow: 'hidden',
              borderRadius: 6,
            }}>
            <ScrollView
              contentContainerStyle={styles.menuContainer}
              overScrollMode="never"
              stickyHeaderIndices={[0]}>
              <View style={styles.header}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../../assets/minfo/m-info.png')}
                    style={styles.headerImage}
                  />
                  <Text style={styles.headerText}>m-Info</Text>
                </View>
              </View>
              {masterMenu.map(item => {
                const sectionStyle = {
                  container: {
                    backgroundColor: '#555555',
                    minHeight: 24,
                    paddingHorizontal: 8,
                    paddingVertical: 6,
                  },
                  font: {
                    color: 'white',
                    fontSize: 12,
                  },
                };

                return (
                  <React.Fragment key={item.key}>
                    <TouchableOpacity
                      style={[
                        styles.menuItem,
                        item.type === 'section' && sectionStyle.container,
                      ]}
                      disabled={item.type === 'section'}
                      onPress={() =>
                        item.key === 'info_saldo_rekening' && openModal()
                      }
                      activeOpacity={0.7}>
                      <Text
                        style={{
                          ...styles.menuText,
                          ...(item.type === 'section' ? sectionStyle.font : {}),
                        }}>
                        {item.label}
                      </Text>
                      {item.type === 'menu' && (
                        <Image
                          source={require('../../assets/icons/next-blue.png')}
                          style={styles.iconNext}
                        />
                      )}
                    </TouchableOpacity>
                    {item.type === 'section' &&
                      Array.isArray(item?.submenus) && (
                        <View style={styles.subMenuContainer}>
                          {item.submenus.map(submenu => (
                            <TouchableOpacity
                              key={`${item.key}-${submenu.key}`}
                              style={styles.subMenuItem}>
                              <Text style={styles.subMenuText}>
                                {submenu.label}
                              </Text>
                              <Image
                                source={require('../../assets/icons/next-blue.png')}
                                style={styles.iconNext}
                              />
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                  </React.Fragment>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>

      {/* Modal */}
      {modalVisible && (
        <ModalMInfo modalVisible={modalVisible} closeModal={closeModal} />
      )}
    </>
  );
};

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

export default MInfoScreen;
