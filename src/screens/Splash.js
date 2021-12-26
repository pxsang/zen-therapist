import React, {useRef} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import Slide from '../components/Slide';
import Image from '../components/Image';
import Button from '../components/Button';
import Dot from '../components/Dot';
import {useValue, onScrollEvent} from 'react-native-redash/lib/module/v1';
import Animated, {divide, multiply} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import theme from '../constants/theme';
import {setFirstTime} from '../redux/actions/app';
import t from '../i18n';

const {width, height} = Dimensions.get('screen');

const Splash = props => {
  const dispatch = useDispatch();
  const safeArea = useSafeAreaInsets();
  const scroll = useRef(null);
  const x = useValue(0);
  const onScroll = onScrollEvent({x});

  return (
    <View style={styles.container}>
      {/* <View style={styles.backgroundWrapper}>
        <View style={styles.backgroundContainer}>
          <Image
            style={styles.backgroundImage}
            source={require('../assets/images/Background.png')}
          />
        </View>
      </View> */}
      <View style={[styles.slider]}>
        <Animated.View>
          <Animated.ScrollView
            ref={scroll}
            horizontal
            snapToInterval={width}
            decelerationRate="fast"
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            {...{onScroll}}>
            {slides.map(({title, description, image}, index) => (
              <Slide
                key={index}
                title={title}
                description={description}
                image={image}
              />
            ))}
          </Animated.ScrollView>
        </Animated.View>
        <View style={{top: -40, alignItems: 'center'}}>
          <Image
            source={require('../assets/images/logo-1.png')}
            style={{width: 160, height: 160}}
          />
        </View>
      </View>
      <View style={[styles.footer]}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <Dot key={index} currentIndex={divide(x, width)} {...{index, x}} />
          ))}
        </View>
        <Animated.View
          style={[
            styles.footerContent(safeArea),
            {
              width: width * slides.length,
              transform: [{translateX: multiply(x, -1)}],
            },
          ]}>
          {slides.map((_, index) => {
            const last = index === slides.length - 1;

            return (
              <View key={index} style={styles.buttonContainer}>
                <Button
                  status="primary"
                  appearance={last ? 'filled' : 'outline'}
                  icon="arrow-forward-outline"
                  onPress={async () => {
                    if (last) {
                      dispatch(setFirstTime(false));
                      return;
                    }
                    if (scroll.current) {
                      scroll.current.scrollTo({
                        x: width * (index + 1),
                        animated: true,
                      });
                    }
                  }}>
                  {last ? t('lets_get_stated') : t('next')}
                </Button>
              </View>
            );
          })}
        </Animated.View>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    backgroundColor: 'white',
  },
  backgroundWrapper: {
    width: width,
    height: height * 0.65,
    position: 'absolute',
    top: 0,
  },
  backgroundContainer: {
    position: 'absolute',
    bottom: 0,
    transform: [{translateX: -width}],
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: theme.spacing.m,
  },
  description: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: theme.spacing.xl,
  },
  slider: {
    flex: 0.7,
    // backgroundColor: 'red',
  },
  footer: {
    flex: 0.3,
    // backgroundColor: 'blue',
  },
  footerContent: safeArea => ({
    flex: 1,
    paddingBottom: safeArea.bottom + theme.spacing.m,
    flexDirection: 'row',
    alignItems: 'flex-end',
  }),
  pagination: {
    paddingTop: theme.spacing.l,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    width,
    padding: theme.spacing.m,
  },
});

const slides = [
  {
    title: t('splash_1__title'),
    description: t('splash_1__description'),
    image: require('../assets/images/splash-1.png'),
  },
  {
    title: t('splash_2__title'),
    description: t('splash_2__description'),
    image: require('../assets/images/splash-2.png'),
  },
  {
    title: t('splash_3__title'),
    description: t('splash_3__description'),
    image: require('../assets/images/splash-3.png'),
  },
];
