import React from "react";
import BusinessIntro from "../components/HomePage/BusinessIntro";
import Lander from "../components/HomePage/Lander";
import SmallIntroduction from "../components/HomePage/SmallIntroduction";
import ContactUs from "../components/ContactUs";


function HomePage() {
	return (
		<div className="home_page">
			<Lander />
			<SmallIntroduction />
			<BusinessIntro />
			<ContactUs />
		</div>
	);
}


export default HomePage;
