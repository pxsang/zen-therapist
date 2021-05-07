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

const SessionHistory = (props) => {
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
          paddingHorizontal: 20,
          marginTop: 40,
        }}>
          <FlatList
            style={{paddingTop: 20}}
            data={sessionHistoryData}
            renderItem={({item}) => (
              <TouchableWithoutFeedback onPress={() => props.navigation.navigate('RideDetail')}>
                <View>
                  <Text size={16} color="#797979">Mon, 01 March 2021</Text>
                  <View height={10} />
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
