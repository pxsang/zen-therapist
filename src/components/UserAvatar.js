import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Image, {ResizeMode} from './Image';

export default function UserAvatar({...props}) {
  const UserState = useSelector(state => state.User);
  const {userInfo} = UserState;

  let [imageSrc, setImageSrc] = useState();

  useEffect(() => {
    setImageSrc(
      userInfo?.avatar
        ? {uri: userInfo.avatar}
        : require('../assets/icons/user-avatar.png'),
    );
  }, [userInfo.avatar]);

  return (
    <Image
      {...props}
      source={imageSrc}
      resizeMode={ResizeMode.cover}
      onError={() => setImageSrc(require('../assets/icons/user-avatar.png'))}
    />
  );
}
