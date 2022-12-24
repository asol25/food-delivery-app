import * as React from "react";

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
