import React, {useState, useCallback, useRef} from 'react';
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
import { BarChart, XAxis, Grid } from 'react-native-svg-charts'
import Button from '../components/Button';
import Text from '../components/Text';
import { Svg, Ellipse, Text as SVGText } from 'react-native-svg'
import Header from '../components/Header';
import theme from '../constants/theme';
import * as scale from 'd3-scale';

import sessionHistoryData from '../mock/session-history.json';
import {numberFormat} from '../helpers/display';

const WEEKLY_LABEL = {
  0: 'M',
  1: 'T',
  2: 'W',
  3: 'T',
  4: 'F',
  5: 'S',
  6: 'S',
};

const PaymentHistory = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  let [selectedBarIndex, setSelectedBarIndex] = useState(0);

  const shouldLoadComponent = index => index === selectedIndex;

  const fill = '#F2F5F7';
  const data = [1450000, 912000, 1100000, 700000, 540000, 1650000, 890000];
  const Labels = ({ x, y, bandwidth, data }) => (
    data.map((value, index) => {
      if (index !== selectedBarIndex) return null;

      return (
        <View style={{
          width: 110,
          height: 36,
          borderRadius: 8,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{
            translateX: index === 0 ? 0 : index === 6 ? x(index) + (bandwidth / 2) - 85 : x(index) + (bandwidth / 2) - 55
          }, {
            translateY: y(value.value) - 55
          }],
          shadowColor: '#303030',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 10,
        }}>
          <Text size={14} color={theme.color.primary}>{`${numberFormat(value.value)}đ`}</Text>
        </View>
        // <Svg
        //   height="100"
        //   width="110"
        // >
        //   <Ellipse
        //     cx={ x(index) + (bandwidth / 2) }
        //     cy={ y(value.value) - 15 }
        //     rx="50"
        //     ry="30"
        //     stroke="purple"
        //     strokeWidth="2"
        //     fill="yellow"
        //   />
        // </Svg>
          // <SVGText
          //     key={ index }
          //     x={ x(index) + (bandwidth / 2) }
          //     y={ y(value.value) - 15 }
          //     fontSize={ 16 }
          //     fontWeight={700}
          //     fill={ '#5B3686' }
          //     alignmentBaseline={ 'middle' }
          //     textAnchor={ 'middle' }
          // >
          //   {`${value.value}d`}
          // </SVGText>
      )
    }
  ))

  return (
    <>
      <Header {...props} />
      <Layout style={[styles.container]}>
        <View style={{
          top: Platform.OS === 'ios' ? -75 : 0,
          paddingHorizontal: 20,
          paddingVertical: Platform.OS === 'ios' ? 0 : 20,
        }}>
          <View style={styles.header}>
            <View style={styles.headerContentContainer}>
              <TabView
                selectedIndex={selectedIndex}
                shouldLoadComponent={shouldLoadComponent}
                onSelect={index => setSelectedIndex(index)}>
                <Tab title='Today'>
                  <Layout style={styles.tabContainer}>
                    <Text center size={16} color={theme.color.gray}>Mon, 01 March 2021</Text>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignContent: 'flex-start',
                      marginTop: 10,
                    }}>
                      <Text bold color={theme.color.primary}>VND </Text>
                      <Text bold size={25} color={theme.color.primary}>912,000</Text>
                    </View>
                    <View style={[theme.block.blockMiddleBetween, { marginTop: 15 }]}>
                      <View style={{
                        height: '100%',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        justifyContent: 'flex-start',
                        alignContent: 'flex-start',
                        borderRightColor: theme.color.border,
                        borderRightWidth: 1,
                      }}>
                        <Text bold size={18}>15</Text>
                        <Text center>Sessions</Text>
                      </View>
                      <View style={{
                        height: '100%',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        justifyContent: 'flex-start',
                        alignContent: 'flex-start',
                        borderRightColor: theme.color.border,
                        borderRightWidth: 1,
                      }}>
                        <Text bold size={18}>8:30</Text>
                        <Text center>Online hrs</Text>
                      </View>
                      <View style={{
                        height: '100%',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        justifyContent: 'flex-start',
                        alignContent: 'flex-start',
                      }}>
                        <Text bold size={18}>200,000d</Text>
                        <Text center>Tips Earned</Text>
                      </View>
                    </View>
                  </Layout>
                </Tab>
                <Tab title='Weekly'>
                  <Layout style={styles.tabContainer}>
                    <Text center size={16} color={theme.color.gray}>Mon, 15 Feb 2021 - 22 Feb 2021</Text>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignContent: 'flex-start',
                      marginTop: 10,
                    }}>
                      <Text bold color={theme.color.primary}>VND </Text>
                      <Text bold size={25} color={theme.color.primary}>6,384,000</Text>
                    </View>
                    <BarChart
                      spacingOuter={0}
                      spacingInner={0.15}
                      style={{ height: 150 }}
                      data={(data || []).map((_, index) => ({
                        value: _,
                        svg: {
                          fill: selectedBarIndex === index ? '#5B3686' : '#F2F5F7',
                          onPress: () => setSelectedBarIndex(index)
                        }
                      }))}
                      svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                      yAccessor={({ item }) => item.value}
                      // svg={{ fill, onPress: (a, b) => console.log('123123213', a)}}
                      contentInset={{ top: 70, bottom: 20 }}
                    >
                      <Labels />
                    </BarChart>
                    <XAxis
                      style={{ marginTop: 15 }}
                      data={ data }
                      scale={scale.scaleBand}
                      formatLabel={(_, index) => WEEKLY_LABEL[index]}
                      svg={{ fontSize: 15, fill: '#7F7F7F' }}
                    />
                    <View style={[theme.block.blockMiddleBetween, { marginTop: 15 }]}>
                      <View style={{
                        height: '100%',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        justifyContent: 'flex-start',
                        alignContent: 'flex-start',
                        borderRightColor: theme.color.border,
                        borderRightWidth: 1,
                      }}>
                        <Text bold size={18}>15</Text>
                        <Text center>Sessions</Text>
                      </View>
                      <View style={{
                        height: '100%',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        justifyContent: 'flex-start',
                        alignContent: 'flex-start',
                        borderRightColor: theme.color.border,
                        borderRightWidth: 1,
                      }}>
                        <Text bold size={18}>8:30</Text>
                        <Text center>Online hrs</Text>
                      </View>
                      <View style={{
                        height: '100%',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        justifyContent: 'flex-start',
                        alignContent: 'flex-start',
                      }}>
                        <Text bold size={18}>200,000đ</Text>
                        <Text center>Tips Earned</Text>
                      </View>
                    </View>
                  </Layout>
                </Tab>
              </TabView>
            </View>
          </View>
          <FlatList
            data={sessionHistoryData}
            renderItem={({item}) => (
              <TouchableWithoutFeedback onPress={() => props.navigation.navigate('RideDetail')}>
                <View key={item.id} style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginBottom: 15,
                }}>
                  <View style={{ marginRight: 20, alignItems: 'center' }}>
                    <Text>8:32</Text>
                    <View style={{
                      backgroundColor: '#F2F5F7',
                      width: 35,
                      height: 18,
                      borderRadius: 9,
                      alignContent: 'center',
                      justifyContent: 'center',
                      marginTop: 3,
                    }}>
                      <Text center size={11} color={theme.color.gray}>AM</Text>
                    </View>
                  </View>
                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignContent: 'flex-start',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    borderBottomColor: theme.color.border,
                    borderBottomWidth: 1,
                    paddingBottom: 15,
                  }}>
                    <View>
                      <Text size={16}>{item.client.name}</Text>
                      <Text size={12} color={theme.color.gray} style={{ marginTop: 3 }}>Paid by Card</Text>
                    </View>
                    <View>
                      <Text size={16}>380,000đ</Text>
                    </View>
                  </View>
                  {/* <View style={{ flexDirection: 'row'}}>
                    <View style={{ marginRight: 20, alignItems: 'center' }}>
                      <Text>8:32</Text>
                      <View style={{
                        backgroundColor: '#F2F5F7',
                        width: 35,
                        height: 18,
                        borderRadius: 9,
                        alignContent: 'center',
                        justifyContent: 'center',
                        marginTop: 3,
                      }}>
                        <Text center size={11} color={theme.color.gray}>AM</Text>
                      </View>
                    </View>
                    <View>
                      <Text size={16}>Catriona Gray</Text>
                      <Text size={12} color={theme.color.gray} style={{ marginTop: 3 }}>Paid by Card</Text>
                    </View>
                  </View>
                  <View>
                    <Text size={16}>380,000d</Text>
                  </View> */}
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item) => item.id}
          />
          {/* <ScrollView style={{ height: '100%' }}>
            <Text>231232</Text>
          </ScrollView> */}
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
