import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components';
import Text from '../../../components/Text';
import UserInfo from '../../../components/UserInfo';
import VerticalInfo from '../../../components/VerticalInfo';
import theme from '../../../constants/theme';

const Offline = ({onStatusChange}) => {
  return (
    <View>
      <Text center bold style={styles.statusTitle}>
        You’re Offline
      </Text>
      <View style={theme.block.blockMiddleBetween}>
        <UserInfo />
        <Button
          accessoryLeft={() => (
            <View style={theme.block.blockMiddleBetween}>
              <Text center bold color="white">
                Go
              </Text>
            </View>
          )}
          style={styles.goButton}
          onPress={onStatusChange}
        />
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

export default Offline;

const styles = StyleSheet.create({
  statusTitle: {
    fontSize: 18,
    color: '#DF2F45',
    marginBottom: 15,
  },
  goButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
  },
  informationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 20,
    borderTopColor: theme.color.border,
    borderTopWidth: 1,
  },
});
