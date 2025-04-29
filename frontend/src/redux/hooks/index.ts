import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuthState: TypedUseSelectorHook<boolean> = () =>
    useSelector((state: RootState) => state.auth.isLoggedIn);

// export const useAppSelector: TypedUseSelectorHook<RootState> = () => useSelector<RootState>(state => state);
