import { Link } from "react-router-dom";

const EditProfile = () => {
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
										name="first-name"
										type="text"
										autoComplete="given-name"
										className="block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
										name="last-name"
										type="text"
										autoComplete="family-name"
										className="block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
										autoComplete="username"
										className="block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
										autoComplete="email"
										className="block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										disabled="true"
									/>
								</div>
							</div>
						</div>

						<div className="mt-4 flex items-center">
							<input
								id="promotions"
								name="promotions"
								type="checkbox"
								className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
					>
						Cancel
					</button>
					<button
						type="submit"
						className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Save
					</button>
				</div>
			</form>

		</div>
	);
};

export { EditProfile };
