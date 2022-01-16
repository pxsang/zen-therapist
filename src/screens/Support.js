import React from 'react';
import {Linking, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Layout, Icon} from '@ui-kitten/components';
import Text from '../components/Text';
import Header from '../components/Header3';
import theme from '../constants/theme';
import t from '../i18n';

const Support = props => {
  return (
    <>
      <Header {...props} title={t('support')} />
      <Layout style={[styles.container]}>
        <TouchableOpacity
          onPress={() => Linking.openURL(`tel:${'0707269001'}`)}>
          <View style={styles.itemContainer}>
            <View style={theme.block.rowMiddle}>
              <Icon
                style={styles.icon}
                fill={theme.color.primary}
                name="phone-outline"
              />
              <Text color={theme.color.primary}>{t('call_us')}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Layout>
    </>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  itemContainer: {
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
    width: 24,
    height: 24,
    marginRight: 10,
  },
});
