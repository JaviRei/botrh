const { addKeyword} = require('@bot-whatsapp/bot')
const SHEET_KEY = '1dl0o_oLC_AdQGGN99zLvQuReysbS1HU9c0dNj9EzH3Q'
const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs');
const doc = new GoogleSpreadsheet(SHEET_KEY)
const CREDENTIALS = JSON.parse(fs.readFileSync('./credenciales.json'))
const { downloadMediaMessage } = require("@whiskeysockets/baileys");
const { writeFile } = require("node:fs/promises");


let STATUS = {}

// /////////////////////editar datos //////////////////////
// const flowEdit_nombre = addKeyword('edit')
// .addAnswer(['Ingresa tu *NOMBRE* nuevamente, hazlo cuidadosamente, solo tienes esta oportunidad'],{capture:true},
//         async (ctx, {flowDynamic}) => {
//             telefono = ctx.from
//             nombre = STATUS[telefono] = {...STATUS[telefono], nombre: ctx.body}   
//             console.log(nombre)
//             await doc.useServiceAccountAuth({
//                 client_email: CREDENTIALS.client_email,
//                 private_key: CREDENTIALS.private_key
//             });

//             await doc.loadInfo();
//             let sheet = doc.sheetsByTitle['Registro_Bot']; 
//             let roww = await sheet.getRows();
//             console.log(roww)
//         for (let index = 0; index < roww.length; index++) {
//             const row = roww[index];    
//             if (row.telefono === telefono) {
               
//                 let rows = [{
            
                
//                     nombre: STATUS[telefono].nombre,    
                    
                    
//                         }];
                    
                    
//                         await doc.loadInfo();
//                         let sheet = doc.sheetsByIndex[0];
//                         for (let index = 0; index < rows.length; index++) {
//                             const row = rows[index];
//                         /*await sheet.addRow(row);*/}
                
    
//             }
            
//     }



//             await flowDynamic('Se a editado exitosamente')
//         }
// ).addAnswer('¿Deseas editar otro campo?',{capture:true},async (ctx,{flowDynamic,gotoFlow})=>{

//     if(ctx.body === 'si' || 'sii'){
//         return gotoFlow(editarDatos)
//     }
//     else{
//         await flowDynamic(['Gracias por registrar tu vacante', 'Revisaremos todos tus datos','En caso de que cumplas nuestros requisitos, nos pondremos en contacto contigo']);
//         await flowDynamic('Todos tus datos seran manejados con total discresion y solo para fines de reclutamiento','Visita nuestro aviso de privacidad www.shadesdemexico.com')
//     }
// })


// const editarDatos = addKeyword('2')
//     .addAnswer(
//         [
//             'Que campo deseas editar',
//             '1️⃣ Nombre',
//             '1️⃣ Apellido',
//             '1️⃣ Email',
//             '1️⃣ Edad',
//             '1️⃣ Vacante',
//         ],null,null,[flowEdit_nombre]
//     )


// // ////////////////////////////////////////////////////////////////////////




//FLOW INGRESAR DATOS - FORMULARIO
const flowSheet = addKeyword('3').addAnswer(
    [
        'Gracias por tu interes en nuestras vacantes,','',
        'Para crear tu solicitud de vacante, ayudanos registrando tus datos personales',
        'Toma en cuenta los siguientes puntos:',
        '',
        '🔻Ingresa tus datos de forma correcta, evita ingresar con errores',
        '🔻Ingresa datos veredicos, de lo contrario no se tomara en cuenta tu solicitud\n',
        '*REGISTRO DE SOLICITUD DE VACANTE*'
    ])


//////////////////  Ingresar Nombre ////////////////////////////////////

.addAnswer(
['👷 Ingresa tus nombres','( _*X sin apellidos*_ )'],
{capture:true,delay:1500},
async (ctx,{flowDynamic}) =>{
    telefono = ctx.from
    console.log('Nombre ',ctx.body)
    nombre= STATUS[telefono] = {...STATUS[telefono], nombre : ctx.body}                
    telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from}
                                                                                      
                                                                                  
    await flowDynamic()
})


//////////////////  Ingresar Apellido ////////////////////////////////////

.addAnswer(
'👷 Ingresa tu apellido paterno',
{capture:true},
async (ctx,{flowDynamic}) =>{
    telefono = ctx.from
    console.log('Apellido ',ctx.body)
    apellido= STATUS[telefono] = {...STATUS[telefono], apellido : ctx.body}
    await flowDynamic()
})

//////////////////  Ingresar Correo  ////////////////////////////////////

.addAnswer(
'✉️ Ingresa tu correo',
{capture:true},
async (ctx,{flowDynamic,fallBack}) =>{
    telefono = ctx.from

    if(ctx.body.includes('@')){
        console.log('Correo ',ctx.body)
        email = STATUS[telefono] = {...STATUS[telefono], email : ctx.body}      //Variable del STATUS
        await flowDynamic()
    }
    else{
        
        
        return fallBack('🚫 Entrada invalida, favor de ingresar un correo valido')
    }
        

})


//////////////////  Ingresar Edad  ////////////////////////////////////

.addAnswer('👷 Ingresa tu edad',
{capture:true},
async (ctx,{flowDynamic,fallBack}) =>{

    telefono = ctx.from
    old = parseInt(ctx.body)    

    if(!Number.isNaN(old)){
        edad = STATUS[telefono] = {...STATUS[telefono], edad : ctx.body} 
        console.log('Edad ',old)           //Variable del STATUS
        await flowDynamic()
    }
    else{
        
        return fallBack('🚫 Entrada invalida, favor de ingresar un caracter numerico')
        
    }

})


