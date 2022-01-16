import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {Layout, Button as UIButton, Icon} from '@ui-kitten/components';
import ImagePicker from 'react-native-image-crop-picker';
import Button from '../components/Button';
import Image from '../components/Image';
import Header from '../components/Header3';
import BottomActions from '../components/BottomActions';
import Input from '../components/Input';
import theme from '../constants/theme';
import Text from '../components/Text';
import {GENDER} from '../constants/Constants';
import {updateProfile} from '../redux/actions/user';
import t from '../i18n';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const UpdateProfile = props => {
  const dispatch = useDispatch();
  const safeArea = useSafeAreaInsets();
  const UserState = useSelector(state => state.User);
  const {userInfo} = UserState;
  const {navigation} = props;
  let [isOpenBottomAction, setOpenBottomAction] = useState(false);
  let [isLoading, setLoading] = useState(false);
  let [formData, setFormData] = useState({
    gender: userInfo.gender?.toLowerCase() || GENDER.MALE,
    name: userInfo.name,
    permanent_address: userInfo.permanent_address,
    email: userInfo.email,
    avatar: userInfo.avatar,
  });

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

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      await dispatch(
        updateProfile({
          ...formData,
          avatar: formData.avatarBase64Data || formData.avatar,
        }),
      );
      navigation.goBack();
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const renderNameError = () => {
    if (formData.name) return null;

    return (
      <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>
        <Icon
          style={{
            width: 24,
            height: 24,
            marginRight: 10,
          }}
          fill={theme.color.error}
          name="alert-triangle-outline"
        />
        <Text color={theme.color.error}>{t('field_is_required')}</Text>
      </View>
    );
  };

  return (
    <>
      <Header {...props} title={t('edit_profile')} />
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
                status={!formData.name ? 'danger' : 'basic'}
                caption={renderNameError()}
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
            <View style={styles.footer}>
              <Button
                icon="arrow-forward-outline"
                disabled={!formData.name}
                isLoading={isLoading}
                onPress={handleUpdateProfile}>
                {t('update_profile')}
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

export default UpdateProfile;

const styles = StyleSheet.create({
  container: safeArea => ({
    flex: 1,
  }),
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: Platform.OS === 'ios' ? 0 : 20,
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
  form: safeArea => ({
    // height: '100%',
    marginTop: 20,
    paddingVertical: 20,
    paddingBottom: safeArea.bottom || 20,
  }),
  footer: {
    marginTop: 20,
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
});
