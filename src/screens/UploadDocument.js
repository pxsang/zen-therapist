import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import BottomActions from '../components/BottomActions';
import GhostButton from '../components/GhostButton';
import Button from '../components/Button';
import Image from '../components/Image';
import Text from '../components/Text';
import Header from '../components/Header';
import theme from '../constants/theme';
import {updateProfile} from '../redux/actions/user';
import t from '../i18n';

const {width} = Dimensions.get('screen');
const ID_CARD_WIDTH = (width - theme.spacing.m * 2 - 15) / 2;

const DOCUMENT_TYPE = {
  ID_CARD_FRONT: 0,
  ID_CARD_BACK: 1,
  MASSAGE_CERTIFICATE_FRONT: 2,
};

const UploadDocument = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const safeArea = useSafeAreaInsets();

  let [isLoading, setLoading] = useState(false);
  let [isOpenBottomAction, setOpenBottomAction] = useState(false);
  let [selectedDocumentType, setSelectedDocumentType] = useState();
  let [formData, setFormData] = useState({
    idCardFront: '',
    idCardBack: '',
    massageCertificateFront: '',
  });

  const onOpen = documentType => {
    setSelectedDocumentType(documentType);
    setOpenBottomAction(true);
  };

  const onChooseFromLibrary = () => {
    ImagePicker.openPicker({
      width: 296,
      height:
        selectedDocumentType === DOCUMENT_TYPE.MASSAGE_CERTIFICATE_FRONT
          ? 444
          : 192,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      if (image) {
        console.log('image', image);
        handlePickPhoto(image);
      }
    });
  };

  const onTakePhoto = () => {
    ImagePicker.openCamera({
      width: 296,
      height:
        selectedDocumentType === DOCUMENT_TYPE.MASSAGE_CERTIFICATE_FRONT
          ? 444
          : 192,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      if (image) {
        console.log('image', image);
        handlePickPhoto(image);
      }
    });
  };

  const handlePickPhoto = image => {
    switch (selectedDocumentType) {
      case DOCUMENT_TYPE.ID_CARD_FRONT:
        setFormData({
          ...formData,
          idCardFront: image.path,
          idCardFrontBase64Data: `data:${image.mime};base64,${image.data}`,
        });
        break;
      case DOCUMENT_TYPE.ID_CARD_BACK:
        setFormData({
          ...formData,
          idCardBack: image.path,
          idCardBackBase64Data: `data:${image.mime};base64,${image.data}`,
        });
        break;
      case DOCUMENT_TYPE.MASSAGE_CERTIFICATE_FRONT:
        setFormData({
          ...formData,
          massageCertificateFront: image.path,
          massageCertificateFrontBase64Data: `data:${image.mime};base64,${image.data}`,
        });
        break;

      default:
        break;
    }
  };

  const canSubmit = () => Object.keys(formData).every(key => !!formData[key]);

  const handleUploadDocument = async () => {
    try {
      setLoading(true);
      await dispatch(
        updateProfile({
          identity_card_front: formData.idCardFrontBase64Data,
          identity_card_back: formData.idCardBackBase64Data,
          massage_certificate_front: formData.massageCertificateFrontBase64Data,
        }),
      );

      navigation.navigate('Dashboard');
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header {...props} />
      <Layout style={styles.container(safeArea)}>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.title}>{t('upload_document_title')}</Text>
            <Text style={styles.greeting}>
              {t('upload_document_description')}
            </Text>
          </View>
          <View height={20} />
          <View>
            <View>
              <Text semiBold size={16}>
                {t('id_card')}
              </Text>
              <View height={15} />
              <View style={theme.block.rowMiddle}>
                <TouchableWithoutFeedback
                  onPress={() => onOpen(DOCUMENT_TYPE.ID_CARD_FRONT)}>
                  <View style={styles.idCardContainer}>
                    {!formData.idCardFront ? (
                      <>
                        <Text size={16} color="#A39CAB">
                          {t('id_card')}
                        </Text>
                        <Text color="#A39CAB">{t('frontend')}</Text>
                      </>
                    ) : (
                      <Image
                        source={{uri: formData.idCardFront}}
                        style={styles.documentImage}
                      />
                    )}
                  </View>
                </TouchableWithoutFeedback>
                <View width={15} />
                <TouchableWithoutFeedback
                  onPress={() => onOpen(DOCUMENT_TYPE.ID_CARD_BACK)}>
                  <View style={styles.idCardContainer}>
                    {!formData.idCardBack ? (
                      <>
                        <Text size={16} color="#A39CAB">
                          {t('id_card')}
                        </Text>
                        <Text color="#A39CAB">{t('backend')}</Text>
                      </>
                    ) : (
                      <Image
                        source={{uri: formData.idCardBack}}
                        style={styles.documentImage}
                      />
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View height={30} />
            <View>
              <Text semiBold size={16}>
                {t('massage_certificate')}
              </Text>
              <View height={15} />
              <View>
                <TouchableWithoutFeedback
                  onPress={() =>
                    onOpen(DOCUMENT_TYPE.MASSAGE_CERTIFICATE_FRONT)
                  }>
                  <View style={styles.certificateContainer}>
                    {!formData.massageCertificateFront ? (
                      <>
                        <Text size={16} color="#A39CAB">
                          {t('certificate')}
                        </Text>
                        <Text color="#A39CAB">{t('frontend')}</Text>
                      </>
                    ) : (
                      <Image
                        source={{uri: formData.massageCertificateFront}}
                        style={styles.documentImage}
                      />
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
          <View height={20} />
          <View>
            <GhostButton>
              <Text>
                <Text>{t('sign_up__condition')} </Text>
                <Text bold>{t('terms_of_service')}</Text>
                <Text> {t('and')} </Text>
                <Text bold>{t('privacy_policy')}</Text>
              </Text>
            </GhostButton>
          </View>

          <View style={styles.footer}>
            <Button
              isLoading={isLoading}
              disabled={!canSubmit()}
              onPress={() => handleUploadDocument()}
              icon="arrow-forward-outline">
              {t('submit_to_complete')}
            </Button>
          </View>
        </ScrollView>
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

export default UploadDocument;

const styles = StyleSheet.create({
  container: safeArea => ({
    flex: 1,
    paddingBottom: safeArea.bottom,
  }),
  content: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.l,
  },
  contentContainer: {
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
  },
  idCardContainer: {
    backgroundColor: '#FAF9FA',
    borderWidth: 1,
    borderColor: '#A39CAB',
    borderStyle: 'dashed',
    borderRadius: 12,
    width: ID_CARD_WIDTH,
    height: ID_CARD_WIDTH / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  certificateContainer: {
    backgroundColor: '#FAF9FA',
    borderWidth: 1,
    borderColor: '#A39CAB',
    borderStyle: 'dashed',
    borderRadius: 12,
    width: ID_CARD_WIDTH,
    height: ID_CARD_WIDTH * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  documentImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});
