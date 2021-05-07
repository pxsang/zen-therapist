import React, {useState} from 'react';
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import Button from '../components/Button';
import Input from '../components/Input';
import Header from '../components/Header';
import theme from '../constants/theme';

import {completeProfile} from '../redux/actions/user';

const SignUp = props => {
  const User = useSelector(state => state.User);
  const dispatch = useDispatch();
  const {navigation} = props;
  const safeArea = useSafeAreaInsets();

  let [formData, setFormData] = useState({
    id: User.userInfo.id,
    gender: 'male',
    firstName: '',
    lastName: '',
    address: '',
    password: '',
  });
  let [shownPassword, setShownPassword] = useState(false);

  const toggleShownPassword = () => {
    setShownPassword(!shownPassword);
  };

  const renderEyeIcon = iconProps => (
    <TouchableWithoutFeedback onPress={toggleShownPassword}>
      <Icon {...iconProps} name={shownPassword ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const handleCompleteProfile = async () => {
    const result = dispatch(completeProfile(formData));
    console.log('handleCompleteProfile', result);
    if (result) {
      navigation.navigate('Registered');
    }
  }

  return (
    <>
      <Header {...props} />
      <Layout style={styles.container(safeArea)}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={200}
          behavior={Platform.OS === 'ios' ? 'height' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.avatarContainer}>
                  <Image
                    style={styles.avatarImage}
                    source={require('../assets/icons/avatar.png')}
                  />
                </View>
                <View style={styles.genderContainer}>
                  <UIButton
                    appearance={
                      formData.gender === 'male' ? 'filled' : 'outline'
                    }
                    style={[styles.genderButton, styles.genderButtonLeft]}
                    onPress={() =>
                      setFormData({
                        ...formData,
                        gender: 'male',
                      })
                    }>
                    Male
                  </UIButton>
                  <UIButton
                    appearance={
                      formData.gender === 'female' ? 'filled' : 'outline'
                    }
                    style={[styles.genderButton, styles.genderButtonRight]}
                    onPress={() =>
                      setFormData({
                        ...formData,
                        gender: 'female',
                      })
                    }>
                    Female
                  </UIButton>
                </View>
              </View>
              <ScrollView
                style={styles.form}
                showsVerticalScrollIndicator={false}>
                <View style={styles.inputContainer}>
                  <Input
                    value={formData.firstName}
                    label="First name"
                    placeholder="Enter your First name"
                    onChangeText={nextValue =>
                      setFormData({
                        ...formData,
                        firstName: nextValue,
                      })
                    }
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Input
                    value={formData.lastName}
                    label="Last name"
                    placeholder="Enter your Last name"
                    onChangeText={nextValue =>
                      setFormData({
                        ...formData,
                        lastName: nextValue,
                      })
                    }
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Input
                    value={formData.address}
                    label="Address"
                    placeholder="Enter your address"
                    onChangeText={nextValue =>
                      setFormData({
                        ...formData,
                        address: nextValue,
                      })
                    }
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Input
                    value={formData.password}
                    label="Password"
                    placeholder="Enter your password"
                    accessoryRight={renderEyeIcon}
                    onChangeText={nextValue =>
                      setFormData({
                        ...formData,
                        password: nextValue,
                      })
                    }
                    secureTextEntry={!shownPassword}
                  />
                </View>
                <View style={styles.footer}>
                  <Button
                    icon="arrow-forward-outline"
                    // disabled
                    onPress={handleCompleteProfile}>
                    Create Account
                  </Button>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Layout>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: safeArea => ({
    flex: 1,
    paddingBottom: safeArea.bottom,
  }),
  content: {
    paddingHorizontal: theme.spacing.m,
  },
  genderButton: {
    height: 42,
    width: '50%',
    borderRadius: 0,
  },
  genderButtonLeft: {
    marginRight: 5,
  },
  genderButtonRight: {
    marginLeft: 5,
  },
  header: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    top: -71,
    height: 142,
    zIndex: 99,
  },
  form: {
    marginTop: 125,
    paddingVertical: 40,
    height: '100%',
  },
  footer: {
    marginTop: 20,
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
  genderContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
});
