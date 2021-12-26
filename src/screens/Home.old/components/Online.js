import React from 'react';
import {View} from 'react-native';
import UserStatistics from '../../../components/UserStatistics';
import Text from '../../../components/Text';
import theme from '../../../constants/theme';

const Online = () => {
  return (
    <View>
      <Text center bold size={18}>
        Finding Sessions
      </Text>
      <View style={theme.block.marginTop(15)}>
        <Text center bold size={18} color={theme.color.primary}>
          Opportunity Nearby
        </Text>
        <Text center>More requests than usaual</Text>
      </View>
      <View height={20} />
      <UserStatistics />
    </View>
  );
};

export default Online;
