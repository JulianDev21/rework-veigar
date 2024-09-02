import {Router} from 'express'
import { getCuentas, getCuenta, postCuenta, deleteCuenta} from '../controllers/counterController.js'
import { consignarCuenta } from '../js/consignar.js';
import { retirarCuenta } from '../js/retirar.js';

const cuentaRouter = Router()

cuentaRouter.get('/',getCuentas) // Obtiene todas las cuentas
cuentaRouter.get('/:id',getCuenta) // Este espera el _id de la cuenta como parametro 
cuentaRouter.post('/',postCuenta) // Este espera un json en el body vacio para crear la cuenta correctamente
cuentaRouter.delete('/',deleteCuenta) // Este espera el _id de la cuenta como parametro
cuentaRouter.post('/consignar',consignarCuenta) // Este espera un json en el body de 
cuentaRouter.post('/retiro', retirarCuenta) // Este espera un json en el body de plateVehicle


// cuentaRouter.put('/:id', putCelda) // Este espera el _id de la celda como parametro y el json en el body con los campos a actualizar del vehichle



export default cuentaRouter