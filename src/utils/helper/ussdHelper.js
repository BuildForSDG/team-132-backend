import User from '../../models/ussdUserModel';

export const checkUser = async (phoneNumber) => {
  try {
    const user = await User.findOne({ phoneNumber });
    // eslint-disable-next-line max-len
    if (user && user.fullName !== undefined && user.email !== undefined && user.idNumber !== undefined) {
      return user;
    }
    return undefined;
  } catch (err) {
    return undefined;
  }
};

export const ussdLevels = {
  home: 'home',
  userRegister0: 'userRegister0',
  userRegister1: 'userRegister1',
  userRegister2: 'userRegister2',
  userRegister3: 'userRegister3'
};
