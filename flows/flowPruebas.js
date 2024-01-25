const { addKeyword} = require('@bot-whatsapp/bot')

 


 const flowPruebas = addKeyword(['p']).addAnswer(['Estas en las pruebas'],null, 
 async (_, {flowDynamic,gotoFlow})=>{
    console.log('Entramos al console log')
    await flowDynamic([{body:'Estamos en el flowdynamic',media:'https://drive.google.com/uc?id=1EcCadvFDX-edPCOOAsGztQD8UgNvo7Kn'}])

     return gotoFlow(flowAlmacen)
 }

    
    )

//const flowPrueba = addKeyword('ya').addAnswer('Estamos en 2')

module.exports = {flowPruebas}




