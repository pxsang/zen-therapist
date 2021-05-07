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
import {Layout, Button as UIButton, Icon} from '@ui-kitten/components';
import Button from '../components/Button';
import Text from '../components/Text';
import Header from '../components/Header';
import theme from '../constants/theme';

const Terms = () => {
  return (
    <>
      <Header />
      <Layout style={[styles.container]}>
        <Text size={16} color={theme.color.gray}>TERMS OF USE</Text>
        <ScrollView
          style={{
            marginTop: 20,
            paddingTop: 20,
          }}
        >
          <View style={styles.section}>
            <Text>
              Creating Terms of Use is an essential way to protect your company’s legal interests, manage the use of your website or app, and promote your business as a professional and trustworthy organization.
            </Text>
          </View>
          <View style={styles.section}>
            <Text>
              But it’s not easy to create a Terms of Use agreement that is clear, legally binding, and relevant to your business.
            </Text>
          </View>
          <View style={styles.section}>
            <Text>
              We’re going to talk you through everything you need to include in your Terms of Use agreement to make sure it’s an effective, useful, and professional-looking legal agreement.
            </Text>
          </View>
        </ScrollView>
      </Layout>
    </>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  section: {
    marginBottom: 30,
  },
});
