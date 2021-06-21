const contentContainer = document.getElementById('content-div')
const selectAll = document.getElementById('select-all')
let count = 0;
let beingEdited = false;
//let id;
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
	if (inputVal.trim() !== '') {
		let newItem = document.createElement('li')
		newItem.innerHTML = `
                <input type="checkbox" class="checkItem" onclick="markDone(event)">
                <span onclick="showWindow(event)"> ${inputVal} </span>
                <button class="removeItem" onclick="removeItem(event)">DELETE</button>
                <button class="editItem" onclick="editItem(event)">EDIT</button>
                `
		//newItem.children[1].setAttribute('id', count.toString())
		console.log('---------', count.toString())
		itemArr.push(newItem)
		iterateArr()
		count++;
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
	const item = event.target.parentElement
	const text = item.children[1]
	//const id = text.id
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
		//newElem.setAttribute('id', `${id}`)
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
			//newElem.setAttribute('id', `${id}`)
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

const tick = (event) => {
	checked = !checked
	if (checked) {
		console.log('checked')
		itemArr.forEach((item, index) => {
			item.children[0].checked = true
			item.children[1].classList.add('active-item')
		})
	}else{
		console.log('unchecked')
		itemArr.forEach((item, index) => {
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



// show window && pass data
// edit
// delete
// close
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
	console.log('showWindow-event----')
	contentContainer.style.display = 'flex'
	// gadawodeba
	windowText.innerHTML = event.target.innerHTML
	// editi gadavcem event
}

const deleteInWindow = (event) => {
	console.log('deleteInWindow -----------', event.target)
	if (!beingEdited && confirm('Are you sure you want to delete this item')) {
		windowText.innerHTML = ''
		event.target.parentElement.remove()
	}
}

let oldValue
const editInWindow = (event) => {
	console.log('editInWindow -----------', event.target)
	beingEdited = !beingEdited
	if(beingEdited){
		console.log('beingedited---', beingEdited)
		itemEditBtn.innerHTML = 'SAVE'
		textArea.style.display = 'inline-block'
		textArea.value = windowText.innerHTML
		oldValue = windowText.innerHTML
		textArea.focus()
		windowText.style.display = 'none'
	}else{
		console.log('beingedited---', beingEdited)
		itemEditBtn.innerHTML = 'EDIT'
		windowText.style.display = 'inline-block'
		textArea.style.display = 'none'
		windowText.innerHTML = textArea.value;
		if (textArea.value.trim() !== '') {
			event.target.innerHTML = textArea.value
		}else{
			alert('Enter Text')
		}
	}
}

const closeWindow = (event) => {
	if(beingEdited) {
		windowText.innerHTML = oldValue;
		windowText.style.display = 'inline-block'
		textArea.style.display = 'none'
		itemEditBtn.innerHTML = 'EDIT'
	}
	contentContainer.style.display = 'none'
	beingEdited = false;
}

// let oldVal
// const editContainerItem = (event) => {
// 	console.log('editContainerItem', event.target)
// 	// event.target.innerHTML="changed"
// 	const windowText = document.getElementById('window-text')
// 	const editBtn = document.getElementsByClassName('controls')[0].children[1]
// 	beingEdited = windowText.nodeName === 'SPAN'
// 	let newElem
// 	if (beingEdited) {
// 		oldVal = windowText.innerHTML
// 		editBtn.innerHTML = 'SAVE'
// 		newElem = document.createElement('textarea')
// 		newElem.classList.add('editText')
// 		newElem.setAttribute('id', 'window-text')
// 		newElem.type = 'text'
// 		newElem.value = windowText.innerHTML
// 		newElem.addEventListener("keyup", (event) => {
// 			if (event.code === 'Enter') {
// 				event.preventDefault();
// 				editContainerItem(event)
// 			}
// 		});
// 		windowText.replaceWith(newElem)
// 		newElem.focus()
// 	} else {
// 		if (windowText.value.trim() !== '') {
// 			editBtn.innerHTML = 'EDIT'
// 			newElem = document.createElement('span')
// 			newElem.innerHTML = windowText.value
// 			newElem.setAttribute('id', 'window-text')
// 			newElem.addEventListener('dblclick', (e)=>{
// 				editContainerItem(e)
// 			})
// 			windowText.replaceWith(newElem)
// 			console.log()
// 			closeWindow(event)
// 		}else{
// 			alert('Enter Text')
// 		}
// 	}
// }
//
//
// const displayContent = (event) => {
// 	const windowText = document.getElementById('window-text')
// 	contentContainer.style.display = 'flex'
// 	windowText.innerHTML = event.target.innerHTML
// 	id = event.target.id
// }

// const closeWindow = (event) => {
// 	console.log('-----close wind ---', event.target)
// 	const text = contentContainer.children[1]
// 	let targetEl = document.getElementById(id.toString())
// 	if (text.tagName !== 'TEXTAREA') {
// 		if (text.innerHTML === '') {
// 			targetEl.parentElement.remove()
// 		} else {
// 			targetEl.innerHTML = text.innerHTML
// 		}
// 	}else{
// 		let oldSpan = document.createElement('span')
// 		oldSpan.innerHTML = oldVal
// 		oldSpan.setAttribute('id', 'window-text')
// 		oldSpan.addEventListener('dblclick', (e)=>{
// 			console.log("---oldspam", e.target)
// 			editContainerItem(event)
// 		})
// 		text.replaceWith(oldSpan)
// 	}
// 	contentContainer.style.display = 'none'
// 	beingEdited = false;
// }




// const removeContainerItem = (event) => {
// 	if (!beingEdited && confirm('Are you sure you want to delete this item')) {
// 		const text = contentContainer.children[1]
// 		text.innerHTML = ''
// 	}
// }
