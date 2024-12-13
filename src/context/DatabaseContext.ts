import type { Firestore } from "firebase/firestore";
import { createContext } from "react";

export const DatabaseContext = createContext<Firestore>(undefined as any);
