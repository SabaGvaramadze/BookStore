function addBook(){
	const title = document.querySelector('#title');
	const author = document.querySelector('#author');

	const data = {title: title.value ,author: author.value};

	fetch('/api/add/book', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	window.location.href = '/';
}

function cancel(){
	window.location.href = '/';
}