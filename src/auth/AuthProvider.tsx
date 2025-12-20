import type { ReactNode } from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfile, login as loginApi, logout as logoutApi } from '../api/auth';
import type { User } from '../types';

interface AuthContextValue {
  user?: User;
  isAuthed: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthed: false,
  login: async () => undefined,
  logout: () => undefined,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem('accessToken'),
  );

  const profileQuery = useQuery({
    queryKey: ['me'],
    queryFn: getProfile,
    enabled: Boolean(token),
    retry: false,
  });

  useEffect(() => {
    if (!token) {
      queryClient.setQueryData(['me'], undefined);
    }
  }, [token, queryClient]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: profileQuery.data,
      isAuthed: Boolean(profileQuery.data),
      login: async (email: string, password: string) => {
        const res = await loginApi(email, password);
        setToken(res.accessToken);
        await profileQuery.refetch();
      },
      logout: () => {
        logoutApi();
        setToken(null);
        queryClient.clear();
        window.location.href = '/';
      },
    }),
    [profileQuery, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
