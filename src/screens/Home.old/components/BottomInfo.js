import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Image, StyleSheet, Platform, Linking} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Modalize} from 'react-native-modalize';
import TrackPlayer, { useTrackPlayerEvents, TrackPlayerEvents, STATE_PLAYING } from 'react-native-track-player';
import {Button, Icon} from '@ui-kitten/components';
import Text from '../../../components/Text';
import theme from '../../../constants/theme';

import Offline from './Offline';
import Online from './Online';
import WaitingForAccept from './WaitingForAccept';
import Accepted from './Accepted';
import Arrived from './Arrived';
import Started from './Started';

import {STATUS} from '../../../constants/Constants';

const NextIcon = (props) => (
  <Icon {...props} name='skip-forward' fill={theme.color.primary} style={{ width: 32, height: 32 }} />
);
const PrevIcon = (props) => (
  <Icon {...props} name='skip-back' fill={theme.color.primary} style={{ width: 32, height: 32 }}/>
);
const BackWardsIcon = (props) => (
  <Icon {...props} name='rewind-left'/>
);
const FastwardsIcon = (props) => (
  <Icon {...props} name='rewind-right'/>
);
const PlayIcon = (props) => (
  <Icon {...props} name='play-circle' fill={theme.color.primary} style={{ width: 44, height: 44 }} />
);
const PauseIcon = (props) => (
  <Icon {...props} name='pause-circle' fill={theme.color.primary} style={{ width: 44, height: 44 }} />
);

const trackPlayerInit = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add([{
    id: '1',
    url: require('../../../assets/music/lon-xon-2.mp3'),
    type: 'default',
    title: 'Lộn xộn 2',
    album: 'Relax',
    artist: 'Đen',
    artwork: require('../../../assets/images/lon-xon-2.jpeg'),
  }, {
    id: '2',
    url: require('../../../assets/music/di-ve-nha.mp3'),
    type: 'default',
    title: 'Đi về nhà',
    album: 'Relax',
    artist: 'Đen',
    artwork: require('../../../assets/images/di-ve-nha.jpeg'),
  }, {
    id: '2',
    url: require('../../../assets/music/bai-nay-chill-phet.mp3'),
    type: 'default',
    title: 'Bài này chill phết',
    album: 'Relax',
    artist: 'Đen',
    artwork: require('../../../assets/images/bai-nay-chill-phet.jpeg'),
  }]);

  return true;
};

