/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from "react";

interface IEditProfileProps {}

const EditProfile: React.FunctionComponent<IEditProfileProps> = (props) => (
	<>
		<section className="container">
			<header>Edit Profile Account</header>
			<form action="#" className="form">
				<div className="input-box">
					<label>Full Name</label>
					<input type="text" placeholder="Enter full name" required />
				</div>

				<div className="input-box">
					<label>Email Address</label>
					<input type="text" placeholder="Enter email address" required />
				</div>

				<div className="column">
					<div className="input-box">
						<label>Phone Number</label>
						<input type="number" placeholder="Enter phone number" required />
					</div>
					<div className="input-box">
						<label>Birth Date</label>
						<input type="date" placeholder="Enter birth date" required />
					</div>
				</div>
				<div className="gender-box">
					<h3>Gender</h3>
					<div className="gender-option">
						<div className="gender">
							<input type="radio" id="check-male" name="gender" checked />
							<label htmlFor="check-male">male</label>
						</div>
						<div className="gender">
							<input type="radio" id="check-female" name="gender" />
							<label htmlFor="check-female">Female</label>
						</div>
						<div className="gender">
							<input type="radio" id="check-other" name="gender" />
							<label htmlFor="check-other">prefer not to say</label>
						</div>
					</div>
				</div>
				<div className="input-box address">
					<label>Address</label>
					<input type="text" placeholder="Enter street address" required />
					<input
						type="text"
						placeholder="Enter street address line 2"
						required
					/>
					<div className="column">
						<input type="text" placeholder="Enter your city" required />
					</div>
				</div>
				<button>Save</button>
			</form>
		</section>
	</>
);

export default EditProfile;
