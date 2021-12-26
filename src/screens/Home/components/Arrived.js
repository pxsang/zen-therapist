import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components';
import Text from '../../../components/Text';
import Image from '../../../components/Image';
import theme from '../../../constants/theme';
import t from '../../../i18n';

const Arrived = ({sessionDetail, onStart}) => {
  return (
    <View>
      <View style={[theme.block.rowMiddleCenter, theme.block.marginBottom(10)]}>
        <Text bold size={16}>
          {t('min', {min: sessionDetail?.request_services[0]?.duration})}
        </Text>
        <Image
          style={styles.avatar}
          source={
            sessionDetail?.customer?.avatar
              ? {uri: sessionDetail.customer.avatar}
              : require('../../../assets/icons/user-avatar.png')
          }
        />
      </View>
      <Text center size={12} color={theme.color.gray}>
        {t('massage_in_session_for', {name: sessionDetail?.customer?.name})}
      </Text>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={onStart}>
          {t('start')}
        </Button>
      </View>
    </View>
  );
};

export default Arrived;

const styles = StyleSheet.create({
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginHorizontal: 7,
  },
  buttonContainer: {
    marginTop: 15,
  },
  button: {
    height: 40,
    borderRadius: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
});
