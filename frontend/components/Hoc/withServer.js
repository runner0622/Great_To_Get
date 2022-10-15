// this will request to server api... on error redirect to 500 page

const withServer = (WrappedComponent, props) => {
	return <WrappedComponent {...props} />;
};
