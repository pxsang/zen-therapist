import React from 'react';
import {StyleSheet, View, ScrollView, Alert, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Layout} from '@ui-kitten/components';
import Button from '../components/Button';
import UserAvatar from '../components/UserAvatar';
import Text from '../components/Text';
import Header from '../components/Header';
import theme from '../constants/theme';
import {logout} from '../redux/actions/user';
import {
  experienceFormat,
  priceFormat,
  numberFormat,
  phoneNumberFormat,
  ratingFormat,
} from '../helpers/display';
import t from '../i18n';

const Profile = props => {
  const dispatch = useDispatch();
  const UserState = useSelector(state => state.User);
  const {
    userInfo,
    logout: {isLoading},
  } = UserState;

  if (!userInfo) return null;

  return (
    <>
      <Header title={t('my_account')} {...props} />
      <Layout style={[styles.container]}>
        {Platform.OS === 'ios' ? (
          <View style={styles.headerIOS}>
            <View style={styles.avatarContainer}>
              <UserAvatar style={styles.avatarImage} />
            </View>
          </View>
        ) : null}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {Platform.OS === 'android' ? (
            <View style={styles.headerAndroid}>
              <View style={styles.avatarContainer}>
                <UserAvatar style={styles.avatarImage} />
              </View>
            </View>
          ) : null}
          <View style={styles.section}>
            <Text center style={styles.therapist}>
              {t('therapist')}
            </Text>
            <Text bold center style={styles.fullname}>
              {/* {getFullName(userInfo.first_name, userInfo.last_name)} */}
              {userInfo.name}
            </Text>
            <Text bold center style={styles.rating}>
              {ratingFormat(userInfo.rating)}
            </Text>
          </View>
          <View style={[styles.section, styles.sectionHorizontal]}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>{t('total_sessions')}:</Text>
              <Text bold style={styles.summaryValue}>
                {numberFormat(userInfo.total_sessions_completed || 0)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>{t('earned')}:</Text>
              <Text bold style={styles.summaryValue}>
                {priceFormat(userInfo.total_earned || 0)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>{t('years')}:</Text>
              <Text bold style={styles.summaryValue}>
                {/* {experienceFormat(12 / 12)} year */}1 year
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>{t('phone')}</Text>
              <Text style={styles.contactValue}>
                {phoneNumberFormat(userInfo.phone_number)}
              </Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>{t('email')}</Text>
              <Text style={styles.contactValue}>{userInfo.email || '--'}</Text>
            </View>
            <View style={[styles.contactInfo, styles.contactInfoLast]}>
              <Text style={styles.contactLabel}>{t('language')}</Text>
              <Text style={styles.contactValue}>
                Tiếng Việt
                {/* {userInfo.language || 'Not set'} */}
              </Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Button
              appearance="rounded"
              isLoading={isLoading}
              onPress={() => {
                // props.navigation.navigate('Welcome');
                Alert.alert('Bạn thực sự muốn đăng xuất?', '', [
                  {
                    text: t('cancel'),
                    style: 'cancel',
                  },
                  {
                    text: t('logout'),
                    onPress: async () => {
                      await dispatch(logout());
                    },
                  },
                ]);
              }}>
              {t('logout')}
            </Button>
          </View>
        </ScrollView>
      </Layout>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: Platform.OS === 'ios' ? 71 : 0,
    paddingVertical: Platform.OS === 'ios' ? 0 : 20,
    flex: 1,
  },
  fullname: {
    fontSize: 23,
  },
  therapist: {
    color: theme.color.gray,
  },
  rating: {
    fontSize: 16,
    color: theme.color.primary,
    marginTop: 5,
  },
  section: {
    borderBottomColor: theme.color.border,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
  },
  sectionHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: theme.color.gray,
  },
  summaryValue: {
    marginTop: 5,
    fontSize: 18,
  },
  headerIOS: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    top: -71,
    height: 142,
    zIndex: 99,
  },
  headerAndroid: {
    height: 142,
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  avatarContainer: {
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: '#FFFFFF',
  },
  avatarImage: {
    width: 142,
    height: 142,
    borderRadius: 71,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  contactInfoLast: {
    marginBottom: 0,
  },
  contactLabel: {
    fontSize: 15,
  },
  contactValue: {
    fontSize: 15,
  },
});
