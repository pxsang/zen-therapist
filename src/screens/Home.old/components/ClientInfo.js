import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../../../components/Text';
import theme from '../../../constants/theme';

const ClientInfo = ({data}) => {
  const safeArea = useSafeAreaInsets();

  const [firstInfo, secondInfo] = data || [];

  return (
    <View style={styles.contentContainer}>
      <View style={styles.content}>
        <View style={styles.dot} />
        <View style={[styles.info, styles.infoBorder]}>
          <Text light size={11} color={theme.color.gray} style={styles.label}>
            {firstInfo.label}
          </Text>
          <Text bold size={16}>
            {firstInfo.value}
          </Text>
        </View>
      </View>
      <View>
        <View style={theme.block.rowLeft}>
          <View style={styles.dot} />
          <View style={styles.info}>
            <Text
              light
              size={11}
              color={theme.color.gray}
              style={styles.label}>
              {secondInfo.label}
            </Text>
            <Text bold size={16}>
              {secondInfo.value}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ClientInfo;

const styles = StyleSheet.create({
  container: top => ({
    ...StyleSheet.absoluteFillObject,
    top: top + 75,
    left: 0,
    right: 0,
    zIndex: 99,
    paddingHorizontal: 20,
  }),
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  content: {
    marginBottom: 15,
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#58BE3F',
    marginRight: 20,
    marginTop: 10,
  },
  info: {
    flex: 1,
  },
  infoBorder: {
    borderBottomColor: theme.color.border,
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  label: {
    marginBottom: 5,
  },
});
