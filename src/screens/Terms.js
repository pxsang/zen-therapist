import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Layout} from '@ui-kitten/components';
import Text from '../components/Text';
import Header from '../components/Header';
import theme from '../constants/theme';
import t from '../i18n';

const Terms = props => {
  return (
    <>
      <Header {...props} title={t('terms')} />
      <Layout style={[styles.container]}>
        <ScrollView
          style={[theme.block.paddingVertical(20), theme.block.marginTop(20)]}
        >
          <View style={styles.section}>
            <Text size={16}>{t('term_1')}</Text>
          </View>
          <View style={styles.section}>
            <Text size={16}>{t('term_2')}</Text>
          </View>
          <View style={styles.section}>
            <Text size={16}>{t('term_3')}</Text>
          </View>
        </ScrollView>
      </Layout>
    </>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
});
