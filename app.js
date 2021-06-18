const contentContainer = document.getElementById('content-div')
let count = 0;
let beingEdited = false;
let id;
const submitText = (e) => {
	e.preventDefault();
	let inputVal = document.getElementById("txt").value
	if (inputVal.trim() !== '') {
		let newItem = document.createElement('li')
		newItem.innerHTML = `
                <input type="checkbox" class="checkItem" onclick="markDone(event)">
                <span onclick="displayContent(event)"> ${inputVal} </span>
                <button class="removeItem" onclick="removeItem(event)">DELETE</button>
                <button class="editItem" onclick="editItem(event)">EDIT</button>
                `
		newItem.children[1].setAttribute('id', count.toString())
		count++;
		document.getElementById("myList").append(newItem)
		document.getElementById("txt").value = ''
	} else {
		alert('Enter Text')
	}
}

const displayContent = (event) => {
	const windowText = document.getElementById('window-text')
	contentContainer.style.display = 'flex'
	windowText.innerHTML = event.target.innerHTML
	id = event.target.id
}

const closeWindow = (event) => {
	const text = contentContainer.children[1]
	let targetEl = document.getElementById(id.toString())
	if (text.tagName !== 'TEXTAREA') {
		if (text.innerHTML === '') {
			targetEl.parentElement.remove()
		} else {
			targetEl.innerHTML = text.innerHTML
		}
	}else{
		let oldSpan = document.createElement('span')
		oldSpan.innerHTML = oldVal
		oldSpan.setAttribute('id', 'window-text')
		oldSpan.addEventListener('dblclick', (event)=>{
			editContainerItem(event)
		})
		text.replaceWith(oldSpan)
	}
	contentContainer.style.display = 'none'
	beingEdited = false;
}

const markDone = (event) => {
	if (!beingEdited) {
		let item = event.target.parentElement.children[1];
		let checkBox = event.target

		if (checkBox.checked) item.classList.add('active-item')
		else item.classList.remove('active-item')
	}
}

const removeItem = (event) => {
	if (!beingEdited && confirm('Are you sure you want to delete this item')) {
			let item = event.target.parentElement;
			item.remove()
	}
}

const removeContainerItem = (event) => {
	if (!beingEdited && confirm('Are you sure you want to delete this item')) {
			const text = contentContainer.children[1]
			text.innerHTML = ''
	}
}

const editItem = (event) => {
	const item = event.target.parentElement
	const text = item.children[1]
	const id = text.id
	beingEdited = text.nodeName === 'SPAN'
	const deleteBtn = item.getElementsByTagName('button')[0]
	const editBtn = item.getElementsByTagName('button')[1]
	const checkBox = item.getElementsByTagName('input')[0]
	let newElem
	if (beingEdited) {
		editBtn.innerHTML = 'SAVE'
		checkBox.disabled = true
		deleteBtn.disabled = true
		newElem = document.createElement('input')
		newElem.classList.add('editText')
		newElem.setAttribute('id', `${id}`)
		newElem.type = 'text'
		newElem.value = text.innerHTML
		newElem.addEventListener("keyup", (event) => {
			if (event.code === 'Enter') {
				event.preventDefault();
				editItem(event)
			}
		});
		item.replaceChild(newElem, text)
		newElem.focus()
	} else {
		let inputText = item.getElementsByTagName('input')[1]
		if (inputText.value.trim() !== '') {
			editBtn.innerHTML = 'EDIT'
			checkBox.disabled = false
			deleteBtn.disabled = false
			newElem = document.createElement('span')
			newElem.setAttribute('id', `${id}`)
			newElem.innerHTML = text.value
			newElem.addEventListener('click', (e)=>{
				displayContent(e)
			})
			item.replaceChild(newElem, text)
		}else{
			alert('Enter Text')
		}
	}
}

let oldVal
const editContainerItem = (event) => {
	const windowText = document.getElementById('window-text')
	const editBtn = document.getElementsByClassName('controls')[0].children[1]
	beingEdited = windowText.nodeName === 'SPAN'
	let newElem
	if (beingEdited) {
		oldVal = windowText.innerHTML
		editBtn.innerHTML = 'SAVE'
		newElem = document.createElement('textarea')
		newElem.classList.add('editText')
		newElem.setAttribute('id', 'window-text')
		newElem.type = 'text'
		newElem.value = windowText.innerHTML
		newElem.addEventListener("keyup", (event) => {
			if (event.code === 'Enter') {
				event.preventDefault();
				editContainerItem(event)
			}
		});
		windowText.replaceWith(newElem)
		newElem.focus()
	} else {
		if (windowText.value.trim() !== '') {
			editBtn.innerHTML = 'EDIT'
			newElem = document.createElement('span')
			newElem.innerHTML = windowText.value
			newElem.setAttribute('id', 'window-text')
			newElem.addEventListener('dblclick', (e)=>{
				editContainerItem(e)
			})
			windowText.replaceWith(newElem)
			closeWindow(event)
		}else{
			alert('Enter Text')
		}
	}
}