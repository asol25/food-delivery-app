import * as React from "react";
import { Link } from "react-router-dom";

interface ILoginButtonProps {
	loginWithRedirect: () => Promise<void>;
}

const LoginButton: React.FunctionComponent<ILoginButtonProps> = (props) => {
	const { loginWithRedirect } = props;
	return (
		<>
			<i
				className="ri-login-circle-line text-2xl cursor-pointer"
				onClick={() => loginWithRedirect()}
			/>
		</>
	);
};

export default LoginButton;