const BottomInfo = ({status, onStatusChange, error, onPressCurrentLocation}) => {
  const safeArea = useSafeAreaInsets();
  const { top, bottom } = safeArea;
  const modalizeRef = useRef(null);

  const UserState = useSelector(state => state.User);
  const { userInfo } = UserState;

  const [playerState, setPlayerState] = useState(null)
  let [isPlaying, setIsPlaying] = useState(false);
  let [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  // useEffect(() => {
  //   TrackPlayer.setupPlayer().then(response => console.log('respoinse', response));
  // }, []);

  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
    if (event.state === STATE_PLAYING) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  });

  useEffect(() => {
    const startPlayer = async () => {
      let isInit = await trackPlayerInit();
      setIsTrackPlayerInit(isInit);
    };

    startPlayer();
  }, []);

  const start = async () => {
    await TrackPlayer.play();
  };

  const pause = async () => {
    await TrackPlayer.pause();
  };

  const next = async () => {
    await TrackPlayer.skipToNext();
  };

  const prev = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const handleTurnOnGPS = useCallback(async () => {
    // Open the custom settings if the app has one
    await Linking.openSettings();
  }, []);

  const getModalHeight = () => {
    const extendHeight = Platform.OS === 'android' ? 64 : 0;

    if (
      error &&
      (error.code === error.PERMISSION_DENIED ||
        error.code === error.POSITION_UNAVAILABLE)
    ) {
      return 330;
    }

    switch (status) {
      case STATUS.ACCEPTED:
        return 290 + extendHeight;
      case STATUS.ARRIVED:
      case STATUS.STARTED:
        return 170 + extendHeight;
      default:
        // return 220;
        return 245 + extendHeight;
    }
  };

  const getAlwaysOpenHeight = () => {
    const extendHeight = Platform.OS === 'android' ? 64 : 0;

    if (
      error &&
      (error.code === error.PERMISSION_DENIED ||
        error.code === error.POSITION_UNAVAILABLE)
    ) {
      return 330;
    }

    switch (status) {
      case STATUS.WAITING_FOR_ACCEPT:
        return 240 + extendHeight;
      case STATUS.ACCEPTED:
        return 290 + extendHeight;
      case STATUS.ARRIVED:
      case STATUS.STARTED:
        return 170 + extendHeight;
      default:
        return 140 + extendHeight;
    }
  };

  const renderModalContent = () => {
    if (
      error &&
      (error.code === error.PERMISSION_DENIED ||
        error.code === error.POSITION_UNAVAILABLE)
    ) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text bold size={24}>
            Enable Location
          </Text>
          <Image source={require('../../../assets/images/enable-location.png')} style ={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
            marginVertical: 15,
          }} />
          <Text style={{
            textAlign: 'center',
          }}>
            We need to know your location in order to suggest nearby services.
          </Text>
          <View style={{ flex: 1, width: '100%', marginTop: 15, }}>
            <Button style={styles.button} onPress={handleTurnOnGPS}>Enable</Button>
          </View>
        </View>
      );
    }

    let component;
    switch (status) {
      case STATUS.OFFLINE:
        component = <Offline userInfo={userInfo} onStatusChange={() => onStatusChange(STATUS.ONLINE)} />;
        break;
      case STATUS.ONLINE:
        component = <Online />;
        break;
      case STATUS.WAITING_FOR_ACCEPT:
        component = <WaitingForAccept status={status} onStatusChange={updatedStatus => onStatusChange(updatedStatus)} />;
        break;
      case STATUS.ACCEPTED:
        component = <Accepted onStatusChange={updatedStatus => onStatusChange(updatedStatus)} />;
        break;
      case STATUS.ARRIVED:
        component = <Arrived onStatusChange={() => onStatusChange(STATUS.STARTED)} />;
        break;
      case STATUS.STARTED:
        component = <Started onStatusChange={() => onStatusChange(STATUS.COMPLETED)} />;
        break;
      default:
        break;
    }

    return component;
  };

  const renderHeader = () => {
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
      case STATUS.ACCEPTED:
        return (
          <View style={[styles.headerContainer, Platform.OS === 'ios' ? styles.headerContainerIOS : styles.headerContainerAndroid]}>
            <View style={theme.block.rowMiddleCenter}>
              <View style={{ flex: 1 }} />
              <View style={{ flex: 1, alignItems: 'center' }}>
                {status === STATUS.ONLINE ? (
                  <View style={styles.btnStopContainer}>
                    <Button
                      appearance="outline"
                      style={styles.btnStop}
                      onPress={() => onStatusChange(STATUS.OFFLINE)}>
                      <Text center bold size={12} color={Platform.OS === 'ios' ? '#DF2F45' : 'white'}>
                        Stop
                      </Text>
                    </Button>
                  </View>
                ) : null}
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                <Button
                  style={styles.btnAim}
                  appearance="filled"
                  accessoryLeft={() => (
                    <Image
                      style={styles.iconAim}
                      source={require('../../../assets/icons/aim.png')}
                    />
                  )}
                  onPress={onPressCurrentLocation}
                />
              </View>
            </View>
          </View>
        );
      default:
        return (
          <View style={[
            styles.headerPlayerContainer,
            Platform.OS === 'ios' ? styles.headerPlayerContainerIOS : styles.headerPlayerContainerAndroid,
            ]}>
            <View style={[theme.block.rowMiddleCenter, {
              flex: 1,
            }]}>
              {/* <Button
                appearance="ghost"
                accessoryLeft={BackWardsIcon}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  marginHorizontal: 5,
                }}
              /> */}
              <Button
                appearance="ghost"
                accessoryLeft={PrevIcon}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  marginHorizontal: 15,
                }}
                onPress={() => prev()}
              />
              <Button
                // accessoryLeft={() => (
                //   <Image
                //     source={require('../../../assets/icons/pause.png')}
                //     style={{ width: 14, resizeMode: 'contain' }}
                //   />
                // )}
                accessoryLeft={isPlaying ? PauseIcon : PlayIcon}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: 'white',
                  borderColor: 'white',
                }}
                onPress={() => isPlaying ? pause() : start()}
              />
              <Button
                appearance="ghost"
                accessoryLeft={NextIcon}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  marginHorizontal: 15,
                }}
                onPress={() => next()}
              />
              {/* <Button
                appearance="ghost"
                accessoryLeft={FastwardsIcon}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  marginHorizontal: 5,
                }}
              /> */}
            </View>
          </View>
        );
    }
  };

  if (status === STATUS.COMPLETED) return null;

  return (
    // <Modalize
    //   ref={modalizeRef}
    //   overlayStyle={styles.overlay}
    //   childrenStyle={[styles.children, {paddingBottom: safeArea.bottom}]}
    //   rootStyle={styles.root}
    //   handleStyle={styles.handle}
    //   modalHeight={getModalHeight()}
    //   handlePosition={Platform.OS === 'ios' ? 'inside' : 'outside'}
    //   alwaysOpen={getAlwaysOpenHeight()}
    //   scrollViewProps={{
    //     bounces: true,
    //     showsVerticalScrollIndicator: false,
    //   }}
    //   HeaderComponent={renderHeader()}
    //   onOverlayPres={() => console.log('overlay clickj')}
    // >
    //   {renderModalContent()}
    // </Modalize>
    <View style={{
      footer: safeArea => ({
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingBottom: safeArea.bottom + 20,
      }),
    }}>
      <Text>1231232</Text>
    </View>
  );
};

