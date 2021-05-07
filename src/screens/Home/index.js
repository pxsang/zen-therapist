import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View, ScrollView, Platform} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Layout, Icon, Button} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';
import Header from '../../components/Header2';
import Text from '../../components/Text';

import ClientInfo from './components/ClientInfo';
import BottomInfo from './components/BottomInfo';
import CircularProgress from './components/CircularProgress';

import {STATUS} from '../../constants/Constants';

import {Value, set, useCode} from 'react-native-reanimated';
import {timing} from 'react-native-redash/lib/module/v1';
import theme from '../../constants/theme';

const Home = () => {
  const safeArea = useSafeAreaInsets();
  const progress = new Value(0);
  // useCode(() => set(progress, timing({ duration: 10000 })), [progress]);
  let [status, setStatus] = useState(STATUS.OFFLINE);
  let [position, setPosition] = useState({
    latitude: 10.7721095,
    longitude: 106.6982784,
  });
  let [error, setError] = useState();

  useCode(() => {
    if (status === STATUS.STARTED) {
      return set(progress, timing({ duration: 10000 }));
    }
  }, [status, progress]);

  // useEffect(() => {
  //   const watchId = Geolocation.watchPosition(
  //     pos => {
  //       setError();
  //       setPosition({
  //         latitude: pos.coords.latitude,
  //         longitude: pos.coords.longitude,
  //       });
  //     },
  //     e => {
  //       setError(e);
  //     },
  //     {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
  //   );

  //   return () => Geolocation.clearWatch(watchId);
  // }, []);

  useEffect(() => {
    let timeout;
    if (status === STATUS.ONLINE) {
      timeout = setTimeout(() => {
        setStatus(STATUS.WAITING_FOR_ACCEPT);
      }, 3000);
    }

    if (timeout && status !== STATUS.ONLINE) {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [status]);

  const handlePressCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      e => {
        // setError(e);
        console.log('error', e);
      },
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
  };

  const renderContent = () => {
    if (
      error &&
      (error.code === error.PERMISSION_DENIED ||
        error.code === error.POSITION_UNAVAILABLE)
    ) {
      return null;
    }

    switch (status) {
      case STATUS.OFFLINE:
      case STATUS.ONLINE:
      case STATUS.WAITING_FOR_ACCEPT:
      case STATUS.ACCEPTED: {
        return (
          <MapView
            style={styles.map}
            region={{
              latitude: position.latitude,
              longitude: position.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              coordinate={{
                latitude: position.latitude,
                longitude: position.longitude,
              }}>
              <Image
                style={{ width: 86, height: 86 }}
                source={require('../../assets/icons/location.png')}
              />
            </Marker>
            {/* <MapViewDirections
              origin={{
                latitude: 37.78825,
                longitude: -122.4324,
              }}
              destination={{
                latitude: 37.78825,
                longitude: -122.4324,
              }}
              apikey="AIzaSyAlzf6jfpUNdjoiYBxY8SMCZO09ZP3-wwg"
            /> */}
          </MapView>
        );
      }
      case STATUS.ARRIVED:
      case STATUS.STARTED:
        return (
          <View style={{ flex : 1, paddingHorizontal: 25, zIndex: -1 }}>
            <View style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 12,
              shadowColor: '#2699FB',
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 10,
              paddingTop: safeArea.top + (Platform.OS === 'android' ? 150 : 175)
            }}>
              <View style={{ flex: 1 }}>
                <Text bold center size={20} color={theme.color.primary}>START MASSAGE</Text>
                <View style={{ marginTop: 20 }}>
                  <CircularProgress progress={progress} />
                </View>
              </View>
            </View>
          </View>
        );
      default:
        return (
          <View style={{ flex : 1, zIndex: 99 }}>
            <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
              <Text size={12}>Complete</Text>
              <Text bold size={24}>Summary of Session</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10, }}>
              <View style={{ marginBottom: 20 }}>
                <ClientInfo
                  data={[{
                    label: 'Name of Client',
                    value: 'Cecilia Bolocco',
                  }, {
                    label: 'Type of Massage',
                    value: 'Swedish 120',
                  }]}
                />
              </View>
              <View style={{ marginBottom: 20 }}>
                <ClientInfo
                  data={[{
                    label: 'Name of Client',
                    value: '560,000d',
                  }, {
                    label: 'Tip to Therapist',
                    value: '50,000d',
                  }]}
                />
              </View>
              <View style={{ marginBottom: 20 }}>
                <View style={{
                  backgroundColor: 'white',
                  borderRadius: 12,
                  padding: 20,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 5,
                }}>
                  <View style={[theme.block.rowMiddleCenter, theme.block.marginBottom(10)]}>
                    <Image style={{ width: 24, height: 24, marginHorizontal: 2.5, resizeMode: 'contain' }} source={require('../../assets/icons/rating.png')} />
                    <Image style={{ width: 24, height: 24, marginHorizontal: 2.5, resizeMode: 'contain' }} source={require('../../assets/icons/rating.png')} />
                    <Image style={{ width: 24, height: 24, marginHorizontal: 2.5, resizeMode: 'contain' }} source={require('../../assets/icons/rating.png')} />
                    <Image style={{ width: 24, height: 24, marginHorizontal: 2.5, resizeMode: 'contain' }} source={require('../../assets/icons/rating.png')} />
                  </View>
                  <Text center>Cecilia Bolocco</Text>
                  <View style={styles.buttonContainer}>
                    <Button style={styles.button} onPress={() => setStatus(STATUS.ONLINE)}>Rate Client</Button>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        );
    }
  };

  const renderClientInfo = () => {
    // {[
    //   STATUS.WAITING_FOR_ACCEPT,
    //   STATUS.ACCEPTED,
    //   STATUS.ARRIVED,
    //   STATUS.STARTED,
    // ].includes(status) ? (
    //   <View style={{
    //     ...StyleSheet.absoluteFillObject,
    //     top: safeArea.top + 75,
    //     left: 0,
    //     right: 0,
    //     zIndex: 99,
    //     paddingHorizontal: 20,
    //   }}>
    //     <ClientInfo />
    //   </View>
    // ) : null}

    switch (status) {
      case STATUS.WAITING_FOR_ACCEPT:
        return (
          <View style={{
            ...StyleSheet.absoluteFillObject,
            top: safeArea.top + 75,
            left: 0,
            right: 0,
            zIndex: 99,
            paddingHorizontal: 20,
          }}>
            <ClientInfo
              data={[{
                label: '195/3 Dien Bien Phu, Binh Thanh District, HCMC',
                value: 'Hong Bang University',
              }, {
                label: '18b/12 Nguyen Thi Minh Khai, Dakao Ward, District 1',
                value: '18b/12 Nguyen Thi Minh Khai',
              }]}
            />
          </View>
        );
      case STATUS.ACCEPTED:
      case STATUS.ARRIVED:
      case STATUS.STARTED:
        return (
          <View style={{
            ...StyleSheet.absoluteFillObject,
            top: safeArea.top + 75,
            left: 0,
            right: 0,
            zIndex: 99,
            paddingHorizontal: 20,
          }}>
            <ClientInfo
              data={[{
                label: 'Name of Client',
                value: 'Cecilia Bolocco',
              }, {
                label: 'Type of Massage',
                value: 'Swedish 120',
              }]}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Layout style={styles.container}>
      <Header />
      {renderClientInfo()}
      {renderContent()}
      <BottomInfo
        error={error}
        status={status}
        onStatusChange={newValue => setStatus(newValue)}
        onPressCurrentLocation={handlePressCurrentLocation}
      />
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 9,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    marginTop: 15,
  },
  button: {
    height: 40,
    borderRadius: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
});
