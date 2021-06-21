const contentContainer = document.getElementById('content-div')
const selectAll = document.getElementById('select-all')
let beingEdited = false;
let itemArr = []
let checked = false
const iterateArr = () => {
	selectAll.checked = itemArr.every(item => item.children[0].checked)
	checked = selectAll.checked;
}
// map filter
const submitText = (e) => {
	e.preventDefault();
	let inputVal = document.getElementById("txt").value
	if (inputVal.trim()) {
		let newItem = document.createElement('li')
		newItem.innerHTML = `
                <input type="checkbox" class="checkItem" onclick="markDone(event)">
                <span onclick="showWindow(event)"> ${inputVal} </span>
                <input type="text">
                <button class="removeItem" onclick="removeItem(event)">DELETE</button>
                <button class="editItem" onclick="editItem(event)">EDIT</button>
                `
		let inputEl = newItem.children[2]
		inputEl.addEventListener("keyup", (event) => {
			if (event.code === 'Enter') {
				event.preventDefault();
				editItem(event)
			}
		});
		itemArr.push(newItem)
		iterateArr()
		document.getElementById("myList").append(newItem)
		document.getElementById("txt").value = ''
	} else {
		alert('Enter Text')
	}
}

const removeItem = (event) => {
	let item = event.target.parentElement;
	if (!beingEdited && confirm('Are you sure you want to delete this item')) {
		item.remove()
	}
	let arrCollection = document.getElementById('myList').children
	itemArr = [].slice.call(arrCollection)
	iterateArr()
}

const editItem = (event) => {
	beingEdited = !beingEdited
	const liItem = event.target.parentElement // List Item
	const itemTextContainer = liItem.children[1] // span
	const deleteBtn = liItem.getElementsByTagName('button')[0]
	const editBtn = liItem.getElementsByTagName('button')[1]
	const checkBox = liItem.getElementsByTagName('input')[0]
	const inputText = liItem.getElementsByTagName('input')[1]
	if (beingEdited) {
		editBtn.innerHTML = 'SAVE'
		checkBox.disabled = true
		deleteBtn.disabled = true
		inputText.style.display = 'inline-block'
		inputText.focus()
		inputText.value = itemTextContainer.innerHTML
		itemTextContainer.style.display = 'none'
	}else{
		if (inputText.value.trim() !== '') {
			editBtn.innerHTML = 'EDIT'
			checkBox.disabled = false
			deleteBtn.disabled = false
			inputText.style.display = 'none'
			itemTextContainer.innerHTML = inputText.value
			itemTextContainer.style.display = 'inline-block'
		}else{
			alert('Enter Text')
			beingEdited = true
		}
	}
}

const tick = () => {
	checked = !checked
	if (checked) {
		itemArr.forEach((item) => {
			item.children[0].checked = true
			item.children[1].classList.add('active-item')
		})
	}else{
		itemArr.forEach((item) => {
			item.children[0].checked = false
			item.children[1].classList.remove('active-item')
		})
	}
}

const markDone = (event) => {
	if (!beingEdited) {
		let item = event.target.parentElement.children[1];
		let checkBox = event.target

		if (checkBox.checked) {
			item.classList.add('active-item')
			iterateArr()
		}
		else {
			item.classList.remove('active-item')
			selectAll.checked = false
			iterateArr()
		}
	}
}

const windowText = document.getElementById('window-text')
const itemDeleteBtn = document.getElementById('window-item-delete')
const itemEditBtn = document.getElementById('window-item-edit')
const textArea = document.getElementById('editText')
const closeWindowBtn = document.getElementById('close-window')
let eventG;
windowText.addEventListener('dblclick', ()=>{
	editInWindow(eventG)
})

itemDeleteBtn.addEventListener('click', ()=>{
	deleteInWindow(eventG)
})

itemEditBtn.addEventListener('click', () => {
	editInWindow(eventG)
})

textArea.addEventListener("keyup", (ev) => {
	if (ev.code === 'Enter') {
		ev.preventDefault();
		editInWindow(eventG)
	}
})

closeWindowBtn.addEventListener('click', () => {
	closeWindow(eventG)
})

const showWindow = (event) => {
	eventG = event
	contentContainer.style.display = 'flex'
	windowText.innerHTML = event.target.innerHTML
}

const deleteInWindow = (event) => {
	if (!beingEdited && confirm('Are you sure you want to delete this item')) {
		windowText.innerHTML = ''
		event.target.parentElement.remove()
		closeWindow()
	}
}

let oldValue
const editInWindow = (event) => {
	beingEdited = !beingEdited
	if(beingEdited){
		itemEditBtn.innerHTML = 'SAVE'
		textArea.style.display = 'inline-block'
		textArea.value = windowText.innerHTML
		oldValue = windowText.innerHTML
		textArea.focus()
		windowText.style.display = 'none'
	}else{
		itemEditBtn.innerHTML = 'EDIT'
		windowText.style.display = 'inline-block'
		textArea.style.display = 'none'
		windowText.innerHTML = textArea.value;
		if (textArea.value.trim() !== '') {
			event.target.innerHTML = textArea.value
			closeWindow()
		}else{
			alert('Enter Text')
		}
	}
}

const closeWindow = () => {
	if(beingEdited) {
		windowText.innerHTML = oldValue;
		windowText.style.display = 'inline-block'
		textArea.style.display = 'none'
		itemEditBtn.innerHTML = 'EDIT'
	}
	contentContainer.style.display = 'none'
	beingEdited = false;
}
