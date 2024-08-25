import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

// Initialize state from localStorage
const initialState = {
  isAuthenticated: false,
  user: null,
};

// Retrieve stored user info if it exists
const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
if (storedUserInfo) {
  initialState.isAuthenticated = true;
  initialState.user = storedUserInfo;
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // Store user info in localStorage on login
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      // Clear user info from localStorage on logout
      localStorage.removeItem('userInfo');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Optional: Handle state rehydration from localStorage
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUserInfo) {
      dispatch({ type: 'LOGIN', payload: storedUserInfo });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };