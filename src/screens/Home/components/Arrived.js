import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button} from '@ui-kitten/components';
import Text from '../../../components/Text';
import theme from '../../../constants/theme';

const Arrived = ({onStatusChange}) => {
  return (
    <View>
      <View style={[theme.block.rowMiddleCenter, theme.block.marginBottom(10)]}>
        <Text bold size={16}>
          45 min
        </Text>
        <Image
          style={styles.avatar}
          source={require('../../../assets/icons/user-avatar.png')}
        />
      </View>
      <Text center size={12} color={theme.color.gray}>
        Massage in-session for Cecilia Bolocco
      </Text>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={onStatusChange}>Start</Button>
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
