import React from 'react';
import {View} from 'react-native';
import UserStatistics from '../../../components/UserStatistics';
import Text from '../../../components/Text';
import theme from '../../../constants/theme';
import useTranslate from '../../../hooks/useTranslate';

const Online = () => {
  const t = useTranslate();

  return (
    <View>
      <Text center bold size={18}>
        {t('finding_sessions')}
      </Text>
      <View style={theme.block.marginTop(15)}>
        <Text center bold size={18} color={theme.color.primary}>
          {t('opportunity_nearby')}
        </Text>
        <Text center>{t('more_requests_than_usual')}</Text>
      </View>
      <View height={20} />
      <UserStatistics />
    </View>
  );
};

export default Online;
