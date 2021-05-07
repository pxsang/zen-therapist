import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../../../components/Text';
import VerticalInfo from '../../../components/VerticalInfo';
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
      <View style={styles.informationContainer}>
        <VerticalInfo
          label="Acceptance"
          value="95.0%"
          icon={require('../../../assets/icons/acceptance.png')}
        />
        <VerticalInfo
          label="Rating"
          value="4.75"
          icon={require('../../../assets/icons/rating.png')}
        />
        <VerticalInfo
          label="Cancellation"
          value="2.0%"
          icon={require('../../../assets/icons/cancellation.png')}
        />
      </View>
    </View>
  );
};

export default Online;

const styles = StyleSheet.create({
  informationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 20,
    borderTopColor: theme.color.border,
    borderTopWidth: 1,
  },
});
