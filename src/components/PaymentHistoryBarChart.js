import React, {memo, useState} from 'react';
import {View} from 'react-native';
import {BarChart, XAxis, Grid} from 'react-native-svg-charts';
import theme from '../constants/theme';
import * as scale from 'd3-scale';

import {numberFormat} from '../helpers/display';
import Text from './Text';

const WEEKLY_LABEL = {
  0: 'M',
  1: 'T',
  2: 'W',
  3: 'T',
  4: 'F',
  5: 'S',
  6: 'S',
};

const PaymentHistoryBarChart = ({data}) => {
  let [selectedBarIndex, setSelectedBarIndex] = useState(0);

  const Labels = ({x, y, bandwidth, data}) =>
    data.map((value, index) => {
      if (index !== selectedBarIndex) return null;

      return (
        <View
          style={{
            width: 110,
            height: 36,
            borderRadius: 8,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            transform: [
              {
                translateX:
                  index === 0
                    ? 0
                    : index === 6
                    ? x(index) + bandwidth / 2 - 85
                    : x(index) + bandwidth / 2 - 55,
              },
              {
                translateY: y(value.value) - 55,
              },
            ],
            shadowColor: '#303030',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 10,
          }}>
          <Text size={14} color={theme.color.primary}>{`${numberFormat(
            value.value,
          )}đ`}</Text>
        </View>
      );
    });
  return (
    <>
      <BarChart
        spacingOuter={0}
        spacingInner={0.15}
        style={{height: 150}}
        data={(data || []).map((_, index) => ({
          value: _,
          svg: {
            fill: selectedBarIndex === index ? '#5B3686' : '#F2F5F7',
            onPress: () => setSelectedBarIndex(index),
          },
        }))}
        svg={{fill: 'rgba(134, 65, 244, 0.8)'}}
        yAccessor={({item}) => item.value}
        // svg={{ fill, onPress: (a, b) => console.log('123123213', a)}}
        contentInset={{top: 70, bottom: 20}}>
        <Labels />
      </BarChart>
      <XAxis
        style={{marginTop: 15}}
        data={data}
        scale={scale.scaleBand}
        formatLabel={(_, index) => WEEKLY_LABEL[index]}
        svg={{fontSize: 15, fill: '#7F7F7F'}}
      />
    </>
  );
};

export default memo(PaymentHistoryBarChart);
