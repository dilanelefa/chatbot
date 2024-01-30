const socket = io()

const inputField = document.getElementById('message')
const buttonSend = document.getElementById('send-message')
const messages = document.querySelector('.message-content')
messages.innerHTML = ''

const createMessage = (text, date, left=true) => {
    // <div class="message-box left">
    //     <div class="img">
    //         <img src="/images/user04.jpg">
    //     </div>
    //     <div class="content">
    //         <p>
    //             Bonsoir.
    //         </p>
    //     </div>
    //     <div class="date">
    //         <p>12:50 AM</p>
    //     </div> 
    // </div>

    const messageBox = document.createElement('div')
    messageBox.classList.add('message-box')
    if(left){
        messageBox.classList.add('left')
    }
    else{
        messageBox.classList.add('right')
    }

    const img = document.createElement('div')
    img.classList.add('img')
    img.innerHTML = '<img src="/images/user03.jpg">'
    if(left)
        img.innerHTML = '<img src="/images/user04.jpg">'


    const content = document.createElement('div')
    content.classList.add('content')
    content.innerHTML = `${text}`

    const dateE = document.createElement('date')
    dateE.classList.add('date')
    dateE.innerHTML = `<p>${date}<p>`

    messageBox.appendChild(img)
    messageBox.appendChild(content)
    messageBox.appendChild(dateE)

    return messageBox
}   

const send = (text) => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const box = createMessage(text, `${hours}:${minutes}`, false)
    messages.appendChild(box)
    messages.scrollTop = messages.scrollHeight
    socket.emit('chat prompt', text)
}

const receive = (text) => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const box = createMessage(text, `${hours}:${minutes}`, true)
    messages.appendChild(box)
}

buttonSend.addEventListener('click', (event) => {
    event.preventDefault()
    const text = inputField.value;
    inputField.value = ''
    if(text.trim() !== '')
        send(text)
})

socket.on('chat prompt', receive)