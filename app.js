const submitText = (e) => {
	e.preventDefault();
	let inputVal = document.getElementById("txt").value
	if (inputVal.trim() !== '') {
		let newItem = document.createElement('li')

		newItem.innerHTML = `
                <span ondblclick="editItem(event)"> ${inputVal} </span>
                <input type="checkbox" class="checkItem" onclick="markDone(event)">
                <button class="removeItem" onclick="removeItem(event)">DELETE</button>
                <button class="editItem" onclick="editItem(event)">EDIT</button>
                `
		document.getElementById("myList").append(newItem)
		document.getElementById("txt").value = ''
	} else {
		alert('Enter Text')
	}
}

let beingEdited = false;

const markDone = (event) => {
	if (!beingEdited) {
		let line = event.target.parentElement;
		let item = event.target.parentElement.firstElementChild;
		let checkBox = event.target

		if (checkBox.checked) {
			item.classList.add('active-item')
			line.classList.add('grayed-out')
		}
		else{
			item.classList.remove('active-item')
			line.classList.remove('grayed-out')
		}
	}
}

const removeItem = (event) => {
	if (!beingEdited) {
		if (confirm('Are you sure you want to delete this item')) {
			let item = event.target.parentElement;
			item.remove()
		}
	}
}

const editItem = (event) => {

	const item = event.target.parentElement
	const child1 = item.firstElementChild
	beingEdited = child1.nodeName === 'SPAN'
	const button = item.getElementsByTagName('button')[0]
	let newElem
	let checkBox;
	if (beingEdited) {
		checkBox = item.getElementsByTagName('input')[0]
		checkBox.disabled = true
		button.disabled = true
		newElem = document.createElement('input')
		newElem.classList.add('editText')
		newElem.type = 'text'
		newElem.value = child1.innerHTML
		newElem.addEventListener("keyup", (event) => {
			if (event.code === 'Enter') {
				event.preventDefault();
				editItem(event)
			}
		});
		item.replaceChild(newElem, child1)
		newElem.focus()
	} else {
		let inputText = item.getElementsByTagName('input')[0]
		if (inputText.value.trim() !== '') {
			checkBox = item.getElementsByTagName('input')[1]
			checkBox.disabled = false
			button.disabled = false
			newElem = document.createElement('span')
			newElem.innerHTML = child1.value
			item.replaceChild(newElem, child1)
		}else{
			alert('Enter Text')
		}
	}
}
