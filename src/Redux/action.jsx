const setData = (content) => {
	return {
		type: "SET_DATA",
		content
	}
}

const appendData = (obj) => {

	return (dispatch) => {
		fetch(`${process.env.REACT_APP_BASE_URL}/theme`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		})
		.then(data => data.json())
		.then(res => {
			dispatch(setData({color: res.color}))
		})
	}
}

export {
	appendData
}