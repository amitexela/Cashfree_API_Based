/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image
} from 'react-native';

import axios from 'axios';


const App = () => {
  const [totalAmount, setTotalAmount] = useState(5);
  const [orderToken, setOrderToken] = useState('');
  const [channel, setChannel] = useState('');
  const [upiIntent, setUpiIntent] = useState();

  // const [orderToken, setOrderToken] = useState('K845dkVgaoYvOKtcXntz');
  // const [channel, setChannel] = useState('link');
  // const [upiIntent, setUpiIntent] = useState({ "bhim": "https://payments-test.cashfree.com/pgbillpayuiapi/simulator/885681974?txnId=885681974&amount=1.00&pa=cashfree@testbank&pn=Cashfree&tr=885681974&am=1.00&cu=INR&mode=00&purpose=00&mc=5732&tn=Cashfree%20Simulator%20Payment", "default": "https://payments-test.cashfree.com/pgbillpayuiapi/simulator/885681974?txnId=885681974&amount=1.00&pa=cashfree@testbank&pn=Cashfree&tr=885681974&am=1.00&cu=INR&mode=00&purpose=00&mc=5732&tn=Cashfree%20Simulator%20Payment", "gpay": "https://payments-test.cashfree.com/pgbillpayuiapi/simulator/885681974?txnId=885681974&amount=1.00&pa=cashfree@testbank&pn=Cashfree&tr=885681974&am=1.00&cu=INR&mode=00&purpose=00&mc=5732&tn=Cashfree%20Simulator%20Payment", "paytm": "https://payments-test.cashfree.com/pgbillpayuiapi/simulator/885681974?txnId=885681974&amount=1.00&pa=cashfree@testbank&pn=Cashfree&tr=885681974&am=1.00&cu=INR&mode=00&purpose=00&mc=5732&tn=Cashfree%20Simulator%20Payment", "phonepe": "https://payments-test.cashfree.com/pgbillpayuiapi/simulator/885681974?txnId=885681974&amount=1.00&pa=cashfree@testbank&pn=Cashfree&tr=885681974&am=1.00&cu=INR&mode=00&purpose=00&mc=5732&tn=Cashfree%20Simulator%20Payment", "web": "https://sandbox.cashfree.com/pg/view/upi/qckrpm.K845dkVgaoYvOKtcXntz" });
  
  // const [orderToken, setOrderToken] = useState('cShCcVI5QEIAlbNrLDYX');
  // const [channel, setChannel] = useState('qrcode');
  // const [upiIntent, setUpiIntent] = useState({
  //   "qrcode": "data:image/png;base64,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"
  // });


  const createOrder = async () => {
    var data = JSON.stringify({
      "customer_details": {
        "customer_id": "7112AAA812234",             // payerId (PID)
        "customer_email": "johny@cashfree.com",     // payerEmail
        "customer_phone": "9908734801"              // payerPhone
      },
      "order_meta": {
        "notify_url": "https://webhook.site/0578a7fd-a0c0-4d47-956c-d02a061e36d3"
      },
      "order_amount": totalAmount,                 // payment amount
      "order_currency": "INR"            // payment currency
    });

    var config = {
      method: 'post',
      url: 'https://sandbox.cashfree.com/pg/orders',
      headers: {
        'Accept': 'application/json',
        'x-api-version': '2022-01-01',
        'Content-Type': 'application/json',
        'x-client-id': 'TEST2508600dd5e86f258119f5cc49068052',               // biller cashfree appId
        'x-client-secret': 'TEST19a32a360b26b348f2bb1336acdadc42b25c00a'     // biller cashfree secret key
      },
      data: data
    };
    // -------------- end
    const response = await axios(config);
    console.log('response', response.data.order_token, response.data.order_id);
    setOrderToken(response.data.order_token)
  };

  const linkIntent = async (channel) => {
    try {
      var data = JSON.stringify({
        "order_token": orderToken,
        "payment_method": {
          "upi": {
            "channel": channel,
            ...channel === 'collect' ? { "upi_id": "success@upi" } : null
          },
        }
      });
      console.log('data', data);
      var config = {
        method: 'post',
        url: 'https://sandbox.cashfree.com/pg/orders/pay',
        headers: {
          'Accept': 'application/json',
          'x-api-version': '2022-01-01',
          'Content-Type': 'application/json',
        },
        data: data
      };
      // -------------- end
      const response = await axios(config);
      console.log('response', response.data);
      setChannel(channel);
      setUpiIntent(response.data.data.payload);
    } catch (error) {
      console.log('error', error);
    }
  }


  const increaseTotalAmount = () => {
    setTotalAmount(previous => previous + 5)
  }

  const decreaseTotalAmount = () => {
    setTotalAmount(previous => previous - 5)
  }

  return (
    <SafeAreaView style={{ marginTop: 50 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ marginTop: 50 }}>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 30, textAlign: 'center' }}>Cashfree API based payment gateway</Text>
          <View style={{ marginTop: 50, flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ backgroundColor: 'green', padding: 10, margin: 10, borderRadius: 10 }}
              onPress={() => {
                decreaseTotalAmount()
              }}>
              <Text style={{ color: 'white', fontSize: 20 }}>{'-5'}</Text>
            </TouchableOpacity>
            <Text
              style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>Total Amount payable is {totalAmount} INR</Text>
            <TouchableOpacity
              style={{ backgroundColor: 'green', padding: 10, margin: 10, borderRadius: 10 }}
              onPress={() => {
                increaseTotalAmount()
              }}>
              <Text style={{ color: 'white', fontSize: 20 }}>+5</Text>
            </TouchableOpacity>
          </View>

          {/* Buttons */}
          <View style={{ marginTop: 50, flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              style={{ backgroundColor: 'green', padding: 10, margin: 10, borderRadius: 10 }}
              onPress={() => createOrder()}>
              <Text style={{ color: 'white', fontSize: 20 }}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* UPI intent */}
        {orderToken ? (
          <View style={{ marginTop: 50, flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              style={{ backgroundColor: 'green', padding: 10, margin: 10, borderRadius: 10 }}
              onPress={() => linkIntent('link')}>
              <Text style={{ color: 'white', fontSize: 20 }}>UPI Intent</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {upiIntent && channel === 'link' ? (
          <View style={{ marginTop: 50, flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              style={{ backgroundColor: 'green', padding: 10, margin: 10, borderRadius: 10 }}
              onPress={() => {
                console.log('upiIntent', { upiIntent });
                Linking.openURL(upiIntent['paytm']);
              }}>
              <Text style={{ color: 'white', fontSize: 20 }}>Paytm UPI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'green', padding: 10, margin: 10, borderRadius: 10 }}
              onPress={() => {
                console.log('upiIntent', { upiIntent });
                Linking.openURL(upiIntent['phonepe']);
              }}>
              <Text style={{ color: 'white', fontSize: 20 }}>PhonePay UPI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'green', padding: 10, margin: 10, borderRadius: 10 }}
              onPress={() => {
                console.log('upiIntent', { upiIntent });
                Linking.openURL(upiIntent['gpay']);
              }}>
              <Text style={{ color: 'white', fontSize: 20 }}>Gpay UPI</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Qr code */}
        {orderToken ? (
          <View style={{ marginTop: 50, flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              style={{ backgroundColor: 'green', padding: 10, margin: 10, borderRadius: 10 }}
              onPress={() => linkIntent('qrcode')}>
              <Text style={{ color: 'white', fontSize: 20 }}>QR code</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {upiIntent && channel === 'qrcode' ? (
          <View style={{ marginTop: 50, flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            {/* show base64 encoded image */}
            <Image
            source={{
              uri: upiIntent.qrcode
            }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        ) : null}

        {/* Collect */}
        {orderToken ? (
          <View style={{ marginTop: 50, flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              style={{ backgroundColor: 'green', padding: 10, margin: 10, borderRadius: 10 }}
              onPress={() => linkIntent('collect')}>
              <Text style={{ color: 'white', fontSize: 20 }}>Collect code</Text>
            </TouchableOpacity>
          </View>
        ) : null}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
