
const http = require("http")
const url = require("url")
const fs = require("fs")
// IMPORTANDO EL ARCHIVO QUE UTILIZA NODEMAILER 
const {enviar} = require("./email")

// CREANDO EL SERVIDOR
const server = http.createServer (async(req, res)=> {

    // SECCION EMAIL
    if(req.url.includes('/email')){

        const {correos, asunto, contenido} = url.parse(req.url, true).query

        try {
            const respuesta = await enviar(correos, asunto, contenido)
            if(!respuesta.ok) return res.end(respuesta.msg)
            return res.end(respuesta.msg)

        } catch (error) {
            console.log('error de servidor')
            return res.end('fallo el servidor')
        }

        res.end('enviando correo...')
    }

    // SECCION FORMULARIO (LECTURA DEL HTML)
    if(req.url === '/formulario'){

        return fs.readFile('index.html', (err, html) => {

            if(err) return res.end('fallo en la lectura del html')
            
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(html)
        })

        res.end('formulario')
    }

})
server.listen(5000, () => console.log("Server ON"))