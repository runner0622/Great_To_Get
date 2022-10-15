import Swal from "sweetalert2";

const uploadWait = (filename) => {
	Swal.fire({
		color: "red",
		title: `Running Upload for ${filename}`,
		html: "Do not close this window, until upload is done",
		timerProgressBar: true,
	});
	Swal.showLoading();
};

export default uploadWait;
