import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../../../components/Text';
import Image from '../../../components/Image';
import {USER_STATUS} from '../../../constants/Constants';

const UnVerifiedUser = ({userStatus}) => {
  return (
    <View style={styles.container}>
      <Text center bold size={24}>
        {userStatus === USER_STATUS.REJECTED
          ? 'Tài khoản chưa kích hoạt'
          : 'Tài khoản đang được chờ được xác thực'}
      </Text>
      <Image
        source={require('../../../assets/images/enable-location.png')}
        style={styles.image}
      />
      {userStatus === USER_STATUS.REJECTED && (
        <Text center>Chúng tôi đang duyệt hồ sơ đăng ký của bạn.</Text>
      )}
      <Text center>
        Vui lòng liên lạc với chúng tôi qua số hotline 0707269001 để được hỗ
        trợ.
      </Text>
    </View>
  );
};

export default UnVerifiedUser;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 15,
  },
  button: {
    width: '100%',
  },
});
