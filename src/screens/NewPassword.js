import React, {useState, useRef} from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
} from 'react-native';
import {Layout, Icon} from '@ui-kitten/components';
import Button from '../components/Button';
import Text from '../components/Text';
import Input from '../components/Input';
import theme from '../constants/theme';
import Header from '../components/Header';

const NewPassword = () => {
  let [newPassword, setNewPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  let [shownPassword, setShownPassword] = useState(false);

  const toggleShownPassword = () => {
    setShownPassword(!shownPassword);
  };

  const renderEyeIcon = iconProps => (
    <TouchableWithoutFeedback onPress={toggleShownPassword}>
      <Icon {...iconProps} name={shownPassword ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const zoomIconRef = useRef();

  const renderCheckMarkIcon = iconProps => (
    <Icon
      {...iconProps}
      ref={zoomIconRef}
      animation="zoom"
      name="checkmark-circle-2"
      fill={canUpdateNewPassword() ? theme.color.primary : theme.color.gray}
    />
  );

  const canUpdateNewPassword = () => {
    if (!newPassword || !confirmPassword || confirmPassword !== newPassword) {
      return false;
    }

    return true;
  };

  return (
    <>
      <Header />
      <Layout style={[styles.container]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'height' : 'height'}
          style={[styles.container]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
              <View>
                <Text style={styles.title}>It’s very easy!</Text>
                <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                    <Input
                      value={newPassword}
                      label="New password"
                      placeholder="Enter new password"
                      accessoryRight={renderEyeIcon}
                      onChangeText={nextValue => setNewPassword(nextValue)}
                      secureTextEntry
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Input
                      value={confirmPassword}
                      label="Confirm password"
                      placeholder="Enter confirm password"
                      accessoryRight={renderCheckMarkIcon}
                      onChangeText={nextValue => setConfirmPassword(nextValue)}
                      secureTextEntry
                    />
                  </View>
                </View>
              </View>
              <View style={styles.footer}>
                <Button
                  disabled={!canUpdateNewPassword()}
                  icon="arrow-forward-outline">
                  Complete
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Layout>
    </>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  footer: {
    justifyContent: 'flex-end',
  },
  formContainer: {
    paddingVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
});
