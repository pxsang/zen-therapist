import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components';
import Image from '../../../components/Image';
import Text from '../../../components/Text';
import Action from '../../../components/Action';
import theme from '../../../constants/theme';
import t from '../../../i18n';
import {shortMoney} from '../../../helpers/display';

const Accepted = ({sessionDetail, onArrive, onReject}) => {
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
        <Text bold size={16}>
          {shortMoney(sessionDetail?.total_amount)}
        </Text>
      </View>
      <Text center size={12} color={theme.color.gray}>
        {t('on_the_way_to')}
      </Text>
      <View style={[theme.block.rowLeft, theme.block.marginTop(20)]}>
        <View style={styles.actionContainer}>
          <Action
            icon={require('../../../assets/icons/cancel.png')}
            iconSize={12}
            label={t('cancel_booking')}
            onPress={onReject}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={onArrive}>
          {t('arrived')}
        </Button>
      </View>
    </View>
  );
};

export default Accepted;

const styles = StyleSheet.create({
  informationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 20,
    borderTopColor: theme.color.border,
    borderTopWidth: 1,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginHorizontal: 7,
  },
  actionContainer: {
    flex: 1,
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
