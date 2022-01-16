import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import _ from 'underscore';
import moment from 'moment';

import {useDispatch, useSelector} from 'react-redux';
import {Layout, Spinner} from '@ui-kitten/components';
import Text from '../components/Text';
import Header from '../components/Header3';
import SessionHistoryItem from '../components/SessionHistoryItem';
import theme from '../constants/theme';

import {getSessionHistory} from '../redux/actions/session';

const SessionHistory = props => {
  const dispatch = useDispatch();
  const SessionState = useSelector(state => state.Session);
  const {
    history: {isLoading, data},
  } = SessionState;
  let [historyByDate, setHistoryByDate] = useState([]);

  useEffect(() => {
    dispatch(getSessionHistory());
  }, [dispatch]);

  useEffect(() => {
    const historyGroupByDate = _.groupBy(data, item =>
      moment(item.created_at).format('DD/MM/YYYY'),
    );

    setHistoryByDate(
      Object.keys(historyGroupByDate).map(key => ({
        date: key,
        list: historyGroupByDate[key],
      })),
    );
  }, [data]);

  return (
    <>
      <Header {...props} />
      <Layout style={styles.container}>
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          {isLoading ? (
            <View style={theme.block.rowCenter}>
              <Spinner />
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{paddingTop: 20}}
              contentContainerStyle={{paddingBottom: 40}}
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
          )}
        </View>
      </Layout>
    </>
  );
};

export default SessionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
