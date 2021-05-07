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
} from 'react-native';
import {Layout, Button as UIButton, CheckBox} from '@ui-kitten/components';
import Button from '../components/Button';
import Text from '../components/Text';
import Header from '../components/Header';
import theme from '../constants/theme';

const MassageOffered = props => {
  return (
    <>
      <Header {...props} title="Choose service to provide" />
      <Layout style={[styles.container]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {OFFEREDS.map(_ => (
            <OfferedItem data={_} />
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
  checkbox: {
  },
});

const OfferedItem = ({data}) => {
  const {name, childs} = data;
  return (
    <View style={{
      marginBottom: 20,
    }}>
      <View style={{
        backgroundColor: theme.color.border,
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}>
        <Text bold>{name}</Text>
      </View>
      <View style={{
        paddingVertical: 10,
      }}>
        {childs.map(({id, name: childName, time, price}) => (
          <View key={id} style={{
            paddingVertical: 10,
          }}>
            <CheckBox
              style={styles.checkbox}
              status="primary">
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                <Text>{childName}</Text>
                {childName && (
                  <View style={{
                    width: 2,
                    height: 2,
                    backgroundColor: theme.color.primary,
                    borderRadius: 1,
                    marginHorizontal: 5,
                  }} />
                )}
                <Text>{time} mins</Text>
                <View style={{
                  width: 2,
                  height: 2,
                  backgroundColor: theme.color.primary,
                  borderRadius: 1,
                  marginHorizontal: 5,
                }} />
                <Text>{price}</Text>
              </View>
            </CheckBox>
          </View>
        ))}
      </View>
    </View>
  );
};

const OFFEREDS = [
  {
    id: 1,
    name: 'Thai or Swedish',
    childs: [
      {
        id: 1,
        time: 60,
        price: 380000,
      },
      {
        id: 2,
        time: 90,
        price: 500000,
      },
      {
        id: 3,
        time: 120,
        price: 700000,
      },
    ],
  },
  {
    id: 2,
    name: 'Soothing Aroma Massage',
    childs: [
      {
        id: 1,
        time: 60,
        price: 480000,
      },
      {
        id: 2,
        time: 90,
        price: 600000,
      },
      {
        id: 3,
        time: 120,
        price: 800000,
      },
    ],
  },
  {
    id: 3,
    name: 'Hot Stone Massage',
    childs: [
      {
        id: 1,
        time: 60,
        price: 430000,
      },
      {
        id: 2,
        time: 90,
        price: 550000,
      },
      {
        id: 3,
        time: 120,
        price: 750000,
      },
    ],
  },
  {
    id: 4,
    name: 'Full Body Coconut Oil Massage',
    childs: [
      {
        id: 1,
        time: 60,
        price: 500000,
      },
      {
        id: 2,
        time: 90,
        price: 620000,
      },
    ],
  },
  {
    id: 5,
    name: 'Foot Massage',
    childs: [
      {
        id: 1,
        name: 'Foot Relax',
        time: 30,
        price: 200000,
      },
      {
        id: 2,
        name: 'Foot Relax',
        time: 60,
        price: 360000,
      },
      {
        id: 3,
        name: 'Foot/Back/Shoulder',
        time: 30,
        price: 380000,
      },
      {
        id: 4,
        name: 'Foot/Back/Shoulder',
        time: 60,
        price: 500000,
      },
    ],
  },
];
