import User from '../../models/ussdUserModel';

export const checkUser = async (phoneNumber) => {
  const user = await User.findOne({ phoneNumber });
  // eslint-disable-next-line max-len
  if (user && user.fullName !== undefined && user.email !== undefined && user.idNumber !== undefined) {
    return user;
  }
  return undefined;
};

export const ussdLevels = {
  home: 'home',
  upload1: 'upload1',
  upload2: 'upload2',
  upload3: 'upload3',
  upload4: 'upload4',
  upload5: 'upload5',
  userRegister0: 'userRegister0',
  userRegister1: 'userRegister1',
  userRegister2: 'userRegister2',
  userRegister3: 'userRegister3'
};
