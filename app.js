const submitText = (e) => {
	e.preventDefault();
	let inputVal = document.getElementById("txt").value
	if (inputVal !== '') {
		let newItem = document.createElement('li')

		newItem.innerHTML = `
                <span> ${inputVal} </span>
                <input type="checkbox" class="checkItem" onclick="markDone(event)">
                `
		document.getElementById("myList").append(newItem)
		document.getElementById("txt").value = ''
	} else {
		alert('Enter Text')
	}
}

const markDone = (event) => {
	let item = event.target.parentElement;
	let checkBox = event.target

	if(checkBox.checked) item.classList.add('active-item')
	else item.classList.remove('active-item')
}