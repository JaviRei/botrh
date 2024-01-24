const { addKeyword } = require('@bot-whatsapp/bot')

let correo 

 const flowAlmacen = addKeyword(['1'])

 .addAnswer(
    ['*🕛 REQUISITOS*',
    'Nuestros horarios son: ',
    '🔸Lunes a Viernes de *9:00 am a 6:00 pm*',
    '🔸Sábados *8:30 am a 12:30 pm*'
],{delay:1500})

.addAnswer(
    ['*🕛 HORARIO*',
     'Nuestros horarios son: ',
     '🔸Lunes a Viernes de *9:00 am a 6:00 pm*',
     '🔸Sábados *8:30 am a 12:30 pm*'
    ],{delay:1000})

.addAnswer(
    ['*📌 UBICACIÓN*',
     'Es *Calle 4 #2617*,',
     'Colonia *Zona industrial*',
     'Entre calles Av. Lopéz de Legaspi & Calle 5',
     'Cerca de estación tren ligero *Urdañeta*'
    ],{delay:1000})

.addAction(async (ctx, { provider }) => {
    const id = ctx.key.remoteJid;
    await provider.sendLocation(id, 20.63921097868601, -103.3686870002755)
    })
    

.addAnswer('Ingresa tu correo',
    {
        capture:true,
         media:'https://drive.google.com/uc?id=1ll-DP_ngGEY_LDdLk71ZeBDYlGshDLZw'
         
    },(ctx,{fallBack})=>{

        if(!ctx.body.includes('@')){
            return fallBack()
        }

        console.log("Este fue el correo",ctx.body)
        correo=ctx.body;
        console.log(`esta es la variable correo ${correo}`)
    })



module.exports = {flowAlmacen}
