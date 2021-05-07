import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button as UIButton, Icon, Spinner} from '@ui-kitten/components';
import theme from '../constants/theme';

const Button = ({
  appearance = 'filled',
  children,
  icon,
  disabled,
  isLoading,
  ...otherProps
}) => {
  const borderRadius = appearance === 'rounded' ? 20 : 6;
  const height = appearance === 'rounded' ? 40 : 55;

  const ButtonIcon = iconProps => (
    <Icon {...iconProps} style={[iconProps.style, styles.icon]} name={icon} />
  );

  const LoadingIndicator = () => (
    <View style={{ justifyContent: 'center',
    alignItems: 'center' }}>
      <Spinner size="small" />
    </View>
  );

  const renderRightIcon = () => {
    if (isLoading) {
      return LoadingIndicator;
    }

    return icon ? ButtonIcon : null;
  };

  return (
    <UIButton
      {...otherProps}
      disabled={isLoading || disabled}
      appearance={appearance !== 'rounded' ? appearance : 'filled'}
      accessoryRight={renderRightIcon()}
      style={[
        styles.button,
        {
          height,
          borderRadius,
          // backgroundColor: disabled ? 'white' : styles.button.backgroundColor,
        },
        appearance === 'rounded' && {
          ...{paddingVertical: 0, justifyContent: 'center'},
        },
        disabled && {...{backgroundColor: 'white'}},
      ]}>
      {children}
    </UIButton>
  );
};

export default Button;

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
  button: {
    paddingHorizontal: theme.spacing.l,
    justifyContent: 'space-between',
  },
});
