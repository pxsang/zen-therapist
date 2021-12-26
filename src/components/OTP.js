import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const usePrevious = value => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

const OTP = ({value, length, autoFocus, onChangeOTP}) => {
  const [activeInput, setActiveInput] = useState(0);
  const [otpValues, setOTPValues] = useState((value || '').split(''));

  const getRightValue = useCallback(string => {
    let changedValue = string;
    return !changedValue || /\d/.test(changedValue) ? changedValue : '';
  }, []);

  // Focus `inputIndex` input
  const focusInput = useCallback(
    inputIndex => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
    },
    [length],
  );

  // Change OTP value at focussing input
  const changeCodeAtFocus = useCallback(
    string => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeInput] = string[0] || '';
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
    },
    [activeInput, handleOtpChange, otpValues],
  );

  // Helper to return OTP from inputs
  const handleOtpChange = useCallback(
    otp => {
      const otpValue = otp.join('');
      onChangeOTP(otpValue);
    },
    [onChangeOTP],
  );

  // Handle onFocus input
  const handleOnFocus = useCallback(
    index => () => {
      focusInput(index);
    },
    [focusInput],
  );

  // Handle onChange value for each input
  const handleOnChangeText = useCallback(
    newValue => {
      const val = getRightValue(newValue);
      changeCodeAtFocus(val);
      if (!val) {
        focusPrevInput();
      } else {
        focusNextInput();
      }
    },
    [changeCodeAtFocus, focusNextInput, focusPrevInput, getRightValue],
  );

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

  // Hanlde onBlur input
  const handleOnBlur = useCallback(() => {
    setActiveInput(-1);
  }, []);

  const handleOnKeyPress = useCallback(
    ({nativeEvent: {key}}) => {
      switch (key) {
        case 'Backspace':
        case 'Delete': {
          if (otpValues[activeInput]) {
            changeCodeAtFocus('');
          } else {
            focusPrevInput();
          }
          break;
        }
        default:
          break;
      }
    },
    [activeInput, changeCodeAtFocus, focusPrevInput, otpValues],
  );

  return (
    <View style={styles.container}>
      {Array(length)
        .fill('')
        .map((_, index) => (
          <SingleInput
            key={`SingleInput-${index}`}
            focus={activeInput === index}
            autoFocus={autoFocus}
            value={otpValues && otpValues[index]}
            onFocus={handleOnFocus(index)}
            onBlur={handleOnBlur}
            onChangeText={handleOnChangeText}
            onKeyPress={handleOnKeyPress}
          />
        ))}
    </View>
  );
};

export default OTP;

OTP.defaultProps = {
  length: 4,
  autoFocus: true,
};

const SingleInput = props => {
  const {focus, autoFocus, ...rest} = props;
  const inputRef = useRef(null);
  const prevFocus = usePrevious(!!focus);

  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current?.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current?.focus();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return (
    <TextInput
      ref={inputRef}
      keyboardType="number-pad"
      style={styles.otpInput}
      maxLength={1}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  otpInput: {
    width: 76,
    height: 53,
    borderRadius: 12,
    backgroundColor: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#BDBDBD',
    textAlign: 'center',
    shadowColor: '#303030',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 5,
  },
});
