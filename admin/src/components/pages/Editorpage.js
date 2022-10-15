import React, { useRef, useReducer, useEffect, useState } from "react";
import { useLocation } from "react-router";
import Navbar from "../blocks/Navbar";
import axios from "axios";
import {
	isEmpty,
	url,
	randomHash,
	useEffectAsync,
	HEADER_PAYLOAD,
} from "../../helper";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../tools";
import customToast from "../blocks/swal/customToast";
import blogReducer from "../reducers/blogReducer";
import ACTIONS from "../reducers/actions";
import { useHistory } from "react-router-dom";
import Upload from "rc-upload";
import anandpal_logo from "../../assets/anandpal_logo.jpg";
import prettyMS from "pretty-ms";

const Editorpage = () => {
	const editorInstance = useRef(null);
	const blogInitialState = {
		title: "Blog title",
		author: "AnandPal",
		published_status: false,
		header_image: "",
		category: "MEDICINE",
		short_info: "Short Blog info",
		published_time: Date.now(),
		show_setting: JSON.parse(localStorage.getItem("show_setting") ?? true),
	};
	const [blogState, blogDispatch] = useReducer(blogReducer, blogInitialState);
    const [published_status, setPublishedStatus] = useState(false);

	const location = useLocation();
	const currentID = useRef("");
	const history = useHistory();

	useEffect(() => {
		if (location.search === "?newblog") {
			blogDispatch({
				type: ACTIONS.BLOG_SHOW_SETTING,
				payload: true,
			});
		}
	}, []);

	const uploadProps = {
		action: url("/upload/product"),
		method: "POST",
		multiple: false,
		headers: {
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
		},
		crossDomain: true,
		onStart(file) {
			console.log(file);
		},
		onSuccess(result) {
			blogDispatch({
				type: ACTIONS.BLOG_UPDATE_HEADER_IMAGE,
				payload: result.file.url,
			});
		},
		onError(error) {
			console.log("onError", error);
		},
		beforeUpload(file, fileList) {
			console.log(file, fileList);
		},
	};

	const editorReadyHandler = async () => {
		currentID.current = location.pathname.split("/").pop();
		if (location.search !== "?newblog") {
			try {
				const result = await axios.get(
					url(`/blog/xread/${currentID.current}`),
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"accessToken"
							)}`,
						},
					}
				);

				blogDispatch({
					type: ACTIONS.BLOG_UPDATE_AUTHOR,
					payload: result.data.msg.author,
				});

				blogDispatch({
					type: ACTIONS.BLOG_UPDATE_TITLE,
					payload: result.data.msg.title,
				});

				blogDispatch({
					type: ACTIONS.BLOG_UPDATE_HEADER_IMAGE,
					payload: result.data.msg.header_image,
				});

				blogDispatch({
					type: ACTIONS.BLOG_UPDATE_CATEGORY,
					payload: result.data.msg.category,
				});

				blogDispatch({
					type: ACTIONS.BLOG_UPDATE_SHORT_INFO,
					payload: result.data.msg.short_info,
				});

				blogDispatch({
					type: ACTIONS.BLOG_UPDATE_PUBLISHED_TIME,
					payload: result.data.msg.published_time,
				});

                setPublishedStatus(result.data.msg.published_status)

				if (isEmpty(result.data.msg.data.blocks)) {
					await editorInstance.current.clear();
				} else {
					await editorInstance.current.render(result.data.msg.data);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const dataSaveHandler = async (blur = false) => {
		const PAYLOAD = {
			id: currentID.current,
			title: blogState.title,
			data: await editorInstance.current.save(),
			author: blogState.author,
			published_status: published_status,
			header_image: blogState.header_image,
			category: blogState.category,
			published_time: blogState.published_time,
			short_info: blogState.short_info,
		};
		console.log(JSON.stringify(PAYLOAD, null, 2));
		try {
			const result = await axios.post(url("/blog/create"), PAYLOAD, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			});

            if (result.data.success){
                customToast('info', 'Data Saved Successfully')
            }


			if (result.data.success) {
				if (location.search === "?newblog") {
					history.push(`/blogs/${currentID.current}`);
				}
			}
		} catch (error) {
			customToast("error", error.response.data.msg);
			console.log("Error creating", error.response);
		}
	};

	const toggleSettings = () => {
		blogDispatch({
			type: ACTIONS.BLOG_SHOW_SETTING,
			payload: !blogState.show_setting,
		});
	};

	const BlogCard = () => (
		<div className="blogcard">
			<div className="blogcard__image">
				{isEmpty(blogState.header_image) ? (
					<div className="blogcard__uploader">
						<Upload {...uploadProps}>
							<div className="blogcard__uploader__upload">
								Upload Blog Header
							</div>
						</Upload>
					</div>
				) : (
					<>
						<div className="blogcard__image">
							<Upload {...uploadProps}>
								<img
									src={blogState.header_image}
									alt="blogheader"
								/>
							</Upload>
						</div>
					</>
				)}
			</div>
			<div className="blogcard__category">{blogState.category}</div>
			<div className="blogcard__title">{blogState.title}</div>
			<div className="blogcard__basic">{blogState.short_info}</div>
			<div className="blogcard__about">
				<div className="blogcard__about__logo">
					<img src={anandpal_logo} alt="" />
				</div>
				<div className="blogcard__about__info">
					<div className="blogcard__about__info__author">
						{blogState.author}
					</div>
					<div className="blogcard__about__info__timestamp">
						{Date.now() - blogState.published_time < 1000 * 60 ? (
							<>0 min ago</>
						) : (
							<>
								{prettyMS(
									Date.now() - blogState.published_time,
									{
										compact: true,
									}
								)}
								{" ago"}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);

	const blogPublishHandler = () => {
        setPublishedStatus(!published_status)

        if (!published_status) {
            customToast("success", "Blog status is now published");
        } else {
            customToast("warning", "Blog status is now unpublished");
        }
	};

	return (
		<div className="view">
			<Navbar />
			<div className="options">
				<div className="blogsetting" onClick={toggleSettings}>
					{blogState.show_setting
						? "Hide Settings & Preview"
						: "Show Settings & Preview"}
				</div>
			</div>
			{blogState.show_setting ? (
				<>
					<div className="options">
						<div className="options__preview">
							<BlogCard />
						</div>

						<div className="options__setting">
							<div className="options__main">
								<div className="options__main-title">
									<textarea
										type="text"
										placeholder="Blog Title"
										value={blogState.title}
										onChange={(e) =>
											blogDispatch({
												type: ACTIONS.BLOG_UPDATE_TITLE,
												payload: e.target.value,
											})
										}
									></textarea>
								</div>
								<div className="options__main-category">
									<input
										type="text"
										placeholder="Blog Short Info"
										value={blogState.short_info}
										onChange={(e) =>
											blogDispatch({
												type: ACTIONS.BLOG_UPDATE_SHORT_INFO,
												payload: e.target.value,
											})
										}
									></input>
								</div>
								<div className="options__main-author">
									<input
										type="text"
										placeholder="Author Name"
										value={blogState.author}
										onChange={(e) =>
											blogDispatch({
												type: ACTIONS.BLOG_UPDATE_AUTHOR,
												payload: e.target.value,
											})
										}
									></input>
								</div>
								<div className="options__main-category">
									<input
										type="text"
										placeholder="Blog Category"
										value={blogState.category}
										onChange={(e) =>
											blogDispatch({
												type: ACTIONS.BLOG_UPDATE_CATEGORY,
												payload: e.target.value,
											})
										}
									></input>
								</div>
							</div>

							<div className="options__button">
								<div
									className="button button-clear"
									onClick={async () => {
										if (editorInstance) {
											await editorInstance.current.clear();
										}
									}}
								>
									Clear
								</div>

								<div
									className={`button button__status button__status-${!published_status}`}
									onClick={blogPublishHandler}
								>
									{published_status
										? "Rollback to Private"
										: "Click to Publish"}
								</div>

								<div
									className="button button-save"
									onClick={dataSaveHandler}
								>
									Save
								</div>
							</div>
						</div>
					</div>
				</>
			) : null}

			<div className="editorjs__wrapper">
				<div id="editorjs">
					{editorInstance ? (
						<>
							<EditorJs
								tools={EDITOR_JS_TOOLS}
								instanceRef={(instance) =>
									(editorInstance.current = instance)
								}
								onReady={editorReadyHandler}
								enableReInitialize={true}
							/>
						</>
					) : (
						"loading editor ...."
					)}
				</div>
			</div>
		</div>
	);
};

export default Editorpage;
