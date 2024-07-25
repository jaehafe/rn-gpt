import {useContext} from 'react';

import {AuthContext} from './AuthContext';

const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (authContext === null || authContext === undefined) {
    throw new Error('useAdminContext는 Admin Provider 안에서 사용해야 합니다.');
  }

  return authContext;
};

export default useAuthContext;
