const submitText = (e) => {
	e.preventDefault();
	let inputVal = document.getElementById("txt").value
	if (inputVal.trim() !== '') {
		let newItem = document.createElement('li')

		newItem.innerHTML = `
                <span> ${inputVal} </span>
                <input type="checkbox" class="checkItem" onclick="markDone(event)">
                <button class="removeItem" onclick="removeItem(event)">X</button>
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
		let item = event.target.parentElement;
		let checkBox = event.target

		if (checkBox.checked) item.classList.add('active-item')
		else item.classList.remove('active-item')
	}
}

const removeItem = (event) => {
	if (!beingEdited) {
		let item = event.target.parentElement;
		item.remove()
	}
}

const editItem = (event) => {
	beingEdited = !beingEdited
	let item = event.target.parentElement
	let child1 = item.firstElementChild
	let checkBox = item.getElementsByTagName('input')[0]
	let button = item.getElementsByTagName('button')[0]
	let newElem
	if (beingEdited) {
		checkBox.disabled = true
		button.disabled = true
		newElem = document.createElement('input')
		newElem.classList.add('editText')
		newElem.type = 'text'
		newElem.value = child1.innerHTML
		item.replaceChild(newElem, child1)
		newElem.focus()
	} else {
		checkBox.disabled = false
		button.disabled = false
		newElem = document.createElement('span')
		newElem.innerHTML = child1.value
		item.replaceChild(newElem, child1)
	}
}