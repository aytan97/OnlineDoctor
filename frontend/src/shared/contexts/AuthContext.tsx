import React, {
  createContext,
  useCallback,
  useContext,
} from "react";
import { AuthContextType } from "../../redux/features/auth/type";
import { useAppDispatch } from "../../redux/hooks";
import { authLogin, authLogout } from "../../redux/features/auth/authSlice";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();

  const loginAuth = async (
    email: string,
    password: string,
  ): Promise<void> => {
    try {
      await dispatch(authLogin({ email, password })).unwrap();

    } catch (e) {
      throw new Error("An error occurred while login.");
    }
  };

  const logoutAuth = useCallback((): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("profileImage");
    dispatch(authLogout());
  }, []);




  const value: AuthContextType = {
    loginAuth,
    logoutAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
