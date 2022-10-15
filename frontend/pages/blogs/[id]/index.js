import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { url, useEffectAsync } from "../../../helper";
import Output from "editorjs-react-renderer";
import { useRouter } from "next/router";

const EditorPage = () => {
	const router = useRouter();
	const path = useRef();

	useEffectAsync(async () => {
		if (!router.isReady) {
			return;
		}
		path.current = router.asPath?.split("/").pop();

		try {
			const result = await axios.get(
				url(`/api/blog/read/${path.current}`)
			);

			if (result.data.success) {
				setEditorData(result.data.msg.data);
				setLoaded(true);
			}
		} catch (error) {
			console.error(error.response);
		}
	}, [router.isReady]);

	const [editorData, setEditorData] = useState({});
	const [loaded, setLoaded] = useState(false);

	const Post = (props) => {
		return (
			<section>
				<Output data={props.data} />
			</section>
		);
	};

	return (
		<div className="editor-page">
			<div className="editorjs__wrapper">
				<div id="editorjs">
					{loaded ? <Post data={editorData} /> : null}
				</div>
			</div>
		</div>
	);
};

export default EditorPage;
