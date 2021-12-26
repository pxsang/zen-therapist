import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components';
import Text from '../../../components/Text';
import Image from '../../../components/Image';
import t from '../../../i18n';

const Online = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Text bold size={24}>
        {t('enable_location')}
      </Text>
      <Image
        source={require('../../../assets/images/enable-location.png')}
        style={styles.image}
      />
      <Text center>{t('enable_location_description')}</Text>
      <View height={15} />
      <View style={styles.button}>
        <Button onPress={onPress}>{t('enable')}</Button>
      </View>
    </View>
  );
};

export default Online;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 15,
  },
  button: {
    width: '100%',
  },
});
