const { addKeyword } = require('@bot-whatsapp/bot')


 const flowCostura = addKeyword(['3']).addAnswer('Nuestra vacante de Almacenista realiza funviones como surtido de faacturas, ingresos y egresos de pedidos, etc').addAnswer(
    ['*🕛 HORARIO*',
     'Nuestros horarios son de Lunes a Viernes de 9:00 am a 6:00 pm',
     'Sábados 8:30 am a 12:30 pm',
     'Con 30 min de comida'
    ])
.addAnswer(
    ['*📌 UBICACIÓN*',
     'Nuestra ubicación es Calle 4 #2617, Colonia Zona industrial',
     'Entre calles Av. Lopéz de Legaspi & Calle 5'
    ])
.addAction(async (ctx, { provider }) => {
    const id = ctx.key.remoteJid;
    console.log(id)
    await provider.sendLocation(id, 20.63921097868601, -103.3686870002755)
}).addAnswer('Esta es nuestra oferta laboral ',
 {
    media:'https://drive.google.com/uc?id=10Po9YLYF0a_NP2BmNgBkfddaMyv3jrs_'
 })

module.exports = {flowCostura}


