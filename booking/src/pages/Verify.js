import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
	const { code } = useParams();
	const navigate = useNavigate();
	const [message, setMessage] = useState("verifying...");

	useEffect(() => {
		const verifyUser = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/auth/verify/${code}`,
					{
						method: "PUT",
					}
				);

				if (response.ok) {
					setMessage("you're verified! redirecting to login...");
					setTimeout(() => navigate("/login"), 3000);
				} else {
					const data = await response.json();
					setMessage(data.error || "verification failed. please try again.");
				}
			} catch (error) {
				setMessage("an error occurred. please try again later.");
				console.error("verification error:", error);
			}
		};

		if (code) {
			verifyUser();
		} else {
			setMessage("invalid verification code.");
		}
	}, [code, navigate]);

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="p-4 bg-white rounded text-center">
				<h2 className="text-lg font-semibold">{message}</h2>
				<p>
					If you are not redirected,{" "}
					<a href="/login" className="text-blue-500">
						click here
					</a>{" "}
					to log in.
				</p>
			</div>
		</div>
	);
};

export default Verify;
