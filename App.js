import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Picker, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Button } from 'react-native-paper';

export default function App() {
  const locateData = [
    {
      "nameCity": "Москва",
      "cityLatitude": 55.755814,
      "cityLongitude": 37.617635,
      "cityPopulation": "12 632 409",
      "cityLatitudeDelta": 0.15,
      "cityLongitudeDelta": 0.121,
    },
    {
      "nameCity": "Санкт-Петербург",
      "cityLatitude": 59.93034474907765, 
      "cityLongitude": 30.360147577228727,
      "cityPopulation": "5 376 672",
      "cityLatitudeDelta": 0.35,
      "cityLongitudeDelta": 0.321,
    },
    {
      "nameCity": "Сочи",
      "cityLatitude": 43.6005191784955, 
      "cityLongitude": 39.73559855686555,
      "cityPopulation": "432 322",
      "cityLatitudeDelta": 0.15,
      "cityLongitudeDelta": 0.121,
    },
    {
      "nameCity": "Южно-Сахалинск",
      "cityLatitude": 46.964099756718994,
      "cityLongitude": 142.72819187141334,
      "cityPopulation": "200 235",
      "cityLatitudeDelta": 0.35,
      "cityLongitudeDelta": 0.321,
    },
    {
      "nameCity": "Ярославль",
      "cityLatitude": 57.62602768516908,
      "cityLongitude": 39.879736522101325,
      "cityPopulation": "601 403",
      "cityLatitudeDelta": 0.25,
      "cityLongitudeDelta": 0.221,
    }
  ]
  
  const [city, setCity] = useState('0');
  const [isModalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  return (
    <View style={styles.container}>
      
      <Modal transparent visible={isModalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalMessage}>{locateData[city].nameCity}: Численность населения города составляет
              <Text style={{fontWeight: 'bold'}}> {locateData[city].cityPopulation} </Text> 
              человек
            </Text>
            <View style={styles.modalEsc}>
              <Button onPress={toggleModal}>
                <Text style={{color: '#666'}}>
                  отменить
                </Text> 
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.containerTop}>
        <Text style={styles.textHeader}>Map demo page</Text>
        <Picker
          selectedValue={city}
          style = {styles.pickerCity}
          onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
        >
          <Picker.Item label="Москва" value="0" />
          <Picker.Item label="Санкт-Петербург" value="1" />
          <Picker.Item label="Сочи" value="2" />
          <Picker.Item label="Южно-Сахалинск" value="3" />
          <Picker.Item label="Ярославль" value="4" />
        </Picker>
      </View>
      <View style={styles.containerMap}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style = {styles.map}
          loadingEnabled = {true}
          region = {{
            latitude: locateData[city].cityLatitude,
            longitude: locateData[city].cityLongitude,
            latitudeDelta: locateData[city].cityLatitudeDelta,
            longitudeDelta: locateData[city].cityLongitudeDelta
          }}
        >
          <Marker 
            coordinate={{
              latitude: locateData[city].cityLatitude,
              longitude: locateData[city].cityLongitude,
            }}
            onPress = {toggleModal}
          />

        </MapView>

      </View>
      <View style={styles.containerBot}>
        <Text style={styles.textFooter}>
          © Designed by Nguyen Quy Thanh from Vietnam
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center'
    // justifyContent: 'center',
    // backgroundColor: 'red'
  },
  containerTop: {
    flex: 1.5,
    paddingTop: 30,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerMap: {
    flex: 8,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    width: '95%',
    // borderColor: 'green',
    // borderWidth: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

  },
  containerBot: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  textFooter: {
    fontSize: 12,
  },
  pickerCity: {
    height: 60, 
    width: '90%',
  },
  map: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  //---------------MODAL------------------------
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 20,
  },
  modalMessage: {
    marginVertical: 5,
    fontSize: 16
  },
  modalEsc: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
