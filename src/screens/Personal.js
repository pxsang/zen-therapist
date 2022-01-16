import React, {useState} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {Layout, Button as UIButton, Icon} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Text from '../components/Text';
import Image from '../components/Image';
import Button from '../components/Button';
import Input from '../components/Input';
import Header from '../components/Header3';
import BottomActions from '../components/BottomActions';
import theme from '../constants/theme';
import {updateProfile} from '../redux/actions/user';
import {GENDER} from '../constants/Constants';
import t from '../i18n';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Personal = props => {
  const dispatch = useDispatch();
  const safeArea = useSafeAreaInsets();

  let [isLoading, setLoading] = useState(false);
  let [isFailed, setFailed] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');
  let [isOpenBottomAction, setOpenBottomAction] = useState(false);
  let [formData, setFormData] = useState({
    gender: GENDER.MALE,
    name: '',
    permanent_address: '',
    old_password: 'default',
    new_password: '',
    confirm_password: '',
    email: '',
    avatar: '',
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

  const onOpen = () => {
    setOpenBottomAction(true);
  };

  const onChooseFromLibrary = () => {
    ImagePicker.openPicker({
      width: 250,
      height: 250,
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
    }).then(image => {
      if (image) {
        console.log('image', image);
        handlePickPhoto(image);
      }
    });
  };

  const onTakePhoto = () => {
    ImagePicker.openCamera({
      width: 250,
      height: 250,
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
    }).then(image => {
      if (image) {
        console.log('image', image);
        handlePickPhoto(image);
      }
    });
  };

  const handlePickPhoto = image => {
    setFormData({
      ...formData,
      avatar: image.path,
      avatarBase64Data: `data:${image.mime};base64,${image.data}`,
    });
  };

  const handleCompleteProfile = async () => {
    try {
      setLoading(true);
      await dispatch(
        updateProfile({
          ...formData,
          avatar: formData.avatarBase64Data || formData.avatar,
        }),
      );
    } catch (error) {
      console.log('error', error);
      setFailed(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formValidation = () => {
    const {name, email, new_password} = formData;

    return name && email && new_password && new_password.length >= 6;
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
      <Layout style={styles.container(safeArea)}>
        <KeyboardAwareScrollView>
          <View style={styles.content}>
            <View style={styles.header}>
              <TouchableWithoutFeedback onPress={() => onOpen()}>
                <View style={styles.avatarContainer}>
                  <Image
                    style={styles.avatarImage}
                    source={
                      formData.avatar
                        ? {
                            uri: formData.avatar,
                          }
                        : require('../assets/icons/avatar.png')
                    }
                  />
                  <View style={styles.cameraIconContainer}>
                    <Icon
                      name="camera-outline"
                      fill={theme.color.gray}
                      style={styles.cameraIcon}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.genderContainer}>
                <UIButton
                  appearance={
                    formData.gender === GENDER.MALE ? 'filled' : 'outline'
                  }
                  style={[styles.genderButton, styles.genderButtonLeft]}
                  onPress={() =>
                    setFormData({
                      ...formData,
                      gender: GENDER.MALE,
                    })
                  }>
                  {t('male')}
                </UIButton>
                <UIButton
                  appearance={
                    formData.gender === GENDER.FEMALE ? 'filled' : 'outline'
                  }
                  style={[styles.genderButton, styles.genderButtonRight]}
                  onPress={() =>
                    setFormData({
                      ...formData,
                      gender: GENDER.FEMALE,
                    })
                  }>
                  {t('female')}
                </UIButton>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Input
                value={formData.name}
                label={t('full_name')}
                placeholder={t('enter_your_full_name')}
                onChangeText={nextValue =>
                  setFormData({
                    ...formData,
                    name: nextValue,
                  })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                autoCompleteType="email"
                keyboardType="email-address"
                value={formData.email}
                label={t('email')}
                placeholder={t('enter_your_email')}
                onChangeText={nextValue =>
                  setFormData({
                    ...formData,
                    email: nextValue,
                  })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                value={formData.permanent_address}
                label={t('address')}
                placeholder={t('enter_your_address')}
                onChangeText={nextValue =>
                  setFormData({
                    ...formData,
                    permanent_address: nextValue,
                  })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                value={formData.new_password}
                label={t('password')}
                placeholder={t('enter_your_password')}
                accessoryRight={renderEyeIcon}
                onChangeText={nextValue =>
                  setFormData({
                    ...formData,
                    new_password: nextValue,
                    confirm_password: nextValue,
                  })
                }
                caption={t('password_caption')}
                secureTextEntry={!shownPassword}
              />
            </View>
            <View style={styles.footer}>
              {renderError()}
              <Button
                icon="arrow-forward-outline"
                isLoading={isLoading}
                disabled={!formValidation()}
                onPress={handleCompleteProfile}>
                {t('create_account')}
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Layout>
      <BottomActions
        isVisible={isOpenBottomAction}
        onClose={() => setOpenBottomAction(false)}
        actions={[
          {
            title: 'Choose from library',
            onPress: onChooseFromLibrary,
          },
          {
            title: 'Take a photo',
            onPress: onTakePhoto,
          },
        ]}
      />
    </>
  );
};

export default Personal;

const styles = StyleSheet.create({
  container: safeArea => ({
    flex: 1,
    paddingBottom: safeArea.bottom,
  }),
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
    paddingBottom: 80,
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
    alignItems: 'center',
    paddingVertical: 20,
  },
  form: safeArea => ({
    flex: 1,
    paddingBottom: safeArea.bottom || 20,
  }),
  footer: {
    marginTop: 20,
  },
  avatarContainer: {
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
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
  cameraIconContainer: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    width: 48,
    height: 48,
  },
  errorIcon: {
    width: 24,
    height: 24,
  },
});
