import React, {useState, useCallback, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Platform,
  FlatList,
} from 'react-native';
import _ from 'underscore';
import moment from 'moment';

import {useDispatch, useSelector} from 'react-redux';
import {Layout, Button as UIButton, Spinner, TabView} from '@ui-kitten/components';
import Button from '../components/Button';
import Text from '../components/Text';
import Header from '../components/Header';
import SessionHistoryItem from '../components/SessionHistoryItem';
import theme from '../constants/theme';

import sessionHistoryData from '../mock/session-history.json';
import {numberFormat} from '../helpers/display';
import {getSessionHistory} from '../redux/actions/session';

const SessionHistory = (props) => {
  const dispatch = useDispatch();
  const SessionState = useSelector(state => state.Session);
  const UserState = useSelector(state => state.User);
  const {history: { isLoading, data }} = SessionState;
  let [historyByDate, setHistoryByDate] = useState([]);

  useEffect(() => {
    dispatch(getSessionHistory());
  }, [dispatch]);

  useEffect(() => {
    const historyGroupByDate = _.groupBy(data, item => moment(item.created_at).format('DD/MM/YYYY'));

    setHistoryByDate(Object.keys(historyGroupByDate).map(key => ({
      date: key,
      list: historyGroupByDate[key],
    })));
  }, [data]);

  return (
    <>
      <Header {...props} />
      <Layout style={styles.container}>
        <View style={{
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
              contentContainerStyle={{ paddingBottom: 40 }}
              data={historyByDate}
              renderItem={({item}) => {
                return (
                  <FlatList
                    ListHeaderComponent={<Text size={18} bold color={theme.color.primary}>{item.date}</Text>}
                    ListHeaderComponentStyle={{ marginVertical: 10 }}
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
