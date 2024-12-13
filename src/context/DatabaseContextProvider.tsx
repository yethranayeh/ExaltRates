import { PropsWithChildren } from "react";
import { DatabaseContext } from "./DatabaseContext";
import { db } from "./db";

export const DatabaseContextProvider = (props: PropsWithChildren) => (
	<DatabaseContext.Provider value={db}>{props.children}</DatabaseContext.Provider>
);
