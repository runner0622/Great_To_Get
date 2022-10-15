import React, { useState } from "react";

// images
import first from "../../../images/businessintroBG.jpg";
import second from "../../../images/contactUs.jpg";
import third from "../../../images/profile.png";
const belurImg = [first, second, third];

function Hritvi() {
	const branch = {
		belur: {
			title: "Belur Branch",
			info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Accusantium assumenda doloribus inventore eligendi earum quisquamincidunt! Minima vel in quod eum magni, voluptate veritatis repudiandae fuga? Quos qui itaque ipsum?",
			location:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15133.323242851997!2d73.80661599999999!3d18.5139471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfa67093d3cd%3A0x3c5dafc0ef22758a!2sDatta%20Nagar%2C%20Kothrud%2C%20Pune%2C%20Maharashtra%20411038!5e0!3m2!1sen!2sin!4v1629051324221!5m2!1sen!2sin",
			address: "mahaveer apt dhanya lane",
			contact: "7559117767",
			img: first,
		},
		bengluru: {
			title: "Bengluru Branch",
			info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Accusantium assumenda doloribus inventore eligendi earum quisquamincidunt! Minima vel in quod eum magni, voluptate veritatis repudiandae fuga? Quos qui itaque ipsum?",
			location:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15133.323242851997!2d73.80661599999999!3d18.5139471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfa67093d3cd%3A0x3c5dafc0ef22758a!2sDatta%20Nagar%2C%20Kothrud%2C%20Pune%2C%20Maharashtra%20411038!5e0!3m2!1sen!2sin!4v1629051324221!5m2!1sen!2sin",
			address: "mahaveer apt dhanya lane",
			contact: "7559117767",
			img: second,
		},
		chickmangluru: {
			title: "Chickmangluru Branch",
			info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Accusantium assumenda doloribus inventore eligendi earum quisquamincidunt! Minima vel in quod eum magni, voluptate veritatis repudiandae fuga? Quos qui itaque ipsum?",
			location:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15133.323242851997!2d73.80661599999999!3d18.5139471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfa67093d3cd%3A0x3c5dafc0ef22758a!2sDatta%20Nagar%2C%20Kothrud%2C%20Pune%2C%20Maharashtra%20411038!5e0!3m2!1sen!2sin!4v1629051324221!5m2!1sen!2sin",
			address: "mahaveer apt dhanya lane",
			contact: "7559117767",
			img: third,
		},
	};
	const [selectedBranch, setSelectedBranch] = useState("belur");
	return (
		<div>
			<h1 className="hritvi-header">HRITVI WELNESS</h1>

			<div className="hritvi-info">
				<p>
					Hritvi Wellness is an organization with a holistic approach
					towards HealthWellness and Prevention. Our approach is
					correcting the underlying causes of illness or upcoming
					disease. This results in the overall wellness of mind, body
					and spirit of the individual with integrating ayurveda with
					allied therapies. We offer people to enhance their vitality
					and resistance. We provide personalized, proactive,
					predictive and preventive e dimensional health (mind, body,
					spirit) at cellular levels, the basic foundation for
					creating optimal health and happiness to all.
				</p>
				<img src={first} className="hritvi-img" alt="" />
			</div>
			<div className="hritvi-info">
				<blockquote>
					<h3>HRITVI EDUCATION</h3>
					<h4>we daily have wellenss helth lecture</h4>
					<blockquote>
						The link for todays meeting
						<a href=""> oiashefon </a>, Starts at:10pm
					</blockquote>
				</blockquote>
			</div>
			<div className="hritvi-branches">
				<div className="">
					<div className="hritvi-branches-lists">
						<div
							className={`hritvi-branches-list ${
								selectedBranch === "belur" &&
								"hritvi-branch-active"
							}`}
							onClick={() => setSelectedBranch("belur")}
						>
							BELUR CENTER
						</div>
						<div
							className={`hritvi-branches-list ${
								selectedBranch === "bengluru" &&
								"hritvi-branch-active"
							}`}
							onClick={() => setSelectedBranch("bengluru")}
						>
							BENGLURU CENTER
						</div>
						<div
							className={`hritvi-branches-list ${
								selectedBranch === "chickmangluru" &&
								"hritvi-branch-active"
							}`}
							onClick={() => setSelectedBranch("chickmangluru")}
						>
							CHIKCKMANGLURU CENTER
						</div>
					</div>
				</div>

				<div className="hritvi-branch-info">
					<h3 className="hritvi-branch-info_header">
						{branch[selectedBranch].title}
					</h3>
					<p>Headoffice in Belur Branch, secondary office in bengluru branch</p>
					<p>
						<span className="green">Address:</span>
						{branch[selectedBranch].address}
						<br />
						<span className="green">contact:</span>
						{branch[selectedBranch].contact}
						<br />
					</p>
					<div className="hritvi-branch-carasole">
						<img
							src={branch[selectedBranch].img}
							className="hritvi-branch-image"
							alt=""
						/>
					</div>
					<div className="">
						<iframe
							className="contact_map"
							src={branch[selectedBranch].location}
							allowFullScreen="allowFullScreen"
							loading="lazy"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Hritvi;
