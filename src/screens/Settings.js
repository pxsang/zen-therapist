import React, {useContext, useState} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {Layout, Icon} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import Text from '../components/Text';
import Header from '../components/Header';
import BottomActions from '../components/BottomActions';
import theme from '../constants/theme';
import {AppContext} from '../providers/AppProvider';
import {LANGUAGE_TITLE, LANGUAGE_LIST} from '../constants/Constants';

const Settings = props => {
  const navigation = useNavigation();

  const {t, language, switchLanguage, logout} = useContext(AppContext);
  let [isOpenSelectLanguage, setOpenSelectLanguage] = useState(false);

  return (
    <>
      <Header {...props} title={t('settings')} />
      <Layout style={[styles.container]}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('UpdateProfile')}>
          <View style={styles.itemContainer}>
            <View style={theme.block.rowMiddle}>
              <Icon
                style={styles.icon}
                fill={theme.color.primary}
                name="settings-outline"
              />
              <View width={10} />
              <Text color={theme.color.primary}>{t('edit_profile')}</Text>
            </View>
            <Icon
              style={styles.icon}
              fill="#8F9BB3"
              name="arrow-ios-forward-outline"
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('ChangePassword')}>
          <View style={styles.itemContainer}>
            <View style={theme.block.rowMiddle}>
              <Icon
                style={styles.icon}
                fill={theme.color.primary}
                name="lock-outline"
              />
              <View width={10} />
              <Text color={theme.color.primary}>{t('change_password')}</Text>
            </View>
            <Icon
              style={styles.icon}
              fill="#8F9BB3"
              name="arrow-ios-forward-outline"
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setOpenSelectLanguage(true)}>
          <View style={styles.itemContainer}>
            <View style={theme.block.rowMiddle}>
              <Icon
                style={styles.icon}
                fill={theme.color.primary}
                name="globe-outline"
              />
              <View width={10} />
              <Text color={theme.color.primary}>{t('language')}</Text>
            </View>
            <View style={theme.block.rowMiddle}>
              <Text color={theme.color.secondary}>
                {LANGUAGE_TITLE[language]}
              </Text>
              <View width={10} />
              <Icon
                style={styles.icon}
                fill="#8F9BB3"
                name="arrow-ios-downward-outline"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={theme.block.rowCenter}>
          <TouchableWithoutFeedback onPress={logout}>
            <Text color={theme.color.link}>{t('logout')}</Text>
          </TouchableWithoutFeedback>
        </View>
      </Layout>
      <BottomActions
        isVisible={isOpenSelectLanguage}
        onClose={() => setOpenSelectLanguage(false)}
        actions={LANGUAGE_LIST.map(({_, value}) => ({
          title: t(value),
          i18nKey: value,
          onPress: () => switchLanguage(value),
        }))}
      />
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#303030',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 40,
  },
  icon: {
    width: 22,
    height: 22,
  },
});
