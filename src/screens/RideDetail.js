import React, {useState, useRef} from 'react';
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
import {Layout, Button as UIButton, Tab, TabView} from '@ui-kitten/components';
import Button from '../components/Button';
import Text from '../components/Text';
import ClientInfo from './Home/components/ClientInfo';
import Header from '../components/Header';
import theme from '../constants/theme';

const RideDetail = (props) => {
  return (
    <>
      <Header {...props} />
      <Layout style={[styles.container]}>
        <View style={{
          top: Platform.OS === 'ios' ? -75 : 20,
          paddingHorizontal: 20,
        }}>
          <ClientInfo
            data={[{
              label: 'Type of Massage',
              value: 'Thai Massage - 60'
            }, {
              label: 'Address of Client',
              value: '195/3 Dien Bien Phu, Binh Thanh District',
            }]}
          />
          <ScrollView style={{ marginTop: 40 }}>
            <View style={[theme.block.blockMiddleBetween, {
              paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: theme.color.border, marginBottom: 20
            }]}>
              <View>
                <Text color={theme.color.gray}>Time:</Text>
                <Text bold size={18}>60 min</Text>
              </View>
              <View>
                <Text color={theme.color.gray}>Price:</Text>
                <Text bold size={18}>380,000</Text>
              </View>
              <View>
                <Text color={theme.color.gray}>Distance:</Text>
                <Text bold size={18}>2,8 km</Text>
              </View>
            </View>
            <View style={{ paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: theme.color.border, marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 15 }}>
                <Text size={15}>Date & Time</Text>
                <Text size={13}>28 February 2021 at 9:42am</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 15 }}>
                <Text size={15}>Type of Massage</Text>
                <Text size={13}>Thai Massage</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 15 }}>
                <Text size={15}>Special Request</Text>
                <Text size={13}>Avoid knee area due to injury.</Text>
              </View>
            </View>
            <View>
              <Text size={12} color={theme.color.primary}>This session was towards your area you received Guaranteed fee.</Text>
            </View>
          </ScrollView>
        </View>
      </Layout>
    </>
  );
};

export default RideDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
