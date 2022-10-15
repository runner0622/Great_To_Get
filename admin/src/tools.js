// tools.js
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Paragraph from "editorjs-paragraph-with-alignment";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import { url } from "./helper";

export const EDITOR_JS_TOOLS = {
	header: {
		class: Header,
		inlineToolbar: ["link"],
	},
	list: {
		class: List,
		inlineToolbar: ["link", "bold"],
	},
	embed: {
		class: Embed,
		inlineToolbar: false,
		config: {
			services: {
				youtube: true,
			},
		},
	},
	paragraph: {
		class: Paragraph,
		inlineToolbar: ["link", "marker", "inlineCode", "bold", "italic"],
	},
	marker: {
		class: Marker,
		inlineToolbar: true,
	},
	inlineCode: {
		class: InlineCode,
		inlineToolbar: ["link", "marker"],
	},
	table: Table,
	warning: Warning,
	code: Code,
	linkTool: LinkTool,
	image: {
		class: Image,
		config: {
			endpoints: {
				// Your backend file uploader endpoint -> POST
				byFile: url('/upload/blog'),
			},
		},
	},
	raw: Raw,
	header: Header,
	quote: Quote,
	checklist: CheckList,
	delimiter: Delimiter,
	simpleImage: SimpleImage,
};
