import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faInstagram,
	faLinkedin,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { ANAND, PALLAVI } from "../data/about.data";
import ContactUs from "../components/ContactUs";

function About() {
	const getSocial = (name) => {
		switch (name) {
			case "facebook":
				return faFacebook;
			case "instagram":
				return faInstagram;
			case "linkedin":
				return faLinkedin;
			case "twitter":
				return faTwitter;
			default:
				return null;
		}
	};

	const AboutCard = ({ image, name, profession, social, InfoBlock }) => {
		return (
			<>
				<div className="aboutus_card">
					<div className="aboutus_card_image">
						<img src={image} alt="" />
					</div>
					<div className="divider" />
					<div className="aboutus_card_profession">
						{profession.map((item, index) => {
							return (
								<span
									className="inline aboutus_card_tag"
									key={index}
								>
									{item}
								</span>
							);
						})}
					</div>
					<div className="divider" />
					<div className="aboutus_card_info">{<InfoBlock />} </div>
					<div className="aboutus_card_social">
						{social &&
							Object.keys(social).map((item, index) => {
								return (
									<div
										className="aboutus_card_social_item"
										key={index}
									>
										<a href="">
											<FontAwesomeIcon
												icon={getSocial(item)}
											/>
										</a>
									</div>
								);
							})}
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<div className="title__lander title__lander-about">About Us</div>
			<div className="block">
				<div className="aboutus">
					<div className="divider" />
					<div className="aboutus_card_group">
						<AboutCard
							image={ANAND.image}
							name="anand"
							profession={ANAND.profession}
							InfoBlock={ANAND.info}
							social={ANAND.social}
						/>

						<AboutCard
							image={PALLAVI.image}
							name="pallavi"
							profession={PALLAVI.profession}
							InfoBlock={PALLAVI.info}
							social={ANAND.social}
						/>
					</div>
				</div>
			</div>
			<ContactUs />
		</>
	);
}

export default About;
