const { addKeyword} = require('@bot-whatsapp/bot');
const {flowSheet} = require('./flowSheet.js')
const { flowPrincipal,flowInfo } = require('../app.js');




const flowAlmacen = addKeyword(['1'])

 .addAnswer(
    ['*🕛 REQUISITOS*',
    'Nuestros horarios son: ',
    '🔸Lunes a Viernes de *9:00 am a 6:00 pm*',
    '🔸Sábados *8:30 am a 12:30 pm*'
],{delay:1000},async (ctx,{flowDynamic,provider})=>{
    await flowDynamic([{body:'*🕛 OFRECEMOS*\n✅ Cotizando al 100%\n✅ Fondo de Ahorro\n✅ PTU Competitivo (*Reparto de Utilidades*)\n✅ Pago semanal\n✅ Bono por recomendado (primer mes $1,000 y tercer mes $1,500)\n✅ Días por Matrimonio (5 Días)\n✅ Apoyo económico al nacimiento de hijos $3,000\n✅ Apoyo económico para útiles escolares (600 por Hijo)\n✅ Seguro de Vida\n✅ Día de Cumpleaños\n✅ Incentivo por Cumpleaños\n✅ Refrigerio diario\n✅ Despensa Anual'
    }])
})

.addAnswer(
    ['*🕛 HORARIO*',
     'Nuestros horarios son: ',
     '🔸Lunes a Viernes de *9:00 am a 6:00 pm*',
     '🔸Sábados *8:30 am a 12:30 pm*'
    ],
    {delay:1000},async (ctx,{flowDynamic,provider})=>{
        await flowDynamic([{body:'*📌 UBICACIÓN*\n Es *Calle 4 #2617*,\n Colonia *Zona industrial*\n Entre calles Av. Lopéz de Legaspi & Calle 5\nCerca de estación tren ligero *Urdañeta*'}])
        const id = ctx.key.remoteJid;
        await provider.sendLocation(id, 20.63921097868601, -103.3686870002755)
        
    }
   )

       .addAnswer(
        ['*🕛 REQUISITOS*',
        '❗ Mayor de 18  años',
        '❗ 1 A 2 Años de experiencia en Almacenes',
        '❗ Secundaria Concluida',
        '❗ Ganas de trabajar y crecimiento','','',
        '🔸¿Quieres aplicar a esta vacante?, escribe *SI/NO*','','🔸¿Quieres revisar otra vacante?, escribe *OTRA*','','🔸¿Quieres regresar al menu?, escribe *MENU*'
        ],{capture:true,media:'https://drive.google.com/uc?id=1bwVPD6PUr9UHNJxxMmtfooCax7wxFZ99'},async(ctx,{endFlow,gotoFlow})=>{
            //await flowDynamic('Quieres aplicar a esta vacante?')

            if(ctx.body == 'si'){
                return gotoFlow(flowSheet)
            }else if(ctx.body == 'otra'){
                return gotoFlow(flowInfo)
            }else{

            return gotoFlow(flowPrincipal)}
            //return endFlow('⬅️ Seras enviado al menu principal')
        }
       )    
     
    
module.exports = {flowAlmacen}
