const axios = require("axios")

const indicar = async () => {
            // PETICION A LA API MINDICADOR Y CREACION DEL TEMPLATE
            try {
                const {data} = await axios.get(`https://mindicador.cl/api`)
                const dolar = data.dolar.valor
                const euro = data.euro.valor
                const uf = data.uf.valor
                const utm = data.utm.valor
                const mensaje = (`
                Los indicadores economicos de hoy son los siguientes: <br> <br>
                El valor del dolar el dia de hoy es: ${dolar} <br> <br>
                El valor del euro el dia de hoy es: ${euro} <br> <br>
                El valor del uf el dia de hoy es: ${uf} <br> <br>
                El valor del utm el dia de hoy es: ${utm} <br> <br>
                `)
                return mensaje
            } catch (error) {
                return console.log('error lectura')
            }
}


module.exports = {
    indicar
}