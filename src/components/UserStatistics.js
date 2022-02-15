import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import VerticalInfo from './VerticalInfo';
import {percentFormat, ratingFormat} from '../helpers/display';
import theme from '../constants/theme';
import {AppContext} from '../providers/AppProvider';

const UserStatistics = () => {
  const UserState = useSelector(state => state.User);
  const {userInfo} = UserState;
  const {t} = useContext(AppContext);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <VerticalInfo
          label={t('acceptance')}
          value={percentFormat(userInfo?.acceptance || 1)}
          icon={require('../assets/icons/acceptance.png')}
        />
      </View>
      <View style={styles.item}>
        <VerticalInfo
          label={t('rating')}
          value={ratingFormat(userInfo?.rating || 0)}
          icon={require('../assets/icons/rating.png')}
        />
      </View>
      <View style={styles.item}>
        <VerticalInfo
          label={t('cancellation')}
          value={percentFormat(userInfo?.rating || 0)}
          icon={require('../assets/icons/cancellation.png')}
        />
      </View>
    </View>
  );
};

export default UserStatistics;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    borderTopColor: theme.color.border,
    borderTopWidth: 1,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
  },
});
