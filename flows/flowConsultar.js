const { addKeyword} = require('@bot-whatsapp/bot')
const SHEET_KEY = '1dl0o_oLC_AdQGGN99zLvQuReysbS1HU9c0dNj9EzH3Q'
const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs');
const doc = new GoogleSpreadsheet(SHEET_KEY)
const CREDENTIALS = JSON.parse(fs.readFileSync('./credenciales.json'))





const flowConsultar = addKeyword('1')
.addAnswer(['Dame unos segundo, estoy buscando tus datos dentro del sistema... 🔍'])
.addAnswer(['Según el teléfono del cuál me estas escribiendo, tengo estos datos:'],{delay:1500}, async (ctx, {flowDynamic}) =>{
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


};


module.exports = {flowConsultar}




