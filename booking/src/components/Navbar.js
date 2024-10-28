import React, { useState, useEffect } from "react";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Check login status on component mount
	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsLoggedIn(!!token); // Set to true if token exists
	}, []);

	// Logout function
	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
	};

	const navigation = isLoggedIn
		? [
				{ name: "Profile", to: "/profile", current: false },
				{ name: "Logout", to: "/", current: false, onClick: handleLogout },
		  ]
		: [
				{ name: "Log In", to: "/login", current: false },
				{ name: "Sign Up", to: "/signup", current: false },
		  ];

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	return (
		<Disclosure as="nav" className="bg-gray-800">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					{/* Mobile menu button */}
					<div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
						<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
							<span className="sr-only">Open main menu</span>
							<Bars3Icon
								className="block h-6 w-6 group-data-[open]:hidden"
								aria-hidden="true"
							/>
							<XMarkIcon
								className="hidden h-6 w-6 group-data-[open]:block"
								aria-hidden="true"
							/>
						</DisclosureButton>
					</div>

					<Link to="/" className="text-white">
						<h1 className="text-2xl font-medium">cinnamon e booking system</h1>
					</Link>

					{/* Right-aligned section for larger screens */}
					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
						<div className="hidden sm:ml-6 sm:block">
							<div className="flex space-x-4">
								{navigation.map((item) => (
									<Link
										key={item.name}
										to={item.to}
										aria-current={item.current ? "page" : undefined}
										className={classNames(
											item.current
												? "bg-gray-900 text-white"
												: "text-gray-300 hover:bg-gray-700 hover:text-white",
											"rounded-md px-3 py-2 text-sm font-medium"
										)}
										onClick={item.onClick ? item.onClick : null}
									>
										{item.name}
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile menu for smaller screens */}
			<DisclosurePanel className="sm:hidden">
				<div className="space-y-1 px-2 pb-3 pt-2">
					{navigation.map((item) => (
						<DisclosureButton
							key={item.name}
							as={Link} // Use Link component for mobile as well
							to={item.to}
							aria-current={item.current ? "page" : undefined}
							className={classNames(
								item.current
									? "bg-gray-900 text-white"
									: "text-gray-300 hover:bg-gray-700 hover:text-white",
								"block rounded-md px-3 py-2 text-base font-medium"
							)}
							onClick={item.onClick ? item.onClick : null}
						>
							{item.name}
						</DisclosureButton>
					))}
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
};

export { Navbar };