// //////////////////  Ingresar Solicitud  ////////////////////////////////////
// // .addAnswer(
// //     [
// //         'Adjunta tu solicitud','Puedes ser en formato *.jpg* o *.PDF*'
// //     ],
// //     {capture:true},
// //     async (ctx,{flowDynamic}) =>{
// //     telefono = ctx.from
// //     try {
// //         const buffer = await downloadMediaMessage(ctx, "buffer");
// //         await writeFile("./assets/img_conversaciones/image.jpeg", buffer);
// //         return await flowDynamic([{media:"./assets/img_conversaciones/image.jpeg"}])

// //       } catch (err) {
// //         console.log(err);
// //       }
// //       solicitud = STATUS[telefono] = {...STATUS[telefono], solicitud: ctx.body}
     
// //     })
   

// //////////////////  Ingresar vacante ////////////////////////////////////
.addAnswer(
    [
        '🏢 Ingresa la vacante de tu interes\n',
        '1️⃣ Auxiiar de Almacen General',
        '2️⃣ Auxiiar de Almacen & Descargas',
        '3️⃣ Costureros & Confección de Cortinas'
    ],
{capture:true},
async (ctx,{flowDynamic,fallBack}) =>{
    telefono = ctx.from
    let selec = ctx.body
    let respuesta


    old = parseInt(ctx.body)    

    if(!Number.isNaN(old) && old<4 && old>0){
        if(selec == 1){
          respuesta = '🚶‍♂️ Auxiliar de Almacén General'
          console.log('Vacante ',respuesta)
        }

        else if(selec == 2){
           respuesta = '🚛 Auxiliar de Almacén & Descargas'
           console.log('Vacante ',respuesta)
        }

        else{
             respuesta = '📍 Costureros & Confección de Cortinas'
             console.log('Vacante ',respuesta)
        }
    }else{
        return fallBack('🚫 Entrada invalida, elige las opciones mencionadas')
    }

    vacante = STATUS[telefono] = {...STATUS[telefono], vacante: respuesta}
    await flowDynamic()


 
   ingresarDatos();  
   
})

//////////////////  Vakidación de Datos  ////////////////////////////////////
.addAnswer('Registro de vacante exitosa!!',{delay:1000}, async (ctx, {flowDynamic}) =>{
    telefono = ctx.from
    
    const consultados = await consultarDatos(telefono)
    console.log(consultados)
    const Nombre = consultados['nombre']                        // AQUI DECLARAMOS LAS VARIABLES CON LOS DATOS QUE NOS TRAEMOS DE LA FUNCION         VVVVVVVVV
    const Apellido = consultados['apellido']
    const Email = consultados['email']
    const Telefono = consultados['telefono']    
    const Edad = consultados['edad']
    const Vacante = consultados['vacante']
    
    console.log(Nombre)         
    console.log(Apellido)
    console.log(Email)
    console.log(Vacante)
    
    await flowDynamic(`🔸 *Nombre*: ${Nombre}\n🔸*Appellido*: ${Apellido}\n🔸 *Correo*: ${Email}\n🔸 *Telefono*: ${Telefono}\n🔸 *Edad*: ${Edad} \n🔸 *Vacante*: ${Vacante}`)
    
    
    })

    .addAnswer(
        [
        '👏 *Gracias por registrar tu vacante*',
        'Revisaremos todos tus datos',
        'En caso de que cumplas nuestros requisitos, nos pondremos en contacto contigo'
        ],{delay:3000},
        null,)   
    .addAnswer(
        [
        'Todos tus datos seran manejados con total discresion y solo para fines de reclutamiento',
        'Visita nuestro aviso de privacidad www.shadesdemexico.com'
        ])
    
    

///////////////////////// Termina el flujo Sheets ////////////////////////////////////////

    


//////////// FUNCION AGREGAR DATOS A HOJA SHEET /////////////
async function ingresarDatos(){
    id_bot = STATUS[telefono] = {...STATUS[telefono], id: telefono + '@botwhatsapp' }
    date_n = new Date
    time_stamp = STATUS[telefono] = {...STATUS[telefono], time_stamp: date_n }    
    
    let rows = [{

    
    nombre: STATUS[telefono].nombre,    
    apellido: STATUS[telefono].apellido,
    email: STATUS[telefono].email,
    telefono: STATUS[telefono].telefono,
    edad: STATUS[telefono].edad,
    vacante: STATUS[telefono].vacante,
    id_bot: STATUS[telefono].id,
    time_stamp:STATUS[telefono].time_stamp
    
    
   
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
    


///////////// FUNCION PARA CONSULTAR DATOS ///////////////////
    async function consultarDatos(telefono){
        await doc.useServiceAccountAuth({
            client_email: CREDENTIALS.client_email,
            private_key: CREDENTIALS.private_key
        });
        await doc.loadInfo();
        let sheet = doc.sheetsByTitle['Registro_Bot'];                        
       
        consultados = [];
    
    
        let rows = await sheet.getRows();
        
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];    
            if (row.telefono === telefono) {
               
                consultados['nombre'] = row.nombre;  
                consultados['apellido'] = row.apellido;  
                consultados['email'] = row.email;                      
                consultados['telefono'] = row.telefono;
                consultados['edad'] = row.edad
                consultados['vacante'] = row.vacante
                //consultados['solicitud'] = row.solicitud
    
            }
            
    }
         
    return consultados
    
    }




module.exports = {flowSheet}




