import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import dateformat from 'dateformat';
import Text from './Text';
import theme from '../constants/theme';
import {priceFormat} from '../helpers/display';

const SessionHistoryItem = ({data}) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('RideDetail', {sessionId: data.id})}>
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Text>{dateformat(data.created_at, 'hh:MM')}</Text>
          <View height={5} />
          <View style={styles.meridiemContainer}>
            <Text center size={11} color={theme.color.gray}>
              {dateformat(data.created_at, 'TT')}
            </Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} size={16}>{data.user_name}</Text>
            <View height={3} />
            <Text size={12} color={theme.color.gray}>Cash</Text>
          </View>
          <View style={{ width: 100, alignItems: 'flex-end' }}>
            <Text size={16}>{priceFormat(data.total_amount)}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SessionHistoryItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  timeContainer: {
    marginRight: 20,
    alignItems: 'center',
  },
  meridiemContainer: {
    backgroundColor: '#F2F5F7',
    width: 35,
    height: 18,
    borderRadius: 9,
    alignContent: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomColor: theme.color.border,
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
});
