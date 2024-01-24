const { addKeyword } = require('@bot-whatsapp/bot')


 const flowDescargas = addKeyword(['2']).addAnswer('Nuestra vacante de Almacenista realiza funviones como surtido de faacturas, ingresos y egresos de pedidos, etc').addAnswer(
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
    await provider.sendLocation(id, 20.63921097868601, -103.3686870002755)
}).addAnswer('Esta es nuestra oferta laboral ',
{
    capture:true,
    media:'https://images.unsplash.com/photo-1682687980976-fec0915c6177?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
})



module.exports = {flowDescargas}




