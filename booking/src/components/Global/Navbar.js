import React, { useState, useEffect } from "react";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userRole, setUserRole] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsLoggedIn(!!token); // Set to true if token exists

		const role = localStorage.getItem("role");
		setUserRole(role);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		setIsLoggedIn(false);
		setUserRole(null);
		navigate(0);
	};

	const navigation = isLoggedIn
		? [
				{ name: "Profile", to: "/profile", current: false },
				{ name: "Logout", to: "/", current: false, onClick: handleLogout },
				...(userRole === "ROLE_ADMIN"
					? [{ name: "Admin", to: "/admin", current: false }]
					: []),
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
						<h1 className="text-2xl font-medium">Cinema E Booking System</h1>
					</Link>

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

			<DisclosurePanel className="sm:hidden">
				<div className="space-y-1 px-2 pb-3 pt-2">
					{navigation.map((item) => (
						<DisclosureButton
							key={item.name}
							as={Link}
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
