import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button} from '@ui-kitten/components';
import Text from '../../../components/Text';
import theme from '../../../constants/theme';

const Started = ({onStatusChange}) => {
  return (
    <View>
      <View style={[theme.block.rowMiddleCenter, theme.block.marginBottom(10)]}>
        <Text bold size={16}>
          120 min
        </Text>
        <Image
          style={styles.avatar}
          source={require('../../../assets/icons/user-avatar.png')}
        />
      </View>
      <Text center size={12} color={theme.color.gray}>
        Massage ended for Cecilia Bolocco
      </Text>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={onStatusChange}>
          Complete
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
});
