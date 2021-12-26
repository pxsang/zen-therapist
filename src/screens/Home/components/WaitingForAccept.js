import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components';
import Text from '../../../components/Text';
import VerticalInfo from '../../../components/VerticalInfo';
import theme from '../../../constants/theme';
import t from '../../../i18n';
import useInterval from '../../../helpers/useInterval';
import {numberFormat, ratingFormat} from '../../../helpers/display';

const WaitingForAccept = ({sessionDetail, onAccept, onReject}) => {
  let [remainingTime, setRemainingTime] = useState(60);

  useInterval(
    () => {
      setRemainingTime(remainingTime - 1);
    },
    remainingTime ? 1000 : null,
  );

  useEffect(() => {
    if (remainingTime <= 0) {
      onReject();
    }
  }, [remainingTime, onReject]);

  return (
    <View>
      <Text center bold size={18}>
        {t('min', {min: sessionDetail?.request_services[0]?.duration})}
      </Text>
      <View style={theme.block.marginTop(15)}>
        <Button
          style={styles.button}
          accessoryRight={() => (
            <View style={styles.remainingTimeContainer}>
              <Text center bold color="white">
                {remainingTime}
              </Text>
            </View>
          )}
          onPress={() => onAccept()}>
          <Text>{t('tap_to_accept')}</Text>
        </Button>
      </View>
      <View style={styles.informationContainer}>
        <View style={styles.informationItem}>
          <VerticalInfo
            label={t('cash')}
            value={numberFormat(sessionDetail?.total_amount)}
            icon="VND"
          />
        </View>
        <View style={styles.informationItem}>
          <VerticalInfo
            label={t('rating')}
            value={ratingFormat(4.75)}
            icon={require('../../../assets/icons/rating.png')}
          />
        </View>
        <View style={styles.informationItem}>
          <VerticalInfo
            label={t('type_of_massage')}
            value={sessionDetail?.request_services[0].group_service_name}
            icon={require('../../../assets/icons/cancellation.png')}
          />
        </View>
      </View>
    </View>
  );
};

export default WaitingForAccept;

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 20,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: '#8F68BC',
    borderWidth: 0,
  },
  remainingTimeContainer: {
    position: 'absolute',
    right: 5,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#5B3686',
    justifyContent: 'center',
  },
  informationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 20,
    borderTopColor: theme.color.border,
    borderTopWidth: 1,
  },
  informationItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
