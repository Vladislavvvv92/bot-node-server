const status = document.getElementById('status');
const message = document.getElementById('message');
const form = document.getElementById('form');
const input = document.getElementById('input');

const ws = new WebSocket('ws://localhost:3000');

function setStatus(value) {
    status.innerHTML = value;
}

function printMessage(value) {
    let li;
    console.log(value)
    let response = JSON.parse(value);
    console.log(response['message'])
    // console.log(response['message'])
    if (response['from'] === 'robot') {
        li = document.createElement('li');
        li.innerHTML = response['message'];
        message.appendChild(li)
        li.style.justifyContent = 'flex-start';
    }
    if (response['from'] === 'client') {
        li = document.createElement('li');
        li.innerHTML = response['message'];
        message.appendChild(li)
        li.style.justifyContent = 'flex-end';
    }
    if (response['from'] === 'system'){
        li = document.createElement('li');
        li.innerHTML = response['message'];
        message.appendChild(li)
        li.style.justifyContent = 'center';
    }
}

form.addEventListener('submit', event => {
    event.preventDefault();
    ws.send(input.value)
    input.value = '';

})


ws.onopen = () => setStatus('ONLINE');

ws.onclose = () => setStatus('DISCONNECT');

ws.onmessage = response => printMessage(response.data)
