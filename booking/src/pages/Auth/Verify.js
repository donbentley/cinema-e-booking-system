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
			<div className="p-6 bg-white rounded-lg text-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.4}
					stroke="currentColor"
					className="w-16 h-16 mx-auto mb-4" // Adjust size and margin for centering
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
					/>
				</svg>

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
