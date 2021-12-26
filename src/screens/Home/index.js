import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  PermissionsAndroid,
  Linking,
  Dimensions,
  Alert,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import _ from 'underscore';
import MapViewDirections from 'react-native-maps-directions';
import firestore from '@react-native-firebase/firestore';
import {Layout, Button, Icon} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import Header from '../../components/Header2';
import Text from '../../components/Text';
import Image from '../../components/Image';
import CircularProgress from '../../components/CircularProgress';
import ClientInfo from '../../components/ClientInfo';
import {useDispatch, useSelector} from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import {
  STATUS,
  USER_SESSION_STATUS,
  SESSION_STATUS,
  SESSION_STATUS_ENUM,
  USER_STATUS,
} from '../../constants/Constants';

import RequestLocation from './components/RequestLocation';
import UnVerifiedUser from './components/UnVerifiedUser';
import Offline from './components/Offline';
import Online from './components/Online';
import WaitingForAccept from './components/WaitingForAccept';
import Accepted from './components/Accepted';
import Arrived from './components/Arrived';
import Started from './components/Started';

import {Value, set, useCode} from 'react-native-reanimated';
import {timing} from 'react-native-redash/lib/module/v1';
import theme from '../../constants/theme';
import MusicPlayer from './components/MusicPlayer';
import CompletedSession from './components/CompletedSession';
import {online, offline, startSession} from '../../redux/actions/user';
import useInterval from '../../helpers/useInterval';

import {
  getSession,
  accept,
  reject,
  arrive,
  start,
  finish,
  // complete,
  completed,
  completedAndRating,
  cancelled,
  clean,
} from '../../redux/actions/session';
import t from '../../i18n';

// Geocoder.init('AIzaSyAZwqGkoSCTukzpJr5NzBilCrKGajIU92A');

const {width, height} = Dimensions.get('screen');

