import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Drawer as UIDrawer, DrawerItem} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import Text from './Text';
import UserAvatar from './UserAvatar';
import theme from '../constants/theme';
import t from '../i18n';

const Drawer = ({navigation, state}) => {
  const UserState = useSelector(_ => _.User);
  const safeArea = useSafeAreaInsets();
  const {userInfo} = UserState;

  const getGreeting = () => {
    const hours = new Date().getHours();

    if (hours < 12) {
      return 'Good morning,';
    }

    return 'Good afternoon,';
  };

  if (!userInfo) return null;

  return (
    <UIDrawer
      appearance="noDivider"
      header={() => (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('Profile');
          }}>
          <View style={styles.headerContainer(safeArea)}>
            <UserAvatar style={styles.avatar} />
            <View
              style={{
                flex: 1,
              }}>
              <Text size={12}>{getGreeting()}</Text>
              <Text bold size={24} numberOfLines={1}>
                {userInfo?.name}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
      footer={() => (
        <View style={styles.footerContainer(safeArea)}>
          <Text bold size={12} color={theme.color.gray}>
            {t('do_more')}
          </Text>
          <Text style={styles.footerItem} size={12} color={theme.color.gray}>
            {t('make_money_giving_therapeutic_massage')}
          </Text>
          <Text style={styles.footerItem} size={12} color={theme.color.gray}>
            {t('refer_a_certified_massage_therapist')}
          </Text>
          <Text style={styles.footerItem} size={12} color={theme.color.gray}>
            {t('rate_us_on_store')}
          </Text>
          <Text style={styles.footerItem} size={12} color={theme.color.gray}>
            ZenAppPro.com
          </Text>
        </View>
      )}>
      <DrawerItem
        title={
          <Text bold size={24}>
            {t('payment_history')}
          </Text>
        }
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('PaymentHistory');
        }}
      />
      <DrawerItem
        title={
          <Text bold size={24}>
            {t('session_history')}
          </Text>
        }
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('SessionHistory');
        }}
      />
      <DrawerItem
        title={
          <Text bold size={24}>
            {t('massage_offered')}
          </Text>
        }
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('MassageOffered');
        }}
      />
      <DrawerItem
        title={
          <Text bold size={24}>
            {t('settings')}
          </Text>
        }
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('Settings');
        }}
      />
      <DrawerItem
        title={
          <Text bold size={24}>
            {t('support')}
          </Text>
        }
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('Support');
        }}
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
