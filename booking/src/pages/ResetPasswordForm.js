import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
	const { code } = useParams();
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`http://localhost:8080/auth/resetPassword/${code}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ password }),
				}
			);
			if (!response.ok) {
				throw new Error("Error resetting password.");
			}
			alert("Password successfully reset!");
			navigate("/login");
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow"
		>
			<h1 className="text-4xl font-medium">Reset Password</h1>
			<label htmlFor="password" className="text-slate-700">
				New Password
			</label>
			<input
				type="password"
				id="password"
				className="w-full py-3 mt-2 border"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button
				type="submit"
				className="w-full py-3 mt-4 bg-indigo-600 text-white"
			>
				Reset Password
			</button>
		</form>
	);
};

export default ResetPasswordForm;
