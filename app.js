let count = 0;
const submitText = (e) => {
	e.preventDefault();
	let inputVal = document.getElementById("txt").value
	if (inputVal.trim() !== '') {
		let newItem = document.createElement('li')
		newItem.innerHTML = `
                <span onclick="displayContent(event)" ondblclick="editItem(event)"> ${inputVal} </span>
                <input type="checkbox" class="checkItem" onclick="markDone(event)">
                <button class="removeItem" onclick="removeItem(event)">DELETE</button>
                <button class="editItem" onclick="editItem(event)">EDIT</button>
                `
		newItem.children[0].setAttribute('id', count.toString())
		count++;
		document.getElementById("myList").append(newItem)
		document.getElementById("txt").value = ''
	} else {
		alert('Enter Text')
	}
}

let beingEdited = false;

let contentContainer = document.getElementById('content-div')

let id;
const displayContent = (event) => {
	let text = document.getElementById('window-text')
	contentContainer.style.display = 'flex'
	text.innerHTML = event.target.innerHTML
	event.target.innerHTML = "shevcvale"
	id = event.target.id
	console.log(event.target.id)
	console.log(event.target)
}

const closeWindow = (event) => {
	contentContainer.style.display = 'none'
	const contentDiv = document.getElementById('content-div')
	const child2 = contentDiv.children[1]
	console.log(contentDiv)
	console.log(child2)
	let targetEl = document.getElementById(id.toString())
	if(child2.innerHTML === ''){
		targetEl.parentElement.remove()
	}else{
		targetEl.innerHTML = child2.innerHTML
	}
}

const markDone = (event) => {
	if (!beingEdited) {
		let item = event.target.parentElement.firstElementChild;
		let checkBox = event.target

		if (checkBox.checked) {
			item.classList.add('active-item')
		}
		else{
			item.classList.remove('active-item')
		}
	}
}

const markContainerDone = (event) => {
	if (!beingEdited) {
		const contentDiv = document.getElementById('content-div')
		const child2 = contentDiv.children[1]
		let checkBox = event.target

		if (checkBox.checked) {
			child2.classList.add('active-item')
		}
		else{
			child2.classList.remove('active-item')
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

const removeContainerItem = (event) => {
	if (!beingEdited) {
		if (confirm('Are you sure you want to delete this item')) {
			const contentDiv = document.getElementById('content-div')
			const child2 = contentDiv.children[1]
			const child3 = contentDiv.children[2]
			child2.innerHTML = ''
			//child3.remove()

		}
	}
}

const editItem = (event) => {
	console.log(event.target)
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
			newElem.addEventListener('dblclick', (e)=>{
				editItem(e)
			})
			item.replaceChild(newElem, child1)
		}else{
			alert('Enter Text')
		}
	}
}

const editContainerItem = (event) => {
	const contentDiv = document.getElementById('content-div')
	const child2 = contentDiv.children[1]
	console.log(child2)
	beingEdited = child2.nodeName === 'SPAN'
	let newElem
	if (beingEdited) {
		newElem = document.createElement('input')
		newElem.classList.add('editText')
		newElem.type = 'text'
		newElem.value = child2.innerHTML
		newElem.addEventListener("keyup", (event) => {
			if (event.code === 'Enter') {
				event.preventDefault();
				editContainerItem(event)
			}
		});
		contentDiv.replaceChild(newElem, child2)
		newElem.focus()
	} else {
		let inputText = contentDiv.getElementsByTagName('input')[0]
		if (inputText.value.trim() !== '') {
			newElem = document.createElement('span')
			newElem.innerHTML = child2.value
			newElem.addEventListener('dblclick', (e)=>{
				editContainerItem(e)
			})
			contentDiv.replaceChild(newElem, child2)
		}else{
			alert('Enter Text')
		}
	}
}
