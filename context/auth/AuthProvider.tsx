import { FC, useEffect, useMemo, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { tesloApi } from '@/apiaxios';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

export const AuthInitialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const { replace, reload, query } = useRouter()
  const {data, status} = useSession()
  const [state, dispatch] = useReducer(authReducer, AuthInitialState);

  useEffect(() => {
    if ( status === 'authenticated') {
      dispatch({type: 'Auth - Login', payload: data?.user as IUser})
    }
  }, [status, data])
  

  // const onCheckToken = async () => {
  //   if (!Cookies.get('token')) {
  //     return;
  //   }
  //   try {
  //     const { data } = await tesloApi.get('/user/validate-token');
  //     const { token, user } = data;
  //     Cookies.set('token', token);
  //     dispatch({ type: 'Auth - Login', payload: user });
  //     // replace('/')
  //   } catch (error) {
  //     Cookies.remove('token');
  //   }
  // }

  // useEffect(() => {
  //   onCheckToken()
  // }, [])

  const onLoginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: 'Auth - Login', payload: user });
      return true;
    } catch (error) {
      return false;
    }
  }

  const onRegisterUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string; }> => {
    try {
      const { data } = await tesloApi.post('/user/register', { name, email, password });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: 'Auth - Login', payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message
        }
      }
      return {
        hasError: true,
        message: 'No se pudo crear el usuario, intente de nuevo'
      }
    }
  }

  const onLogout = () => {
    Cookies.remove('cart');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('zip');
    Cookies.remove('city');
    Cookies.remove('country');
    Cookies.remove('phone');
    signOut();

    // Cookies.remove('token');
    // reload();
  }
  return (
    <AuthContext.Provider value={{ ...state, onLoginUser, onRegisterUser, onLogout }}>
      {children}
    </AuthContext.Provider>
  )
};