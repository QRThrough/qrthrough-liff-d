import { createContext, useContext } from "react";
import { TuserData } from "../types";

type TuserContext = {
	userData: TuserData;
	setUserData: React.Dispatch<React.SetStateAction<TuserData>>;
};

export const UserDataContext = createContext<TuserContext>({
	userData: null,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setUserData: () => {},
});
export const useUserDataContext = () => useContext(UserDataContext);
