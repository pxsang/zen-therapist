import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Button} from '@ui-kitten/components';
import TrackPlayer, {
  useTrackPlayerEvents,
  TrackPlayerEvents,
  STATE_PLAYING,
} from 'react-native-track-player';
import theme from '../../../constants/theme';

const NextIcon = props => (
  <Icon
    {...props}
    name="skip-forward"
    fill={theme.color.primary}
    style={{width: 32, height: 32}}
  />
);

const PrevIcon = props => (
  <Icon
    {...props}
    name="skip-back"
    fill={theme.color.primary}
    style={{width: 32, height: 32}}
  />
);

const PlayIcon = props => (
  <Icon
    {...props}
    name="play-circle"
    fill={theme.color.primary}
    style={{width: 44, height: 44}}
  />
);
const PauseIcon = props => (
  <Icon
    {...props}
    name="pause-circle"
    fill={theme.color.primary}
    style={{width: 44, height: 44}}
  />
);

const trackPlayerInit = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add([
    {
      id: '1',
      url: 'http://159.89.196.6:4566/therapist-bucket/music/zen_01.mp3',
      type: 'default',
      title:
        '01 Zen Meditation Music Nature Sounds, Relaxing Music, Calming Music, Healing Music',
      album: 'Zen Relax',
      artist: 'Zen',
      artwork: require('../../../assets/images/zen-therapist.png'),
    },
    {
      id: '2',
      url: 'http://159.89.196.6:4566/therapist-bucket/music/zen_02.mp3',
      type: 'default',
      title: '02 Zen Oriental Meditation Music, Stress Relief',
      album: 'Zen Relax',
      artist: 'Zen',
      artwork: require('../../../assets/images/zen-therapist.png'),
    },
    {
      id: '3',
      url: 'http://159.89.196.6:4566/therapist-bucket/music/zen_03.mp3',
      type: 'default',
      title: '03 Zen Relaxing Japanese Music - Best Peaceful Music',
      album: 'Zen Relax',
      artist: 'Zen',
      artwork: require('../../../assets/images/zen-therapist.png'),
    },
    {
      id: '4',
      url: 'http://159.89.196.6:4566/therapist-bucket/music/zen_04.mp3',
      type: 'default',
      title:
        '04 Zen Relaxing Music with Water Sounds - Peaceful Ambience for Spa, Yoga and Relaxation',
      album: 'Zen Relax',
      artist: 'Zen',
      artwork: require('../../../assets/images/zen-therapist.png'),
    },
  ]);

  return true;
};

const MusicPlayer = () => {
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

  return (
    <View style={styles.container}>
      <View style={[theme.block.rowMiddleCenter, styles.content]}>
        <Button
          appearance="ghost"
          accessoryLeft={PrevIcon}
          style={styles.smallButton}
          onPress={() => prev()}
        />
        <Button
          accessoryLeft={isPlaying ? PauseIcon : PlayIcon}
          style={styles.playButton}
          onPress={() => (isPlaying ? pause() : start())}
        />
        <Button
          appearance="ghost"
          accessoryLeft={NextIcon}
          style={styles.smallButton}
          onPress={() => next()}
        />
      </View>
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    height: 64,
    position: 'absolute',
    backgroundColor: '#8F68BC',
    left: 0,
    right: 0,
    top: -64,
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
  content: {
    flex: 1,
  },
  smallButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 15,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    borderColor: 'white',
  },
});
