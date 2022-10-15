import { ANAND, PALLAVI } from "../../data/about.data";

function SmallIntroduction() {
	return (
		<div className="small_introduction">
			<div className="introduction">
				<div className="profile_img">
					<img src={ANAND.image} alt="" />
				</div>
				<div className="profile_intro">
					<p>{ANAND.info()}</p>
				</div>
			</div>

			<div className="introduction">
				<div className="profile_img">
					<img src={PALLAVI.image} alt="" />
				</div>
				<div className="profile_intro">
					<p>{PALLAVI.info()}</p>
				</div>
			</div>
		</div>
	);
}

export default SmallIntroduction;
