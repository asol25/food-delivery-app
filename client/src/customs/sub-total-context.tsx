import * as React from "react";

type Action =
	| { type: "int"; value: number }
	| { type: "increment"; value: number }
	| { type: "decrement"; value: number };

type Dispatch = (action: Action) => void;
type State = { count: number };
type CountProviderProps = { children: React.ReactNode };

const CountStateContext = React.createContext<{ total: State; dispatch: Dispatch } | undefined>(
	undefined
);

function countReducer(state: State, action: Action) {
	switch (action.type) {
		case "int": {
			return { count: action.value };
		}
		case "increment": {
			return { count: state.count + action.value };
		}
		case "decrement": {
			return { count: state.count - action.value };
		}
		default: {
			throw new Error(`Unhandled action type: ${action}`);
		}
	}
}

function CountProvider({ children }: CountProviderProps) {
	const [total, dispatch] = React.useReducer(countReducer, { count: 0 });
	const value = { total, dispatch };
	return <CountStateContext.Provider value={value}>{children}</CountStateContext.Provider>;
}

function useCount() {
	const context = React.useContext(CountStateContext);
	if (context === undefined) {
		throw new Error("useCount must be used within a CountProvider");
	}
	return context;
}

export { CountProvider, useCount };
