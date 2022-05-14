
const nodemailer = require("nodemailer")
const fs = require("fs")
const { v4: uuidv4 } = require("uuid")
// IMPORTACION DE LA LECTURA DE LA API
const {indicar} = require("./indicador")

// FUNCION QUE RECIBE LA LISTA DE CORREOS, ASUNTO Y CONTENIDO A ENVIAR
const enviar = async (to, subject, text) => {

    const transportador = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "bd2b9b539bfcdb",
          pass: "6d6d7dae3527ae"
        }
    })

    // TEMPLATE DE LA RESPUESTA DE LA API
    const textoapi = await indicar()

    const options = {
        from: 'contacto@soyelproovedor.cl',
        to,
        subject,
        html: text + textoapi 
    }
    
    try {
        // ALMACENAMIENTO DE CORREOS NOMBRADOS CON UUID
        const fileContent = `
                            De :${options.from}
                            Para :${to} 
                            Asunto: ${subject}
                            Contenido: ${options.html}`
        const filePath = `./correos/${uuidv4()}.txt`

        fs.writeFile(filePath, fileContent, (err) => {
        if (err) throw err
        console.log("Archivo creado")
        })

        // MENSAJE DE EXITO O ERROR POR CADA INTENTO DE ENVIO DE CORREOS
        const info = await transportador.sendMail(options)
        return {ok: true, msg: 'correo enviado'}
    } catch (error) {
        return {of: false, msg: 'fallo el envio'}
    }

}

module.exports = {
    enviar
}