const Home = () => {
  // const progress = new Value(0);
  const safeArea = useSafeAreaInsets();
  const dispatch = useDispatch();
  const UserState = useSelector(state => state.User);
  const SessionState = useSelector(state => state.Session);
  const {userInfo} = UserState;
  const {detail: sessionDetail} = SessionState;

  console.log('session detail', sessionDetail);
  let [status, setStatus] = useState(STATUS.OFFLINE);

  const watchId = useRef(null);

  let [position, setPosition] = useState();
  let [isLocationError, setLocationError] = useState();

  // useCode(() => {
  //   if (status === STATUS.STARTED) {
  //     return set(
  //       progress,
  //       timing({
  //         duration: sessionDetail.request_services[0].duration * 60 * 1000,
  //       }),
  //     );
  //   }
  // }, [status, progress, sessionDetail]);

  const getCurrentProgress = useCallback(() => {
    if (!sessionDetail || sessionDetail.status !== SESSION_STATUS.STARTED) {
      return 0;
    }

    const sessionDuration =
      sessionDetail.request_services[0].duration * 60 * 1000;

    const delta = new Date().getTime() - sessionDetail.started_at;

    return delta / sessionDuration;
  }, [sessionDetail]);

  let progress = new Value(getCurrentProgress());

  useEffect(() => {
    progress.setValue(getCurrentProgress());
  }, [getCurrentProgress, progress]);

  useEffect(() => {
    return () => {
      removeLocationUpdates();
    };
  }, [removeLocationUpdates]);

  useEffect(() => {
    let remainingIntervalId;

    if (status === STATUS.STARTED) {
      remainingIntervalId = setInterval(() => {
        const currentProgress = getCurrentProgress();
        progress.setValue(currentProgress);
      }, 60 * 1000);
    } else {
      clearInterval(remainingIntervalId);
    }

    return () => clearInterval(remainingIntervalId);
  }, [status, progress, sessionDetail, getCurrentProgress]);

  useEffect(() => {
    if (userInfo.session_status === USER_SESSION_STATUS.ONLINE) {
      setStatus(STATUS.ONLINE);
    } else {
      setStatus(STATUS.OFFLINE);
    }
  }, [userInfo.session_status]);

  // SKIP DIRECTIONS
  useEffect(() => {
    const tracking = () => {
      firestore()
        .collection('sessions')
        .doc(sessionDetail.id.toString())
        .set({
          therapist_lat: position?.latitude,
          therapist_long: position?.longitude,
        })
        .then(() => {
          console.log('Tracked!');
        });
    };

    if (status === STATUS.ACCEPTED) {
      tracking();
    }
  }, [status, position, sessionDetail]);

  useEffect(() => {
    console.log('userInfo.code', userInfo.code);
    const subscriber = firestore()
      .collection('therapists')
      .doc(userInfo.code)
      .onSnapshot(snapshot => {
        if (snapshot) {
          const data = snapshot.data();
          console.log('data', data);

          if (_.isEmpty(data) || (!data.assign_session && !data.customer_id)) {
            dispatch(clean());
            return;
          }

          if (data.assign_session) {
            console.log('data.assign_session', data.assign_session);
            if (
              !sessionDetail ||
              sessionDetail.id !== data.assign_session ||
              sessionDetail.last_updated_at < data.last_updated_at
            ) {
              dispatch(getSession(data));
            }
          } else if (
            sessionDetail &&
            data.status === SESSION_STATUS.CANCELED &&
            data.last_updated_at > sessionDetail.last_updated_at
          ) {
            Alert.alert(
              'Khách hàng đã hủy dịch vụ!',
              'Tiếp tục tìm kiếm khách hàng khác.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    dispatch(cancelled());
                    if (
                      userInfo.session_status !== USER_SESSION_STATUS.ONLINE
                    ) {
                      dispatch(online());
                    } else {
                      setStatus(STATUS.ONLINE);
                    }
                  },
                },
              ],
            );
          }
        }
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [dispatch, sessionDetail, userInfo.code]);

  useEffect(() => {
    if (!_.isEmpty(sessionDetail)) {
      switch (sessionDetail.status) {
        case SESSION_STATUS.WAITING_FOR_THERAPIST:
          setStatus(STATUS.WAITING_FOR_ACCEPT);
          break;
        case SESSION_STATUS.ACCEPTED:
          setStatus(STATUS.ACCEPTED);
          break;
        case SESSION_STATUS.REJECTED:
          dispatch(offline());
          // setStatus(STATUS.OFFLINE);
          break;
        case SESSION_STATUS.ARRIVED:
          setStatus(STATUS.ARRIVED);
          break;
        case SESSION_STATUS.STARTED:
          setStatus(STATUS.STARTED);
          break;
        case SESSION_STATUS.FINISHED:
          setStatus(STATUS.FINISHED);
          break;
        case SESSION_STATUS.COMPLETED:
          if (userInfo.session_status === USER_SESSION_STATUS.ONLINE) {
            setStatus(STATUS.ONLINE);
          } else {
            setStatus(STATUS.OFFLINE);
          }
          // setStatus(STATUS.ONLINE);
          break;
        case SESSION_STATUS.CANCELED:
          // dispatch(online());
          break;
        default:
          // setStatus(STATUS.OFFLINE);
          break;
      }
    }
  }, [sessionDetail]);

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

  // useEffect(() => {
  //   if (!_.isEmpty(position)) {
  //     // Geocoder.from(position).then(response => {
  //     //   console.log('Geocoder', response);
  //     // });
  //   }
  // }, [position, dispatch]);

  const hasPermissionIOS = async () => {
    const locationServiceStatus = await Geolocation.requestAuthorization(
      'whenInUse',
    );

    if (locationServiceStatus === 'granted') {
      return true;
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const locationServiceStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (locationServiceStatus === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      const hasPermission = await hasLocationPermission();

      if (!hasPermission) {
        setLocationError(true);
      } else {
        getOneTimeLocation();
        subscribeLocationLocation();
      }
    };

    requestLocationPermission();
  }, []);

  const getOneTimeLocation = () => {
    // setLocationStatus(LOCATION_STATUS.REQUESTING);
    Geolocation.getCurrentPosition(
      pos => {
        console.log('getOneTimeLocation', pos);
        setLocationError(false);
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        dispatch(startSession(pos.coords.latitude, pos.coords.longitude));
      },
      error => {
        console.log('getOneTimeLocation error', error);
        setLocationError(true);
        // if (error.code === error.PERMISSION_DENIED) {
        //   setRequestLocationButtonType('request');
        // } else {
        //   setRequestLocationButtonType('retry');
        // }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchId.current = Geolocation.watchPosition(
      position => {
        console.log('subscribeLocationLocation', position);
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        fastestInterval: 2000,
      },
    );
  };

  const removeLocationUpdates = useCallback(() => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }, []);

  const handleTurnOnGPS = async () => {
    await Linking.openSettings();
  };

  const handleReject = useCallback(() => {
    dispatch(reject(sessionDetail.id));
    dispatch(offline());
  }, [dispatch, sessionDetail]);

  const renderFooterContent = () => {
    if (isLocationError) {
      return <RequestLocation onPress={handleTurnOnGPS} />;
    }

    if (userInfo.status !== USER_STATUS.VERIFIED) {
      return <UnVerifiedUser userStatus={userInfo.status} />;
    }

    switch (status) {
      case STATUS.OFFLINE:
        return (
          <Offline
            userInfo={userInfo}
            onOnline={() => {
              dispatch(online());
            }}
          />
        );
      case STATUS.ONLINE:
        return <Online />;
      case STATUS.WAITING_FOR_ACCEPT:
        return (
          <WaitingForAccept
            sessionDetail={sessionDetail}
            status={status}
            onAccept={() => dispatch(accept(sessionDetail.id))}
            onReject={handleReject}
          />
        );
      case STATUS.ACCEPTED:
        return (
          <Accepted
            sessionDetail={sessionDetail}
            onArrive={() => dispatch(arrive(sessionDetail.id))}
            onReject={handleReject}
          />
        );
      case STATUS.ARRIVED:
        return (
          <Arrived
            sessionDetail={sessionDetail}
            onStart={() => dispatch(start(sessionDetail.id))}
          />
        );
      case STATUS.STARTED:
        return (
          <Started
            sessionDetail={sessionDetail}
            onFinish={() => {
              TrackPlayer.stop();
              dispatch(finish(sessionDetail.id));
            }}
          />
        );
      default:
        break;
    }
  };

  const renderExtendActions = () => {
    if (isLocationError || userInfo.status !== USER_STATUS.VERIFIED)
      return null;

    switch (status) {
      case STATUS.OFFLINE:
      case STATUS.ONLINE:
      case STATUS.WAITING_FOR_ACCEPT:
      case STATUS.ACCEPTED:
        return (
          <View style={styles.extendActionsContainer}>
            <View style={styles.extendActionsContent}>
              <View style={styles.extendAction} />
              <View style={styles.extendAction}>
                {status === STATUS.ONLINE ? (
                  <View style={styles.btnStopContainer}>
                    <Button
                      appearance="outline"
                      style={styles.btnStop}
                      onPress={() => dispatch(offline())}>
                      <Text center bold size={11} color="#DF2F45">
                        {t('stop')}
                      </Text>
                    </Button>
                  </View>
                ) : null}
              </View>
              <View style={[styles.extendAction, styles.actionAim]}>
                <Button
                  style={styles.btnAim}
                  appearance="filled"
                  accessoryLeft={() => (
                    <Image
                      style={styles.iconAim}
                      source={require('../../assets/icons/aim.png')}
                    />
                  )}
                  onPress={() => {
                    setPosition({
                      latitude: position.latitude,
                      longitude: position.longitude,
                    });
                  }}
                />
              </View>
            </View>
          </View>
        );

      case STATUS.ARRIVED:
      case STATUS.STARTED:
        return <MusicPlayer />;

      default:
        return null;
    }
  };

  const renderContent = () => {
    if (
      _.isEmpty(position) ||
      isLocationError ||
      userInfo.status !== USER_STATUS.VERIFIED
    ) {
      return <View style={styles.content} />;
    }

    switch (status) {
      case STATUS.OFFLINE:
      case STATUS.ONLINE:
      case STATUS.WAITING_FOR_ACCEPT:
      case STATUS.ACCEPTED:
        return (
          <View style={styles.content}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                ...position,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              <Marker coordinate={position}>
                <Icon
                  name="pin"
                  fill={theme.color.link}
                  style={{width: 40, height: 40}}
                />
              </Marker>
              {(status === STATUS.ACCEPTED ||
                status === STATUS.WAITING_FOR_ACCEPT) && (
                <>
                  <Marker
                    coordinate={{
                      latitude: sessionDetail?.client_lat,
                      longitude: sessionDetail?.client_long,
                    }}>
                    <Icon
                      name="pin"
                      fill={theme.color.error}
                      style={{width: 40, height: 40}}
                    />
                  </Marker>
                  <MapViewDirections
                    origin={position}
                    destination={{
                      latitude: sessionDetail?.client_lat,
                      longitude: sessionDetail?.client_long,
                    }}
                    mode="DRIVING"
                    strokeWidth={4}
                    strokeColor={theme.color.primary}
                    apikey="AIzaSyB8NQbCQbLY7CSK9GBNyzzRPzbr_6s6xVg"
                  />
                </>
              )}
            </MapView>
          </View>
        );
      case STATUS.ARRIVED:
      case STATUS.STARTED:
        return (
          <View style={styles.content}>
            <ScrollView contentContainerStyle={styles.startMassageContent}>
              <View>
                <Text bold center size={18} color={theme.color.primary}>
                  {t('start_massage')}
                </Text>
                <View height={15} />
                <View>
                  <CircularProgress progress={progress} />
                </View>
                <View height={20} />
                <View>
                  <Button
                    status="danger"
                    onPress={() => console.log('Emergency / Report')}>
                    {t('emergency_report')}
                  </Button>
                </View>
              </View>
            </ScrollView>
          </View>
        );
      default:
        return (
          <CompletedSession
            sessionDetail={sessionDetail}
            onComplete={() => {
              dispatch(completed(sessionDetail.id));
              dispatch(online());
            }}
            onRating={rating => {
              dispatch(completedAndRating(sessionDetail.id, rating));
              dispatch(online());
            }}
          />
        );
    }
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer(safeArea)}>
        {renderExtendActions()}
        {renderFooterContent()}
      </View>
    );
  };

  const renderClientInfo = () => {
    const HIDDEN_STATUS_LIST = [STATUS.ONLINE, STATUS.OFFLINE, STATUS.FINISHED];
    if (HIDDEN_STATUS_LIST.includes(status)) {
      return null;
    }

    let data;
    switch (status) {
      case STATUS.WAITING_FOR_ACCEPT:
        data = [
          {
            label: 'Địa chỉ Khách hàng',
            value: sessionDetail?.client_address,
          },
          {
            label: t('type_of_massage'),
            value: sessionDetail?.request_services[0]?.group_service_name,
          },
        ];
        break;
      case STATUS.ACCEPTED:
      case STATUS.ARRIVED:
      case STATUS.STARTED:
        data = [
          {
            label: t('name_of_client'),
            value: sessionDetail?.customer?.name,
          },
          {
            label: t('type_of_massage'),
            value: sessionDetail?.request_services[0]?.group_service_name,
          },
        ];
        break;
      default:
        break;
    }

    return (
      <View style={styles.clientInfoContainer(safeArea)}>
        <ClientInfo data={data} />
      </View>
    );
  };

  console.log('position', position);

  return (
    <Layout style={styles.container}>
      <Header />
      {renderClientInfo()}
      {renderContent()}
      {renderFooter()}
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  footer: safeArea => ({
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: safeArea.bottom || 15,
  }),
  backContainer: {
    // position: 'absolute',
    // top: -70,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 28,
    height: 28,
  },
  btnStopContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 0,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  btnStop: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'white',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#DF2F45',
    borderWidth: 1,
  },
  btnAim: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    borderColor: 'white',
  },
  iconAim: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  clientInfoContainer: safeArea => ({
    position: 'absolute',
    top: safeArea.top + 75,
    left: 0,
    right: 0,
    zIndex: 99,
    paddingHorizontal: 20,
  }),
  extendActionsContainer: {
    position: 'absolute',
    top: -80,
    left: 0,
    right: 0,
  },
  extendActionsContent: {
    height: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  extendAction: {
    flex: 1,
    alignItems: 'center',
  },
  actionAim: {
    alignItems: 'flex-end',
  },
  locationIcon: {
    width: 86,
    height: 86,
  },
  startMassageContent: {
    flex: 1,
    backgroundColor: 'white',
    shadowColor: '#2699FB',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    paddingTop: 200,
    paddingHorizontal: 20,
  },
});
