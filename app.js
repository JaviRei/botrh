
const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


//FLOWS IMPORTADOS
const {flowAlmacen} = require('./flows/flowAlmacen.js')
const {flowPreguntas} = require('./flows/flowPreguntas.js')
const {flowDescargas} = require('./flows/flowDescargas.js')
const {flowCostura} = require('./flows/flowCostura.js')
const {flowSheet} = require('./flows/flowSheet.js')
// const {flowInfo} = require('./flows/flowVacantes.js')




const flowInfo = addKeyword(['1']).addAnswer('Seleciona la vacante de tu interes')
    .addAnswer('1️⃣ Auxiiar de Almacen General')
    .addAnswer('2️⃣ Auxiiar de Almacen & Descargas')
    .addAnswer('3️⃣ Costureros & Confección de Cortinas',
    null,
    null,
    [flowAlmacen,flowDescargas,flowCostura])


const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAnswer(['Hola 👋, Bienvenido a Shades de México,','este es el bot de *recursos humanos*','Estoy aqui para proporcionarte información sobre nuestras vacantes activas','¿Cómo puedo ayudarte?'])
    .addAnswer(
        [
            'Selecciona la opción deseada',
            '1️⃣ Vacantes Activas',
            '2️⃣ Preguntas Frecuentes',
            '3️⃣ Aplicar a Vacante'
        ],
        null,
        null,
        [flowInfo,flowPreguntas,flowSheet]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()

