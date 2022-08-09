const socket = io()
let _name;

let textArea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message-area')

do {
    _name = prompt('Please enter your name: ')
} while(!_name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: _name,
        message: message.trim()
    }

    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scroll()

    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scroll()
})

function scroll() {
    messageArea.scrollTop = messageArea.scrollHeight
}