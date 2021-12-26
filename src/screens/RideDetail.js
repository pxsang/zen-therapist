import React, {useEffect, useRef} from 'react';
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
import dateformat from 'dateformat';
import {useDispatch, useSelector} from 'react-redux';
import {
  Layout,
  Button as UIButton,
  Spinner,
  TabView,
  Icon,
} from '@ui-kitten/components';
import ClientInfo from '../components/ClientInfo';
import Text from '../components/Text';
// import ClientInfo from './Home/components/ClientInfo';
import Header from '../components/Header';
import theme from '../constants/theme';
import t from '../i18n';
import {getSessionDetail} from '../redux/actions/session';
import {priceFormat} from '../helpers/display';

const RideDetail = props => {
  const {route} = props;
  const {sessionId} = route.params || {};
  const dispatch = useDispatch();
  const SessionState = useSelector(state => state.Session);
  const {
    historyDetail: {isLoading, data},
  } = SessionState;

  useEffect(() => {
    dispatch(getSessionDetail(sessionId));
  }, [dispatch, sessionId]);

  const renderContent = () => {
    if (_.isEmpty(data)) {
      return null;
    }

    return (
      <View style={styles.headerContainer}>
        <ClientInfo
          data={[
            {
              label: t('name_of_client'),
              value: data.user_name,
            },
            {
              label: t('address_of_client'),
              value: data.client_address,
            },
          ]}
        />
        <View height={40} />
        <ScrollView>
          <View style={[theme.block.blockMiddleBetween, styles.section]}>
            <View>
              <Text color={theme.color.gray}>{t('time')}:</Text>
              <Text bold size={18}>
                {t('min', {min: data.request_services[0].duration})}
              </Text>
            </View>
            <View>
              <Text color={theme.color.gray}>{t('price')}:</Text>
              <Text bold size={18}>
                {priceFormat(data.total_amount)}
              </Text>
            </View>
            <View>
              <Text color={theme.color.gray}>{t('distance')}:</Text>
              <Text bold size={18}>
                2,8 km
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: 15,
              }}>
              <Text size={15}>{t('date_and_time')}</Text>
              <Text size={13}>
                {dateformat(data.created_at, 'dd/mm/yyyy hh:MM')}
              </Text>
              {/* <Text size={13}>28 February 2021 at 9:42am</Text> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: 15,
              }}>
              <Text size={15}>{t('type_of_massage')}</Text>
              <Text size={13}>
                {data.request_services[0].group_service_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: 15,
              }}>
              <Text size={15}>{t('special_request')}</Text>
              <Text size={13}>{data.note || '--'}</Text>
            </View>
          </View>
          {/* <View>
            <Text size={12} color={theme.color.primary}>This session was towards your area you received Guaranteed fee.</Text>
          </View> */}
          <View style={theme.block.rowMiddleCenter}>
            {Array(5)
              .fill('')
              .map((_, index) => (
                <Icon
                  style={styles.starIcon}
                  fill={
                    index + 1 <= data.customer_rating ? '#FAD647' : '#8F9BB3'
                  }
                  name="star"
                />
              ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <>
      <Header {...props} />
      <Layout style={[styles.container]}>
        {isLoading ? (
          <View style={theme.block.rowCenter}>
            <Spinner />
          </View>
        ) : (
          renderContent()
        )}
      </Layout>
    </>
  );
};

export default RideDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    top: Platform.OS === 'ios' ? -75 : 20,
    paddingHorizontal: 20,
  },
  section: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.color.border,
    marginBottom: 20,
  },
  starIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 3,
  },
});
