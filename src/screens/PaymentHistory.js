import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import _ from 'underscore';
import moment from 'moment';
import {Layout, Spinner, Tab, TabBar} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import Text from '../components/Text';
import Header from '../components/Header3';
import SessionHistoryItem from '../components/SessionHistoryItem';
import theme from '../constants/theme';
import {numberFormat} from '../helpers/display';
import t from '../i18n';
import {getTodayHistory, getWeeklyHistory} from '../redux/actions/session';

// const WEEKLY_LABEL = {
//   0: 'M',
//   1: 'T',
//   2: 'W',
//   3: 'T',
//   4: 'F',
//   5: 'S',
//   6: 'S',
// };

const HISTORY_TYPE = {
  TODAY: 0,
  WEEKLY: 1,
};

const PaymentHistory = props => {
  const dispatch = useDispatch();
  const SessionState = useSelector(state => state.Session);
  const {
    history: {isLoading, data},
  } = SessionState;
  const [selectedIndex, setSelectedIndex] = useState(HISTORY_TYPE.TODAY);

  useEffect(() => {
    if (!selectedIndex) {
      dispatch(getTodayHistory());
    } else {
      dispatch(getWeeklyHistory());
    }
  }, [selectedIndex, dispatch]);

  // const fill = '#F2F5F7';

  const getOnlineHrs = onlineMinutes => {
    const hours = Math.floor(onlineMinutes / 60);
    const minutes = onlineMinutes - hours * 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}`;
  };

  const renderSummary = () => {
    let dateText;
    let totalAmountByDate = [];

    const totalAmount = _.reduce(
      data,
      (total, item) => (total += item.total_amount),
      0,
    );

    const onlineMinutes = _.reduce(
      data,
      (total, item) => (total += Number(item.request_services[0].duration)),
      0,
    );

    const onlineHrs = getOnlineHrs(onlineMinutes);

    if (selectedIndex === HISTORY_TYPE.TODAY) {
      dateText = moment().format('ddd, DD/MM/YYYY');
    } else {
      dateText =
        moment().startOf('week').format('DD/MM/YYYY') +
        ' - ' +
        moment().endOf('week').format('DD/MM/YYYY');

      const historyGroupByDate = _.groupBy(data, item =>
        moment(item.created_at).format('DD/MM/YYYY'),
      );
      const historyByDate = Object.keys(historyGroupByDate).map(key => ({
        date: key,
        list: historyGroupByDate[key],
      }));

      const startOfWeek = moment().startOf('week');

      for (let index = 0; index < 7; index++) {
        const date = moment(startOfWeek).add(index, 'day').format('DD/MM/YYYY');
        let totalAmount = 0;

        const historyOfDate = _.find(
          historyByDate,
          item => item.date.toString() === date.toString(),
        );

        if (!_.isEmpty(historyOfDate)) {
          totalAmount = _.reduce(
            historyOfDate.list,
            (total, item) => (total += item.total_amount),
            0,
          );
        }

        totalAmountByDate.push(totalAmount);
      }
    }

    return (
      <Layout style={styles.tabContainer}>
        <Text center size={16} color={theme.color.gray}>
          {dateText}
        </Text>
        <View height={10} />
        {isLoading ? (
          <View style={theme.block.rowCenter}>
            <Spinner />
          </View>
        ) : (
          <>
            <View style={theme.block.rowCenter}>
              <Text bold color={theme.color.primary}>
                VND{' '}
              </Text>
              <Text bold size={25} color={theme.color.primary}>
                {numberFormat(totalAmount)}
              </Text>
            </View>
            <View height={15} />
            {/* {selectedIndex === HISTORY_TYPE.WEEKLY && (
              <>
                <PaymentHistoryBarChart
                  data={totalAmountByDate}
                />
                <View height={15} />
              </>
            )} */}
            <View style={theme.block.blockMiddleBetween}>
              <View style={styles.statisticsItem}>
                <Text bold size={18}>
                  {data.length}
                </Text>
                <Text center>Sessions</Text>
              </View>
              <View style={[styles.statisticsItem, styles.statisticsItemLast]}>
                <Text bold size={18}>
                  {onlineHrs}
                </Text>
                <Text center>Online hrs</Text>
              </View>
            </View>
          </>
        )}
      </Layout>
    );
  };

  const renderHistory = () => {
    if (isLoading) {
      return null;
    }

    if (selectedIndex === HISTORY_TYPE.TODAY) {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{height: '100%'}}
          contentContainerStyle={{paddingBottom: 200}}
          data={data}
          renderItem={({item}) => <SessionHistoryItem data={item} />}
          keyExtractor={item => item.id}
        />
      );
    }

    const historyGroupByDate = _.groupBy(data, item =>
      moment(item.created_at).format('DD/MM/YYYY'),
    );
    const historyByDate = Object.keys(historyGroupByDate).map(key => ({
      date: key,
      list: historyGroupByDate[key],
    }));

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{height: '100%'}}
        contentContainerStyle={{paddingBottom: 200}}
        data={historyByDate}
        renderItem={({item}) => {
          return (
            <FlatList
              ListHeaderComponent={
                <Text size={18} bold color={theme.color.primary}>
                  {item.date}
                </Text>
              }
              ListHeaderComponentStyle={{marginVertical: 10}}
              data={item.list}
              renderItem={({item}) => <SessionHistoryItem data={item} />}
              keyExtractor={item => item.id}
            />
          );
        }}
        keyExtractor={item => item.date}
      />
    );
  };

  return (
    <>
      <Header {...props} title={t('payment_history')} />
      <Layout style={[styles.container]}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerContentContainer}>
              <TabBar
                selectedIndex={selectedIndex}
                onSelect={index => {
                  setSelectedIndex(index);
                }}>
                <Tab title="Today" />
                <Tab title="Weekly">
                  {/* <Layout style={styles.tabContainer}>
                    <Text center size={16} color={theme.color.gray}>Mon, 15 Feb 2021 - 22 Feb 2021</Text>
                    <View height={10} />
                    {isLoading ? (
                      <View style={theme.block.rowCenter}>
                        <Spinner />
                      </View>
                    ) : (
                      <>
                        <View style={theme.block.rowCenter}>
                          <Text bold color={theme.color.primary}>VND</Text>
                          <View width={5} />
                          <Text bold size={25} color={theme.color.primary}>6,384,000</Text>
                        </View>
                        <PaymentHistoryBarChart />
                        <View height={15} />
                        <View style={theme.block.blockMiddleBetween}>
                          <View style={styles.statisticsItem}>
                            <Text bold size={18}>15</Text>
                            <Text center>Sessions</Text>
                          </View>
                          <View
                            style={[
                              styles.statisticsItem,
                              styles.statisticsItemLast,
                            ]}>
                            <Text bold size={18}>8:30</Text>
                            <Text center>Online hrs</Text>
                          </View>
                        </View>
                      </>
                    )}
                  </Layout> */}
                </Tab>
              </TabBar>
              {renderSummary()}
            </View>
          </View>
          {renderHistory()}
        </View>
      </Layout>
    </>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerContentContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingTop: 15,
    shadowColor: '#303030',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  tabContainer: {
    paddingVertical: 20,
  },
  statisticsItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    borderRightColor: theme.color.border,
    borderRightWidth: 1,
  },
  statisticsItemLast: {
    borderRightWidth: 0,
  },
});
