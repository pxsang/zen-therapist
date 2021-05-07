import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Layout, Button, Icon} from '@ui-kitten/components';
import Text from '../../../components/Text';
import VerticalInfo from '../../../components/VerticalInfo';
import theme from '../../../constants/theme';

import {STATUS} from '../../../constants/Constants';

const WaitingForAccept = ({status, onStatusChange}) => {
  let [meaningTime, setMeaningTime] = useState(10);
  useEffect(() => {
    let interval = setInterval(() => {
      setMeaningTime(meaningTime - 1);
    }, 1000);

    if (meaningTime === 0) {
      onStatusChange(STATUS.OFFLINE);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [meaningTime, onStatusChange]);

  return (
    <View>
      <Text center bold size={18}>
        7 min
      </Text>
      <View style={theme.block.marginTop(15)}>
        <Button style={{
          height: 40,
          borderRadius: 20,
          paddingTop: 0,
          paddingBottom: 0,
          backgroundColor: '#8F68BC',
          borderWidth: 0,
        }}
          accessoryRight={() => (
            <View style={{
              position: 'absolute',
              right: 5,
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: '#5B3686',
              justifyContent: 'center',
              }}>
                <Text center bold style={{ color: 'white' }}>{meaningTime}</Text>
              </View>
          )}
          onPress={() => onStatusChange(STATUS.ACCEPTED)}
        >
            <Text>Tap to Accept</Text>
        </Button>
      </View>
      <View style={styles.informationContainer}>
        <VerticalInfo label="Card" value="380,000" icon="VND" />
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
  informationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 20,
    borderTopColor: theme.color.border,
    borderTopWidth: 1,
  },
});
