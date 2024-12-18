import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const EditProfile = (props) => {
	const navigate = useNavigate();

	const [user, setUser] = useState()

	const [formData, setFormData] = useState({
		id: null,
		first: "",
		last: "",
		username: "",
		email: "",
		promotionsSubscriber: false,
	});

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
				setFormData({
					id: response.data.id,
					first: response.data.first,
					last: response.data.last,
					username: response.data.user.username,
					email: response.data.user.email,
					promotionsSubscriber: response.data.promotionsSubscriber,
				});
			})
			.catch((err) => {
				alert(err);
			});
	}, [navigate]);

	const changeHandler = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const checkboxChangeHandler = (e) => {
		console.log("Checkbox before: " + formData.promotionsSubscriber);
		setFormData((prevState) => {
			return { ...prevState, promotionsSubscriber: e.target.checked };
		});
		console.log("Checkbox after: " + formData.promotionsSubscriber);
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		try {
			const editProfileResponse = await fetch(
				`http://localhost:8080/customer/put/${formData.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify({
						first: formData.first,
						last: formData.last,
						username: formData.username,
						promotionsSubscriber: formData.promotionsSubscriber,
					}),
				}
			);

			const responseJson = await editProfileResponse.json();
			if (!editProfileResponse.ok) {
				throw new Error(responseJson.error);
			}
			navigate(0);
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};

	return (
		<div className=" mx-auto max-w-4xl p-6 md:p-10 bg-white rounded-lg">
			<h1 className="text-3xl font-semibold text-center mt-1 ">Edit profile</h1>
			<form>
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-8">
						<div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
							<div className="sm:col-span-1">
								<label
									htmlFor="first-name"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									First name
								</label>
								<div className="mt-1">
									<input
										id="first-name"
										name="first"
										type="text"
										value={formData.first}
										onChange={changeHandler}
										required
										autoComplete="given-name"
										className="block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
									/>
								</div>
							</div>

							<div className="sm:col-span-1">
								<label
									htmlFor="last-name"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Last name
								</label>
								<div className="mt-1">
									<input
										id="last-name"
										name="last"
										type="text"
										value={formData.last}
										onChange={changeHandler}
										required
										autoComplete="family-name"
										className="block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
									/>
								</div>
							</div>

							<div className="sm:col-span-1">
								<label
									htmlFor="username"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Username
								</label>
								<div className="mt-1">
									<input
										id="username"
										name="username"
										type="text"
										value={formData.username}
										onChange={changeHandler}
										required
										autoComplete="username"
										className="block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
									/>
								</div>
							</div>

							<div className="sm:col-span-1">
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Email address
								</label>
								<div className="mt-1">
									<input
										id="email"
										name="email"
										type="email"
										value={formData.email}
										required
										autoComplete="email"
										className="block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
										disabled={true}
									/>
								</div>
							</div>
						</div>

						<div className="mt-4 flex items-center">
							<input
								id="promotions"
								name="promotionsSubscriber"
								type="checkbox"
								checked={formData.promotionsSubscriber}
								onChange={checkboxChangeHandler}
								className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-600"
							/>
							<label
								htmlFor="promotions"
								className="ml-2 block text-sm text-gray-900"
							>
								Opt in for promotions
							</label>
						</div>
					</div>
				</div>

				<div className="mt-6 flex items-center justify-end gap-x-6">
					<button
						type="button"
						className="text-sm font-semibold leading-6 text-gray-900"
						onClick={() => {
							navigate(0);
						}}
					>
						Cancel
					</button>
					<button
						type="submit"
						className="
						rounded-md
						bg-gray-600
						px-3
						py-2
						text-sm
						font-semibold
						text-white
						shadow-sm
						hover:bg-gray-500
						focus-visible:outline
						focus-visible:outline-2
						focus-visible:outline-offset-2
						focus-visible:outline-gray-600"
						onClick={submitHandler}
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export { EditProfile };
