import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components';
import Text from '../../../components/Text';
import theme from '../../../constants/theme';
import useTranslate from '../../../hooks/useTranslate';

const Started = ({sessionDetail, onFinish}) => {
  const t = useTranslate();

  const getMeaningTime = useCallback(() => {
    const delta = new Date().getTime() - sessionDetail?.started_at;
    const remaining =
      sessionDetail?.request_services[0].duration - delta / 60000;

    return remaining <= 0 ? 0 : Math.ceil(remaining);
  }, [sessionDetail]);
  let [meaningTime, setMeaningTime] = useState(getMeaningTime());

  useEffect(() => {
    let interval = setInterval(() => {
      setMeaningTime(getMeaningTime());
    }, 60 * 1000);

    if (meaningTime <= 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [meaningTime, sessionDetail, getMeaningTime]);

  return (
    <View>
      <View style={[theme.block.rowMiddleCenter, theme.block.marginBottom(10)]}>
        <Text bold>{t('therapy_will_end_in')}</Text>
        <View style={styles.remainingContainer}>
          <Text bold>{t('min', {min: meaningTime})}</Text>
        </View>
      </View>
      <Text center size={12} color={theme.color.gray}>
        {t('massage_in_session_for', {name: sessionDetail.customer.name})}
      </Text>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={onFinish}>
          {t('complete')}
        </Button>
      </View>
    </View>
  );
};

export default Started;

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
  remainingContainer: {
    backgroundColor: theme.color.gray,
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 20,
    marginLeft: 5,
  },
});
