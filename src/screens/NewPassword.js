import React, {useState, useRef, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Layout, Icon} from '@ui-kitten/components';
import Button from '../components/Button';
import Text from '../components/Text';
import Input from '../components/Input';
import theme from '../constants/theme';
import Header from '../components/Header';
import {setPassword} from '../redux/actions/user';
import t from '../i18n';

const NewPassword = props => {
  const dispatch = useDispatch();
  // const UserState = useSelector(state => state.User);
  // const {isLoading, isSuccessful, isFailed, errorMessage} = UserState.updatePassword;

  const {navigation} = props;
  let [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });
  let [shownCurrentPassword, setShownCurrentPassword] = useState(false);
  let [shownNewPassword, setShownNewPassword] = useState(false);
  let [isLoading, setLoading] = useState(false);
  let [isFailed, setFailed] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');

  // useEffect(() => {
  //   if (isSuccessful) {
  //     navigation.goBack();
  //   }
  // }, [isSuccessful, navigation]);

  const renderCurrentPasswordEyeIcon = iconProps => (
    <TouchableWithoutFeedback
      onPress={() => setShownCurrentPassword(!shownCurrentPassword)}>
      <Icon {...iconProps} name={shownCurrentPassword ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderNewPasswordEyeIcon = iconProps => (
    <TouchableWithoutFeedback
      onPress={() => setShownNewPassword(!shownNewPassword)}>
      <Icon {...iconProps} name={shownNewPassword ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const zoomIconRef = useRef();

  const renderCheckMarkIcon = iconProps => (
    <Icon
      {...iconProps}
      ref={zoomIconRef}
      animation="zoom"
      name="checkmark-circle-2"
      fill={isEqualConfirmPassword() ? theme.color.primary : theme.color.gray}
    />
  );

  const isEqualConfirmPassword = () => {
    const {new_password, confirm_password} = formData;

    return confirm_password && confirm_password === new_password;
  };

  const canSubmit = () => {
    const {new_password, confirm_password} = formData;

    return (
      isEqualConfirmPassword() &&
      new_password &&
      new_password.length >= 6 &&
      confirm_password &&
      confirm_password.length >= 6
    );
  };

  const handleSetPassword = async () => {
    try {
      setLoading(true);
      setFailed(false);
      setErrorMessage('');
      await dispatch(setPassword(formData));
      navigation.navigate('Dashboard');
    } catch (error) {
      console.log('error', error);
      setFailed(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderError = () => {
    if (!isFailed) return null;

    return (
      <View>
        <View style={theme.block.rowMiddle}>
          <Icon
            style={styles.errorIcon}
            fill={theme.color.error}
            name="alert-triangle-outline"
          />
          <View width={10} />
          <Text color={theme.color.error}>{errorMessage}</Text>
        </View>
        <View height={10} />
      </View>
    );
  };

  return (
    <>
      <Header {...props} />
      <Layout style={[styles.container]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'height' : 'height'}
          style={[styles.container]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.content}>
              <View>
                <Text style={styles.title}>{t('very_easy')}</Text>
                <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                    <Input
                      value={formData.new_password}
                      label={t('new_password')}
                      caption={t('password_caption')}
                      placeholder={t('enter_new_password')}
                      accessoryRight={renderNewPasswordEyeIcon}
                      onChangeText={nextValue =>
                        setFormData({...formData, new_password: nextValue})
                      }
                      secureTextEntry={!shownNewPassword}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Input
                      value={formData.confirm_password}
                      label={t('confirm_password')}
                      placeholder={t('enter_confirm_password')}
                      accessoryRight={renderCheckMarkIcon}
                      onChangeText={nextValue =>
                        setFormData({...formData, confirm_password: nextValue})
                      }
                      secureTextEntry
                    />
                  </View>
                </View>
              </View>
              <View style={styles.footer}>
                {renderError()}
                <Button
                  isLoading={isLoading}
                  disabled={!canSubmit()}
                  onPress={handleSetPassword}
                  icon="arrow-forward-outline">
                  {t('complete')}
                </Button>
              </View>
            </ScrollView>
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
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.l,
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
  errorIcon: {
    width: 24,
    height: 24,
  },
});
