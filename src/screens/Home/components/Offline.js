import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components';
import Text from '../../../components/Text';
import UserStatistics from '../../../components/UserStatistics';
import UserInfo from '../../../components/UserInfo';
import theme from '../../../constants/theme';
import useTranslate from '../../../hooks/useTranslate';
import useCalculateRemainingTime from '../../../hooks/useCalculateRemainingTime';

const Offline = ({userInfo, onOnline}) => {
  const t = useTranslate();
  const {getMeaningTime} = useCalculateRemainingTime();
  console.log('getMeaningTime', getMeaningTime);
  return (
    <View>
      <Text center bold style={styles.statusTitle}>
        {t('you_are_offline')}
      </Text>
      <View style={theme.block.blockMiddleBetween}>
        <UserInfo data={userInfo} />
        <Button
          accessoryLeft={() => (
            <View style={theme.block.blockMiddleBetween}>
              <Text center bold color="white">
                Go
              </Text>
            </View>
          )}
          style={styles.goButton}
          onPress={onOnline}
        />
      </View>
      <View height={20} />
      <UserStatistics />
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
