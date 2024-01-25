const { addKeyword} = require('@bot-whatsapp/bot')
const SHEET_KEY = '1dl0o_oLC_AdQGGN99zLvQuReysbS1HU9c0dNj9EzH3Q'
const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs');
const doc = new GoogleSpreadsheet(SHEET_KEY)
const CREDENTIALS = JSON.parse(fs.readFileSync('./credenciales.json'))

const {flowConsultar} = require('./flowConsultar.js')

let STATUS = {}


//FLOW INGRESAR DATOS - FORMULARIO
const flowSheet = addKeyword('p').addAnswer('Hola! soy un chatbot que está vinculado con Google SpreadSheet, *responde a las siguientes preguntas*:')

//Nombre
.addAnswer(
'¿Cual es tu nombre?',
{capture:true},
async (ctx,{flowDynamic}) =>{
    telefono = ctx.from
    nombre= STATUS[telefono] = {...STATUS[telefono], nombre : ctx.body}                
    telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from}                                                                                     
    id_sheet = telefono + '@botwhatsapp'                                                                                
    await flowDynamic()
})

//Apellido
.addAnswer(
'Ingresa tu apellido paterno',
{capture:true},
async (ctx,{flowDynamic}) =>{
    telefono = ctx.from
    apellido= STATUS[telefono] = {...STATUS[telefono], apellido : ctx.body}
    await flowDynamic()
})

.addAnswer(
'Ingresa tu correo',
{capture:true},
async (ctx,{flowDynamic,fallBack}) =>{
    telefono = ctx.from

    if(!ctx.body.includes('@')){
        return fallBack()
    }
    else{
        email = STATUS[telefono] = {...STATUS[telefono], email : ctx.body}      //Variable del STATUS
        await flowDynamic()
    }
        

})



.addAnswer('Ingresa tu edad',
{capture:true},
async (ctx,{flowDynamic,fallBack}) =>{

    telefono = ctx.from
    old = parseInt(ctx.body)    

    if(!Number.isNaN(old)){
        edad = STATUS[telefono] = {...STATUS[telefono], edad : ctx.body}            //Variable del STATUS
        await flowDynamic()
    }
    else{
        return fallBack()
        
    }

})

//Ingresar vacante
.addAnswer(
    [
        'Ingresa la vacante de tu interes',
        '1️⃣ Auxiiar de Almacen General',
        '2️⃣ Auxiiar de Almacen & Descargas',
        '3️⃣ Costureros & Confección de Cortinas'
    ],
{capture:true},
async (ctx,{flowDynamic}) =>{
    telefono = ctx.from
    let selec = ctx.body
    let respuesta

    if(selec == 1){
         respuesta = '🚶‍♂️ Auxiliar de Almacén General'
    }

    else if(selec == 2){
         respuesta = '🚛 Auxiliar de Almacén & Descargas'
    }

    else{
         respuesta = '📍 Costureros & Confección de Cortinas'
    };

    vacante = STATUS[telefono] = {...STATUS[telefono], vacante: respuesta}
    await flowDynamic()

    
   //ESTA FUNCION AÑADE UNA FILA A SHEETS  
   ingresarDatos();  
   async function ingresarDatos(){
    console.log(STATUS[telefono].telefono)
    let rows = [{

   
    id: STATUS[telefono].id_sheet,
    nombre: STATUS[telefono].nombre,    
    apellido: STATUS[telefono].apellido,
    email: STATUS[telefono].email,
    telefono: STATUS[telefono].telefono,
    edad: STATUS[telefono].edad,
    vacante: STATUS[telefono].vacante
   
        }];
    
    await doc.useServiceAccountAuth({
            client_email: CREDENTIALS.client_email,
            private_key: CREDENTIALS.private_key
        });
        await doc.loadInfo();
        let sheet = doc.sheetsByIndex[0];
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            await sheet.addRow(row);}
}
    
})

.addAnswer('Son correctos tus datos?',{delay:1000}, async (ctx, {flowDynamic}) =>{
    telefono = ctx.from
    
    const consultados = await consultarDatos(telefono)
    
    const Nombre = consultados['nombre']                        // AQUI DECLARAMOS LAS VARIABLES CON LOS DATOS QUE NOS TRAEMOS DE LA FUNCION         VVVVVVVVV
    const Apellido = consultados['apellido']
    const Email = consultados['email']
    const Telefono = consultados['telefono']    
    const Edad = consultados['edad']
    const Vacante = consultados['vacante']
    
    console.log(consultados)
    await flowDynamic(`- *Nombre*: ${Nombre}\n- *Appellido*: ${Apellido}\n- *Correo*: ${Email}\n- *Telefono*: ${Telefono}\n- *Edad*: ${Edad} \n- *Vacante*: ${Vacante}`)
    
    
    })

    .addAnswer([
        '1️⃣ *SI*',
        '2️⃣ *NO*'
    ],
    {delay:1500},null,[])   
    
    
    async function consultarDatos(telefono){
        await doc.useServiceAccountAuth({
            client_email: CREDENTIALS.client_email,
            private_key: CREDENTIALS.private_key
        });
        await doc.loadInfo();
        let sheet = doc.sheetsByTitle['Registro_Bot'];                        // AQUÍ DEBES PONER EL NOMBRE DE TU HOJA
       
        consultados = [];
    
    
        let rows = await sheet.getRows();
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];    
            if (row.telefono === telefono) {
               
                consultados['nombre'] = row.nombre;  
                consultados['apellido'] = row.apellido;  
                consultados['email'] = row.email;                      // AQUÍ LE PEDIMOS A LA FUNCION QUE CONSULTE LOS DATOS QUE QUEREMOS CONSULTAR EJEMPLO:       // consultados['EL NOMBRE QUE QUIERAS'] = row.NOMBRE DE LA COLUMNA DE SHEET
                consultados['telefono'] = row.telefono;
                consultados['edad'] = row.edad
                consultados['vacante'] = row.vacante
    
            }
               
    }
            
    return consultados
    
    }

module.exports = {flowSheet}




