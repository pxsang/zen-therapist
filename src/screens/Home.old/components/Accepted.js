import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button} from '@ui-kitten/components';
import Text from '../../../components/Text';
import Action from '../../../components/Action';
import theme from '../../../constants/theme';

import {STATUS} from '../../../constants/Constants';

const Accepted = ({onArrived, onReject}) => {
  return (
    <View>
      <View style={[theme.block.rowMiddleCenter, theme.block.marginBottom(10)]}>
        <Text bold size={16}>
          2 min
        </Text>
        <Image
          style={styles.avatar}
          source={require('../../../assets/icons/user-avatar.png')}
        />
        <Text bold size={16}>
          0.5 mi
        </Text>
      </View>
      <Text center size={12} color={theme.color.gray}>
        On the way to Cecilia Bolocco
      </Text>
      <View style={[theme.block.rowLeft, theme.block.marginTop(20)]}>
        <Action icon={require('../../../assets/icons/chat.png')} label="Chat" />
        <Action
          icon={require('../../../assets/icons/message.png')}
          label="Message"
        />
        <Action
          icon={require('../../../assets/icons/cancel.png')}
          iconSize={12}
          label="Cancel Booking"
          onPress={onReject}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={onArrived}>Arrived</Button>
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