export default BottomInfo;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 25,
  },
  overlay: {
    backgroundColor: 'transparent',
  },
  children: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  handle: {
    backgroundColor: '#C3CDD6',
    width: 134,
    height: 3,
  },
  headerContainer: {
    height: 64,
    paddingHorizontal: Platform.OS === 'android' ? 10 : 0,
  },
  headerPlayerContainer: {
    height: 64,
    paddingHorizontal: Platform.OS === 'android' ? 10 : 0,
  },
  headerContainerIOS: {
    position: 'absolute',
    top: -84,
    left: 0,
    right: 0,
  },
  headerPlayerContainerIOS: {
    position: 'absolute',
    flex: 1,
    zIndex: 99,
    backgroundColor: '#8F68BC',
    left: -23,
    right: -23,
    top: -75,
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    shadowColor: '#8F68BC',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  headerContainerAndroid: {
    justifyContent: 'center',
    borderBottomColor: theme.color.border,
    borderBottomWidth: 1,
  },
  headerPlayerContainerAndroid: {
    backgroundColor: '#8F68BC',
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
  },
  btnStopContainer: {
    width: Platform.OS === 'ios' ? 64 : 56,
    height: Platform.OS === 'ios' ? 64 : 56,
    borderRadius: Platform.OS === 'ios' ? 32 : 28,
    borderWidth: 0,
    backgroundColor: Platform.OS === 'ios' ? 'white' : '#DF2F45',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  btnStop: {
    width: Platform.OS === 'ios' ? 56 : 48,
    height: Platform.OS === 'ios' ? 56 : 48,
    borderRadius: Platform.OS === 'ios' ? 28 : 24,
    backgroundColor: Platform.OS === 'ios' ? 'white' : '#DF2F45',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: Platform.OS === 'ios' ? '#DF2F45' : 'white',
    borderWidth: 1,
  },
  btnAim: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    borderColor: Platform.OS === 'ios' ? 'white' : '#58BE3F',
  },
  iconAim: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
