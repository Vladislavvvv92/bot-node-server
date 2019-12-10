const WebSocket = require('ws');
const server = new WebSocket.Server({port: 3000});
let timingQuestionStep1;
let timingStep1;
let timingStep2;
let timingStep3;
let timingStep4;
let timingStep5;
let isQuestionAsked = false;

server.on('connection', ws => {
    ws.on('message', message => {

        ws.send(JSON.stringify({'message': message  , 'from':'client'}));


        function clearTime() {
            clearTimeout(timingQuestionStep1);
            clearTimeout(timingStep1);
            clearTimeout(timingStep2);
            clearTimeout(timingStep3);
            clearTimeout(timingStep4);
            clearTimeout(timingStep5);
        }

        function question() {

            ws.send(JSON.stringify({'message':'Ты здесь?', 'from':'robot'}));
            isQuestionAsked = true;
        }

        function checkIsActiveStep() {

            if (isQuestionAsked === true) {
                if (message === 'y') {
                    ws.send(JSON.stringify({'message':'хорошо', 'from':'robot'}))

                }
                isQuestionAsked = false;
            }

        }


        clearTime();
        timingQuestionStep1 = setTimeout(question, 15000)
        timingStep1 = setTimeout(function () {
            ws.send(JSON.stringify({'message':'через 3 секунды я уйду', 'from':'robot'}))
        },30000)
        //timingStep2 = setTimeout(checkIsActiveStep, 30000)
        timingStep3 = setTimeout(function () {
            ws.close()
        },33000)
        /*timingStep4 = setTimeout(checkIsActiveStep, 45000)
        timingStep5 = setTimeout(function () {
            ws.close()
        },50000)*/
        checkIsActiveStep();



        if (message === 'сколько сейчас времени?') {
            function time() {
                const time = new Date();
                const hour = time.getHours();
                const minute = time.getMinutes();
                let messageTime = `${hour} : ${minute}`;
                return messageTime;
            }

            ws.send(JSON.stringify({'message':time(), 'from':'robot'}));
        }
        if (message === 'привет') {

            ws.send(JSON.stringify({'message':'привет', 'from':'robot'}));
        }

        if (message === 'как дела?') {

            ws.send(JSON.stringify({'message':'отлично, я же бот', 'from':'robot'}));
        }
        if (message === 'как тебя зовут?') {

            ws.send(JSON.stringify({'message':'Меня зовут бот Андрей', 'from':'robot'}));
        }
        if (message === 'пока') {

            ws.send(JSON.stringify({'message':'до свидания', 'from':'robot'}));
            ws.close();
        }
        if (message === 'я хочу у тебя спросить') {


            setTimeout(function () {
                ws.send(JSON.stringify({'message':'Ты не можешь с меня спросить', 'from':'robot'}))
            },3000);
            setTimeout(function () {
                ws.send(JSON.stringify({'message':'Максимум можешь поинтересоваться', 'from':'robot'}))
            },6000);
            setTimeout(function () {
                ws.send(JSON.stringify({'message':'спрашивают с лохов', 'from':'robot'}))
            },9000);
        }




    });


});
