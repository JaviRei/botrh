const { addKeyword} = require('@bot-whatsapp/bot')


 const flowPreguntas = addKeyword(['2']).addAnswer(['¡Entiendo que puedas tener preguntas! Estoy aquí para ayudarte.','Estas son algunas preguntas frecuentes:'])
 .addAnswer(
    [
        '*Selecciona la opción de tu interes*',
        '1️⃣ ¿Cuales son los horarios de trabajo?',
        '2️⃣ ¿Cual es la ubicación?',
        '3️⃣ ¿Cuales son los requisitos',
        '4️⃣ ¿'
    ])




module.exports = {flowPreguntas}




