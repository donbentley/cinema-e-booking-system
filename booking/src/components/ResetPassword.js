import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
	const navigate = useNavigate();
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Add password reset logic here
 		if (!(newPassword === confirmPassword)) {
			alert("New password and confirm new password fields do not match");
			return;
		}
 		if (newPassword === currentPassword) {
			alert("New password and current password matches");
			return;
		}
		try {
			const resetPasswordResponse = await fetch("http://localhost:8080/customer/update-password", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({
					currentPassword: currentPassword,
					newPassword: newPassword,
				}),
			});

			const responseJson = await resetPasswordResponse.json();
			if (!resetPasswordResponse.ok) {
				throw new Error(responseJson.error);
			}
			alert("Password changed successfully")
			navigate(0);
		} catch (error) {
			alert("Login failed: Ensure that current password is correct");
		}
	};

	return (
		<div className="mx-auto max-w-4xl p-6 md:p-10 bg-white rounded-lg">
			<h1 className="text-3xl font-semibold text-center mt-1 ">
				Reset Password
			</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="current-password"
						className="block text-sm font-medium text-gray-700"
					>
						Current Password
					</label>
					<input
						id="current-password"
						type="password"
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="new-password"
						className="block text-sm font-medium text-gray-700"
					>
						New Password
					</label>
					<input
						id="new-password"
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="confirm-password"
						className="block text-sm font-medium text-gray-700"
					>
						Confirm New Password
					</label>
					<input
						id="confirm-password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
						required
					/>
				</div>
				<button
					type="submit"
					className="mt-4 w-full rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-500"
				>
					Reset Password
				</button>
			</form>
		</div>
	);
};

export default ResetPassword; // Ensure this line is present for default export
