import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { mutate } from 'swr';
import apiPromise from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [
        token,
        user,
        tickets,
        ticketsMe,
        ticketsClients,
      ] = await AsyncStorage.multiGet([
        '@MeSalva:token',
        '@MeSalva:user',
        '@MeSalva:tickets',
        '@MeSalva:tickets/me',
        '@MeSalva:tickets/clients',
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
        const api = await apiPromise();
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        if (tickets[1]) {
          await mutate('tickets', JSON.parse(tickets[1]));
        } else {
          await mutate(
            'tickets',
            api.get('tickets').then(res => res.data),
          );
        }

        if (ticketsMe[1]) {
          await mutate('tickets/me', JSON.parse(ticketsMe[1]));
        } else {
          await mutate(
            'tickets/me',
            api.get('tickets/me').then(res => res.data),
          );
        }

        if (ticketsClients[1]) {
          await mutate('tickets/clients', JSON.parse(ticketsClients[1]));
        } else {
          await mutate(
            'tickets/clients',
            api.get('tickets/clients').then(res => res.data),
          );
        }
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const api = await apiPromise();
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@MeSalva:token', token],
      ['@MeSalva:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    await mutate(
      'tickets',
      api.get('tickets').then(res => res.data),
    );

    await mutate(
      'tickets/me',
      api.get('tickets/me').then(res => res.data),
    );

    await mutate(
      'tickets/clients',
      api.get('tickets/clients').then(res => res.data),
    );

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@MeSalva:token', '@MeSalva:user']);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@MeSalva:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within as AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
