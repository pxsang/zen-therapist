import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import theme from '../constants/theme';
import {Layout, Icon} from '@ui-kitten/components';
import Text from '../components/Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

const Header2 = () => {
  const safeArea = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <Layout style={styles.container(safeArea)}>
      <View style={styles.contentContainer}>
        <View style={theme.block.rowMiddle}>
          <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
            <Icon style={styles.drawerIcon} name="menu-outline" fill="#000" />
          </TouchableWithoutFeedback>
          <Text bold color={theme.color.primary}>
            VND
          </Text>
          <Text bold size={25} style={styles.earned}>
            912,000
          </Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Profile')}>
          <Image
            style={styles.avatar}
            source={require('../assets/icons/user-avatar.png')}
          />
        </TouchableWithoutFeedback>
      </View>
    </Layout>
  );
};

export default Header2;

const styles = StyleSheet.create({
  container: safeArea => ({
    width: width * 2,
    marginLeft: -width / 2,
    paddingTop: safeArea.top,
    shadowColor: theme.color.white,
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 25,
    position: 'relative',
    zIndex: 99,
  }),
  contentContainer: {
    width,
    height: 60,
    marginLeft: width / 2,
    paddingLeft: theme.spacing.m,
    paddingRight: theme.spacing.m,
    // paddingTop: theme.spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  drawerIcon: {
    width: 28,
    height: 28,
    marginRight: 30,
  },
  earned: {
    marginLeft: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'contain',
  },
});
