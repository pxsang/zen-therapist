import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Layout, Icon} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import theme from '../constants/theme';
import t from '../i18n';
import Text from './Text';

const {width} = Dimensions.get('screen');

const Header = ({title, navigation}) => {
  const safeArea = useSafeAreaInsets();

  return (
    <Layout
      style={{
        paddingTop: safeArea.top,
        backgroundColor: theme.color.primary,
        zIndex: 999,
      }}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View
          style={[
            styles.titleContent,
            {paddingHorizontal: 20, height: 60, alignItems: 'center'},
          ]}>
          <Icon style={styles.icon} fill="#FFFFFF" name="arrow-back-outline" />
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    </Layout>
  );
};

export default Header;

Header.defaultProps = {
  title: t('back'),
};

const styles = StyleSheet.create({
  backgroundWrapper: {
    width: width,
    height: 200,
    position: 'absolute',
  },
  backgroundContainer: {
    position: 'absolute',
    bottom: 0,
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    left: -525,
    resizeMode: 'contain',
  },
  icon: {
    width: 24,
    height: 24,
  },
  titleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    marginLeft: 20,
  },
});
