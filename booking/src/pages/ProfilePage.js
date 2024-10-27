import React from "react";
import { EditProfile } from "../components/EditProfile";
import { Navbar } from "../components/Navbar";
const ProfilePage = () => {
	return (
		<div>
			<Navbar />
			<EditProfile />
		</div>
	);
};

export default ProfilePage;
