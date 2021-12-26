import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView, RefreshControl} from 'react-native';
import {Layout, CheckBox} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import Text from '../components/Text';
import Header from '../components/Header';
import theme from '../constants/theme';
import t from '../i18n';
import {getServices} from '../redux/actions/service';
import {priceFormat} from '../helpers/display';

const MassageOffered = props => {
  const dispatch = useDispatch();
  const ServiceState = useSelector(state => state.Service);
  const UserState = useSelector(state => state.User);
  const {available_services} = UserState.userInfo;
  const {isLoading, services} = ServiceState;

  useEffect(() => {
    dispatch(getServices());
  }, []);

  return (
    <>
      <Header {...props} title={t('massage_offered')} />
      <Layout style={[styles.container]}>
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={[theme.color.primary]}
              tintColor={theme.color.primary}
              refreshing={isLoading}
              onRefresh={() => dispatch(getServices())}
            />
          }
          showsVerticalScrollIndicator={false}>
          {services.map(_ => (
            <OfferedItem
              key={_.id}
              data={_}
              availableServices={available_services}
            />
          ))}
        </ScrollView>
      </Layout>
    </>
  );
};

export default MassageOffered;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  section: {
    marginBottom: 30,
  },
  itemContainer: {
    marginBottom: 20,
  },
  itemHeaderContainer: {
    backgroundColor: theme.color.border,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemChildContainer: {
    paddingVertical: 10,
  },
  itemChild: {
    paddingVertical: 10,
  },
  itemSeparator: {
    width: 2,
    height: 2,
    backgroundColor: theme.color.primary,
    borderRadius: 1,
    marginHorizontal: 5,
  },
});

const OfferedItem = ({data, availableServices}) => {
  const {name, sub_services} = data;
  const checked = availableServices.some(_ => _.id === data.id);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeaderContainer}>
        <Text bold>{name}</Text>
      </View>
      <View style={styles.itemChildContainer}>
        {sub_services.map(({id, name: childName, duration, price}) => (
          <View key={id} style={styles.itemChild}>
            <CheckBox
              checked={checked}
              style={styles.checkbox}
              status="primary">
              <View style={theme.block.rowMiddleCenter}>
                <Text>{childName}</Text>
                {childName && <View style={styles.itemSeparator} />}
                <Text>{t('min', {min: duration})}</Text>
                <View style={styles.itemSeparator} />
                <Text>{priceFormat(price)}</Text>
              </View>
            </CheckBox>
          </View>
        ))}
      </View>
    </View>
  );
};
