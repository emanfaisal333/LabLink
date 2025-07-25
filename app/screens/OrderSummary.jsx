// import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import useAuthRedirect from '../components/useAuthRedirect';


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  onTopView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: width * 0.04,
    paddingVertical: height * 0.04,
    paddingHorizontal: width * 0.06,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  modalIcon: {
    width: width * 0.5,
    height: width * 0.3,
    marginBottom: height * 0.02,
    resizeMode: 'contain',
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  details: {
    marginBottom: height * 0.02,
    alignItems: 'center',
  },
  detailText: {
    fontSize: width * 0.038,
    color: '#475569',
    textAlign: 'center',
    marginVertical: 2,
  },
  button: {
    backgroundColor: '#3b7cff',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: height * 0.015,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.042,
    fontWeight: 'bold',
  },
});


const OrderSummary = ({ visible, onClose, navigation, order }) => {
  useAuthRedirect()

  const handleContinue = () => {
    onClose();
   
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeTab' }],
    });
  };
  
  return (
    <Modal transparent visible={visible} animationType='fade' onRequestClose={onClose}>
        <View style={styles.onTopView}>
             <View style={styles.modalContainer}>
                <Image style={styles.modalIcon} source={require('../../assets/images/orderDone.png')} />
                <Text style={styles.title}>Thank you for your Booking</Text>

                    <View>
                        <Text style={styles.detailText}>Booking Number: {order?.orderNumber} </Text>
                        <Text style={styles.detailText}>Booking Date: {order?.orderDate}</Text>
                        <Text style={styles.detailText}>Booking Time: {order?.orderTime}</Text>
                    </View>

                    <Pressable style={styles.button} onPress={handleContinue}>
                        <Text style={styles.buttonText}>Book Another Test</Text>
                    </Pressable>
             </View>
        </View>

    </Modal>
  )
}

export default OrderSummary;
