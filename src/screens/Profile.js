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
import {useSelector, useDispatch} from 'react-redux';
import {Layout, Button as UIButton, Icon} from '@ui-kitten/components';
import Button from '../components/Button';
import Text from '../components/Text';
import Header from '../components/Header';
import theme from '../constants/theme';
import {logout} from '../redux/actions/user';

const Profile = props => {
  const dispatch = useDispatch();
  const User = useSelector(state => state.User);

  return (
    <>
      <Header title="My account" {...props} />
      <Layout style={[styles.container]}>
        {Platform.OS === 'ios' ? (
          <View style={styles.headerIOS}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatarImage}
                source={require('../assets/icons/avatar.png')}
              />
            </View>
          </View>
        ) : null}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}>
          {Platform.OS === 'android' ? (
            <View style={styles.headerAndroid}>
              <View style={styles.avatarContainer}>
                <Image
                  style={styles.avatarImage}
                  source={require('../assets/icons/avatar.png')}
                />
              </View>
            </View>
          ) : null}
          <View style={styles.section}>
            <Text center style={styles.therapist}>Therapist</Text>
            <Text bold center style={styles.fullname}>Poppet Celdran</Text>
            <Text bold center style={styles.rating}>4,75</Text>
          </View>
          <View style={[styles.section, styles.sectionHorizontal]}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Sessions:</Text>
              <Text bold style={styles.summaryValue}>62</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Earned:</Text>
              <Text bold style={styles.summaryValue}>9,424,000d</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Years:</Text>
              <Text bold style={styles.summaryValue}>0.3</Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>+84 909074793</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>poppetceldran@gmail.com</Text>
            </View>
            <View style={[styles.contactInfo, styles.contactInfoLast]}>
              <Text style={styles.contactLabel}>Language</Text>
              <Text style={styles.contactValue}>Spanish, English </Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Button
              appearance="rounded"
              onPress={() => {
                props.navigation.navigate('Welcome');
                dispatch(logout());
              }}
            >Log Out</Button>
          </View>
        </ScrollView>
      </Layout>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: Platform.OS === 'ios' ? 71 : 0,
    paddingVertical: Platform.OS === 'ios' ? 0 : 20,
    flex: 1,
  },
  fullname: {
    fontSize: 23,
  },
  therapist: {
    color: theme.color.gray,
  },
  rating: {
    fontSize: 16,
    color: theme.color.primary,
    marginTop: 5,
  },
  section: {
    borderBottomColor: theme.color.border,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
  },
  sectionHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: theme.color.gray,
  },
  summaryValue: {
    marginTop: 5,
    fontSize: 18,
  },
  headerIOS: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    top: -71,
    height: 142,
    zIndex: 99,
  },
  headerAndroid: {
    height: 142,
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  avatarContainer: {
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: '#FFFFFF',
  },
  avatarImage: {
    width: 142,
    height: 142,
    borderRadius: 71,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  contactInfoLast: {
    marginBottom: 0,
  },
  contactLabel: {
    fontSize: 15,
  },
  contactValue: {
    fontSize: 15,
  },
});
