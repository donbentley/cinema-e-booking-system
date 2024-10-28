import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EditProfile } from "../components/EditProfile";
import ResetPassword from "../components/ResetPassword"; // Correct import
import BillingAddress from "../components/BillingAddress";
import PaymentCard from "../components/PaymentCard";
import { Navbar } from "../components/Navbar";

const ProfilePage = () => {

	const navigate = useNavigate();

	const [activeComponent, setActiveComponent] = useState("editProfile");

	const [user, setUser] = useState(null);

	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/");
		}
		axios
			.get("http://localhost:8080/customer/customer-info", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((response) => {
				if (response.status >= 400) {
					throw new Error("Error fetching user data");
				}
				setUser(response.data);
			})
			.catch((err) => {
				alert(err);
			});
	}, [navigate]);

	const renderComponent = () => {
		switch (activeComponent) {
			case "editProfile":
				return <EditProfile user={user}/>;
			case "resetPassword":
				return <ResetPassword user={user}/>;
			case "billingAddress":
				return <BillingAddress user={user}/>;
			case "paymentCard":
				return <PaymentCard user={user}/>;
			default:
				return <EditProfile />;
		}
	};

	const buttonClasses = (component) => {
		return activeComponent === component
			? "rounded-full bg-gray-600 px-3 py-2 text-sm font-semibold text-white" // Active button styles
			: "rounded-full bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"; // Inactive button styles
	};

	return (
		<div>
			<Navbar />
			<div className="mt-10 mx-auto max-w-4xl p-6 md:p-10 bg-white rounded-lg shadow-lg">
				<div className="flex justify-around">
					<button
						onClick={() => setActiveComponent("editProfile")}
						className={buttonClasses("editProfile")}
					>
						Edit Profile
					</button>
					<button
						onClick={() => setActiveComponent("resetPassword")}
						className={buttonClasses("resetPassword")}
					>
						Reset Password
					</button>
					<button
						onClick={() => setActiveComponent("paymentCard")}
						className={buttonClasses("paymentCard")}
					>
						Edit Payment Card
					</button>
					<button
						onClick={() => setActiveComponent("billingAddress")}
						className={buttonClasses("billingAddress")}
					>
						Edit Billing Address
					</button>
				</div>
				{renderComponent()}
			</div>
		</div>
	);
};

export default ProfilePage;
