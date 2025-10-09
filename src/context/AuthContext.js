import React from 'react';

export const AuthContext = React.createContext(null);
export const useAuthContext = () => React.useContext(AuthContext);
