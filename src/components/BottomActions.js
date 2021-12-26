import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Modalize} from 'react-native-modalize';
import Text from '../components/Text';
import theme from '../constants/theme';
import t from '../i18n';

const BottomActions = ({isVisible, onClose, actions}) => {
  const modalizeRef = useRef(null);
  const safeArea = useSafeAreaInsets();

  useEffect(() => {
    if (isVisible) {
      Keyboard.dismiss();
      modalizeRef.current.open();
    } else {
      modalizeRef.current.close();
    }
  }, [isVisible]);

  const handleClose = () => {
    modalizeRef.current.close();
  };

  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight
      modalStyle={styles.modalStyle(safeArea)}
      handleStyle={styles.handleStyle}
      onClosed={onClose}>
      <>
        <View style={styles.actionsContainer}>
          {actions?.map(({title, onPress}, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                onPress && onPress();
                handleClose();
              }}>
              <View style={styles.action}>
                <Text size={16} color={theme.color.primary}>
                  {title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.actionCancel}>
            <Text size={16} color={theme.color.link}>
              {t('cancel')}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </>
    </Modalize>
  );
};

export default BottomActions;

const styles = StyleSheet.create({
  modalStyle: safeArea => ({
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    marginBottom: safeArea.bottom || 10,
  }),
  handleStyle: {
    display: 'none',
  },
  actionsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 6,
  },
  action: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionCancel: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
