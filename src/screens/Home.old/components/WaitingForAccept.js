import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components';
import Text from '../../../components/Text';
import VerticalInfo from '../../../components/VerticalInfo';
import theme from '../../../constants/theme';

const WaitingForAccept = ({onAccept, onReject}) => {
  let [remainingTime, setRemainingTime] = useState(10);
  useEffect(() => {
    let interval = setInterval(() => {
      setRemainingTime(remainingTime - 1);
    }, 1000);

    if (remainingTime === 0) {
      onReject();
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [remainingTime, onReject]);

  return (
    <View>
      <Text center bold size={18}>
        7 min
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
          <Text>Tap to Accept</Text>
        </Button>
      </View>
      <View style={styles.informationContainer}>
        <VerticalInfo label="Cash" value="380,000" icon="VND" />
        <VerticalInfo
          label="Rating"
          value="3,75"
          icon={require('../../../assets/icons/rating.png')}
        />
        <VerticalInfo
          label="Type of Massage"
          value="Swedish 120"
          icon={require('../../../assets/icons/cancellation.png')}
        />
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
});
