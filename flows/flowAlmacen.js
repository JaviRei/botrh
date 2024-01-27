const { addKeyword, addAnswer } = require('@bot-whatsapp/bot');
const { flowSheet } = require('./flowSheet.js');
const { flowPrincipal } = require('../app.js');




 const flowAlmacen = addKeyword(['1'])

 .addAnswer(
    ['*🕛 REQUISITOS*',
    'Nuestros horarios son: ',
    '🔸Lunes a Viernes de *9:00 am a 6:00 pm*',
    '🔸Sábados *8:30 am a 12:30 pm*'
],{delay:1000})

.addAnswer(
    ['*🕛 HORARIO*',
     'Nuestros horarios son: ',
     '🔸Lunes a Viernes de *9:00 am a 6:00 pm*',
     '🔸Sábados *8:30 am a 12:30 pm*'
    ],
    {delay:1000},
   )


.addAnswer(
    ['*📌 UBICACIÓN*',
     'Es *Calle 4 #2617*,',
     'Colonia *Zona industrial*',
     'Entre calles Av. Lopéz de Legaspi & Calle 5',
     'Cerca de estación tren ligero *Urdañeta*'
    ])

.addAction(async (ctx, { provider }) => {
    const id = ctx.key.remoteJid;
    await provider.sendLocation(id, 20.63921097868601, -103.3686870002755)
    })
    
    .addAnswer(
        ['*🕛 OFRECEMOS*',
        '✅ Cotizando al 100%',
        '✅ Fondo de Ahorro',
        '✅ PTU Competitivo (*Reparto de Utilidades*)',
        '✅ Pago semanal',
        '✅ Bono por recomendado (primer mes $1,000 y tercer mes $1,500)',
        '✅ Días por Matrimonio (5 Días)',
        '✅ Apoyo económico al nacimiento de hijos $3,000',
        '✅ Apoyo económico para útiles escolares (600 por Hijo)',
        '✅ Seguro de Vida',
        '✅ Día de Cumpleaños',
        '✅ Incentivo por Cumpleaños',
        '✅ Refrigerio diario',
        '✅ Despensa Anual'
        ],{delay:1000}
        
       )
       .addAnswer(
        ['*🕛 REQUISITOS*',
        '❗ Mayor de 18  años',
        '❗ 1 A 2 Años de experiencia en producción y/o Almacenes',
        '❗ Secundaria Concluida',
        '❗ Ganas de salir adelante y crecer',
        ],{
            //Aqui ira la imagen del sueldo
            
             media:'https://drive.google.com/uc?id=1bwVPD6PUr9UHNJxxMmtfooCax7wxFZ99'
             
        },async(_,{gotoFlow})=>{
            return gotoFlow(flowDescicion)
        }
        
       )

    
    

    const flowDescicion = addKeyword('si').addAnswer('¿Quieres aplicar a la vacante?',{capture:true},async(ctx,{flowDynamic,gotoFlow})=>{
        console.log(ctx.body)
        if(ctx.body == 'si'){
            return gotoFlow(require('./flowSheet.js'))
        }else{
            await flowDynamic('Estas siendo dirigido al menu principal')
            return gotoFlow(require('../app.js'))
        }
    })


module.exports = {flowAlmacen}
