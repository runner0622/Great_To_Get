import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faInstagram,
	faLinkedin,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
	return (
		<div className="footer">
			<div className="footer_main">
				<div className="footer_main_social">
					<FontAwesomeIcon icon={faFacebook} />
					<FontAwesomeIcon icon={faInstagram} />
					<FontAwesomeIcon icon={faLinkedin} />
					<FontAwesomeIcon icon={faTwitter} />
				</div>
			</div>
			<div className="footer_rights">
				<div className="footer_copyright">
					© 2016 All Right Reserved by GreatToGet
				</div>
				<div className="footer_creator">
					Designed and Developed by OrkaIT solutions
				</div>
			</div>
		</div>
	);
};

export default Footer;
