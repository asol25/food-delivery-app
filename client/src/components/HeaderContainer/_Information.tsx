/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { User } from "@auth0/auth0-react";
import Button from "@mui/material/Button/Button";
import * as React from "react";

type Information =
	| "amount"
	| "bankCode"
	| "language"
	| "orderInfo"
	| "redirectUri"
	| "address_one"
	| "address_two"
	| "phone_one"
	| "phone_two";

interface IInformationProps {
	user: User | undefined;
	paymentLink: string;
	activeStep: number;
	handleChangeInformation: (name: Information, value: number | string) => void;
	handleNext: (operator: boolean) => Promise<void>;
}

const ProcessInformation: React.FunctionComponent<IInformationProps> = (props) => {
	const { user, paymentLink, activeStep, handleChangeInformation, handleNext } = props;
	return (
		<>
			<div className="flex md:flex-row flex-col md:items-center justify-center  gap-8 md:gap-16">
				<div>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						Bank
					</span>
					<br />
					<select
						id="countries"
						className=" bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 min-w-[320px] text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						onChange={(event) => handleChangeInformation("bankCode", event.target.value)}
					>
						<option value="US" selected>
							Choose Bank to Payment
						</option>
						<option value="NCB"> Ngan hang NCB</option>
						<option value="AGRIBANK"> Ngan hang Agribank</option>
						<option value="SCB"> Ngan hang SCB</option>
						<option value="SACOMBANK">Ngan hang SacomBank</option>
						<option value="EXIMBANK"> Ngan hang EximBank</option>
						<option value="MSBANK"> Ngan hang MSBANK</option>
						<option value="NAMABANK"> Ngan hang NamABank</option>
						<option value="VNMART"> Vi dien tu VnMart</option>
						<option value="VIETINBANK">Ngan hang Vietinbank</option>
						<option value="VIETCOMBANK"> Ngan hang VCB</option>
						<option value="HDBANK">Ngan hang HDBank</option>
						<option value="DONGABANK"> Ngan hang Dong A</option>
						<option value="TPBANK"> Ngân hàng TPBank</option>
						<option value="OJB"> Ngân hàng OceanBank</option>
						<option value="BIDV"> Ngân hàng BIDV</option>
						<option value="TECHCOMBANK"> Ngân hàng Techcombank</option>
						<option value="VPBANK"> Ngan hang VPBank</option>
						<option value="MBBANK"> Ngan hang MBBank</option>
						<option value="ACB"> Ngan hang ACB</option>
						<option value="OCB"> Ngan hang OCB</option>
						<option value="IVB"> Ngan hang IVB</option>
						<option value="VISA"> Thanh toan qua VISA/MASTER</option>
						<option value="CA">English</option>
						<option value="FR">Việt Nam</option>
					</select>
				</div>

				<div>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						Language
					</span>
					<br />
					<select
						id="countries"
						className=" bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 min-w-[320px] text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						onChange={(event) => handleChangeInformation("language", event.target.value)}
					>
						<option value="US" selected>
							Choose Language to usage
						</option>
						<option value="EN">English</option>
						<option value="VN">Việt Nam</option>
					</select>
				</div>
			</div>
			<div className="mt-8 flex md:flex-row flex-col md:items-center gap-8 md:gap-16 justify-center">
				<div className="flex flex-col min-w-[320px] ">
					<label className="block">
						<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
							Full name
						</span>
						<input
							type="text"
							name="full-name"
							disabled
							value={user?.nickname}
							className="mt-1 capitalize px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
							placeholder="Jason Alexander"
						/>
					</label>
				</div>
				<div className="flex flex-col min-w-[320px] ">
					<label className="block">
						<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
							Email
						</span>
						<input
							type="email"
							name="email"
							disabled
							value={user?.email}
							className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
							placeholder="you@example.com"
						/>
					</label>
				</div>
			</div>
			<div className="mt-8 flex md:flex-row flex-col md:items-center gap-8 md:gap-16 justify-center">
				<div className="flex flex-col min-w-[320px] ">
					<label className="block">
						<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
							Address
						</span>
						<input
							type="text"
							name="address_one"
							onChange={(event) => handleChangeInformation("address_one", event.target.value)}
							className="mt-1 capitalize px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
							placeholder="Jason Alexander"
						/>
					</label>
				</div>
				<div className="flex flex-col min-w-[320px] ">
					<label className="block">
						<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
							Address Two
						</span>
						<input
							type="text"
							name="address_two"
							onChange={(event) => handleChangeInformation("address_two", event.target.value)}
							className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
							placeholder="you@example.com"
						/>
					</label>
				</div>
			</div>
			<div className="mt-8 flex md:flex-row flex-col md:items-center gap-8 md:gap-16 justify-center">
				<div className="flex flex-col min-w-[320px] ">
					<label className="block">
						<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
							Phone
						</span>
						<input
							type="number"
							name="phone_one"
							onChange={(event) => handleChangeInformation("phone_one", event.target.value)}
							className="mt-1 capitalize px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
							placeholder="Jason Alexander"
						/>
					</label>
				</div>
				<div className="flex flex-col min-w-[320px] ">
					<label className="block">
						<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
							Phone Two
						</span>
						<input
							type="number"
							name="phone_two"
							onChange={(event) => handleChangeInformation("phone_two", event.target.value)}
							className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
							placeholder="you@example.com"
						/>
					</label>
				</div>
			</div>

			<div className="flex flex-row justify-around mt-6">
				{activeStep <= 3 && (
					<Button onClick={() => handleNext(false)}>
						<p className="mx-6">Back</p>
					</Button>
				)}
				<Button onClick={() => handleNext(true)}>
					{paymentLink ? (
						<a href={paymentLink}>Finish</a>
					) : (
						<p className="mx-6"> {activeStep === 2 ? "Finish" : "Next"}</p>
					)}
				</Button>
			</div>
		</>
	);
};

export default ProcessInformation;
