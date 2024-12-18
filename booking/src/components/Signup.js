import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Signup = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token") !== null) {
			navigate("/");
		}
	}, [navigate]);

	const [formData, setFormData] = useState({
		first: "",
		last: "",
		username: "",
		email: "",
		password: "",
		promotionsSubscriber: false
	});

	const changeHandler = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const checkboxChangeHandler = (e) => {
		setFormData((prevState) => {
			return {...prevState, promotionsSubscriber: e.target.checked}
		})
	}

	const submitHandler = async (event) => {
		event.preventDefault();

		try {
			const signupResponse = await fetch("http://localhost:8080/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					first: formData.first,
					last: formData.last,
					username: formData.username,
					email: formData.email,
					password: formData.password,
					promotionsSubscriber: formData.promotionsSubscriber
				}),
			});

			const responseJson = await signupResponse.json();
			if (!signupResponse.ok) {
				throw new Error(responseJson.error);
			}
			localStorage.setItem("token", responseJson.token);
			localStorage.setItem("role", responseJson.roles[1]);
			navigate("/");
		} catch (error) {
			console.log(error);
			alert(error);
			localStorage.removeItem("token");
		}
	};

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ring-1">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Register
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form onSubmit={submitHandler} className="space-y-6">
						<div>
							<label
								htmlFor="first"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								First Name
							</label>
							<div className="mt-2">
								<input
									id="first"
									name="first"
									type="text"
									value={formData.first}
									onChange={changeHandler}
									required
									autoComplete="given-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="last"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Last Name
							</label>
							<div className="mt-2">
								<input
									id="last"
									name="last"
									type="text"
									value={formData.last}
									onChange={changeHandler}
									required
									autoComplete="family-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Username
							</label>
							<div className="mt-2">
								<input
									id="username"
									name="username"
									type="text"
									value={formData.username}
									onChange={changeHandler}
									required
									autoComplete="username"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									value={formData.email}
									onChange={changeHandler}
									required
									autoComplete="email"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
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
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="inline-flex items-center">
							<label
								className="flex items-center cursor-pointer relative"
								htmlFor="checkbox"
							>
								<input
									type="checkbox"
									className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
									id="checkbox"
									checked={formData.promotionsSubscriber}
									onChange={checkboxChangeHandler}
								/>
							</label>
							<label
								className="cursor-pointer ml-2 text-slate-600 text-sm"
								htmlFor="checkbox"
							>
								<p>Want to recieve emails with promotions?</p>
							</label>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
							>
								Sign up
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Already a member?{" "}
						<a
							href="/login"
							className="font-semibold leading-6 text-gray-600 hover:text-gray-500"
						>
							Click here to log in!
						</a>
					</p>
				</div>
			</div>
		</>
	);
};
export { Signup };
