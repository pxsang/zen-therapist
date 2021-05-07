import React from 'react';
import {View, Image, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Drawer as UIDrawer, DrawerItem, IndexPath} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from './Text';
import theme from '../constants/theme';

const Drawer = ({navigation, state}) => {
  const safeArea = useSafeAreaInsets();

  return (
    <UIDrawer
      // selectedIndex={new IndexPath(state.index)}
      onSelect={index => navigation.navigate(state.routeNames[index.row])}
      appearance="noDivider"
      header={() => (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Profile')}>
          <View style={styles.headerContainer(safeArea)}>
            <Image
              style={styles.avatar}
              source={require('../assets/icons/user-avatar.png')}
            />
            <View>
              <Text size={12}>Good morning,</Text>
              <Text bold size={24}>
                Poppet Celdran
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
      footer={() => (
        <View style={styles.footerContainer(safeArea)}>
          <Text bold size={12} color={theme.color.gray}>
            Do more
          </Text>
          <Text style={styles.footerItem} size={12} color={theme.color.gray}>
            Make money giving therapeutic massage.
          </Text>
          <Text style={styles.footerItem} size={12} color={theme.color.gray}>
            Refer a certified massage therapist.
          </Text>
          <Text style={styles.footerItem} size={12} color={theme.color.gray}>
            Rate us on store.
          </Text>
          <Text style={styles.footerItem} size={12} color={theme.color.gray}>
            ZenAppPro.com
          </Text>
        </View>
      )}>
      <DrawerItem
        title={
          <Text bold size={24}>
            Payment History
          </Text>
        }
        onPress={() => navigation.navigate('PaymentHistory')}
      />
      <DrawerItem
        title={
          <Text bold size={24}>
            Session History
          </Text>
        }
        onPress={() => navigation.navigate('SessionHistory')}
      />
      <DrawerItem
        title={
          <Text bold size={24}>
            Massage Offered
          </Text>
        }
        onPress={() => navigation.navigate('MassageOffered')}
      />
      <DrawerItem
        title={
          <Text bold size={24}>
            Settings
          </Text>
        }
        onPress={() => navigation.navigate('Settings')}
      />
      <DrawerItem
        title={
          <Text bold size={24}>
            Support
          </Text>
        }
        onPress={() => navigation.navigate('Support')}
      />
    </UIDrawer>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  headerContainer: safeArea => ({
    paddingVertical: 30,
    paddingTop: safeArea.top + 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderBottomColor: theme.color.border,
    borderBottomWidth: 1,
    marginBottom: 20,
  }),
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'contain',
    marginRight: 20,
  },
  footerContainer: safeArea => ({
    paddingHorizontal: 20,
    paddingBottom: safeArea.bottom + 20,
    paddingTop: 20,
    borderTopColor: theme.color.border,
    borderTopWidth: 1,
    marginTop: 20,
  }),
  footerItem: {
    marginTop: 5,
  },
});
