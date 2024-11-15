import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const Login = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token") !== null) {
			navigate("/");
		}
	}, [navigate]);

	const [formData, setFormData] = useState({
		usernameOrEmail: "",
		password: "",
	});

	const changeHandler = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		try {
			const loginResponse = await fetch("http://localhost:8080/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					usernameOrEmail: formData.usernameOrEmail,
					password: formData.password,
				}),
			});

			const responseJson = await loginResponse.json();
			if (!loginResponse.ok) {
				throw new Error(responseJson.error);
			}
			localStorage.setItem("token", responseJson.token);

			const userRole = responseJson.roles[1] || responseJson.roles[0]; // Assuming at least one role exists
			localStorage.setItem("role", userRole);

			// Navigate based on role
			if (userRole === "ROLE_ADMIN") {
				navigate("/admin");
			} else {
				navigate("/"); // Redirect to home for non-admin users
			}
		} catch (error) {
			console.error("Login Failed: ", error);
			alert("Login failed: Ensure that Username and Password are Correct");
			localStorage.removeItem("token");
		}
	};

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Log in
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form onSubmit={submitHandler} className="space-y-6">
						<div>
							<label
								htmlFor="usernameOrEmail"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Username or Email address
							</label>
							<div className="mt-2">
								<input
									id="usernameOrEmail"
									name="usernameOrEmail"
									type="text" // Change to "text"
									value={formData.usernameOrEmail}
									onChange={changeHandler}
									required
									autoComplete="usernameOrEmail"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
								<div className="text-sm">
									<a
										href="/resetpassword"
										className="font-semibold text-gray-500 hover:text-gray-800"
									>
										Forgot password?
									</a>
								</div>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									value={formData.password}
									onChange={changeHandler}
									required
									autoComplete="current-password"
									className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
							>
								Log in
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Not a member?{" "}
						<a
							href="./signup"
							className="font-semibold leading-6 text-gray-500 hover:text-gray-800"
						>
							Sign up now!
						</a>
					</p>
				</div>
			</div>
		</>
	);
};

export { Login };
