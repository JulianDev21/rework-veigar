import mongoose from 'mongoose';
import Cuenta from '../models/cuentaAhorros.js';
import Counter from '../models/counter.js'; // Asegúrate de importar el modelo Counter correctamente
import bcrypt from 'bcryptjs'

// Método GET
export async function getCuentas(req, res) {
    try {
        const cuentas = await Cuenta.find();
        res.json(cuentas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Método GET celda especifica
export async function getCuenta(req,res){

    const {id} =req.params;

    try{
        const cuenta = await Cuenta.findById(id)

        if (!cuenta){
            return res.status(404).json({msg: 'cuenta not found'})
        }

        res.json(cuenta);
    }
    catch(error){
        res.status(500).json({error:error.msg})
    }
}


// Método POST
export async function postCuenta(req, res) {
    let msg = 'Cuenta inserted';
    const body = req.body;

    const { claveAcceso} = req.body


    try {
        
        // Encuentra y actualiza el contador de manera manual
        const counter = await Counter.findOneAndUpdate(
            { _id: 'numberCount' }, // Usando 'numberCount' como referencia
            { $inc: { seq: 1 } },   // Incrementa el contador
            { new: true, upsert: true } // Crea si no existe y devuelve el nuevo valor
        );

        if (!counter) {
            throw new Error('Counter not found');
        }

        // Asignar el valor de `seq` al campo `numberCount`
        body.numberCount = counter.seq;

        // Encriptar clave de acceso
        body.claveAcceso = bcrypt.hashSync(claveAcceso, 10); // Se recomienda usar un salt de 10


        console.log('Body before saving Cuenta:', body); // Debugging: verifica el objeto body

        // Crear y guardar el nuevo documento
        const cuenta = new Cuenta(body);
        await cuenta.save();
    } catch (error) {
        console.error('Error inserting Cuenta:', error); // Debugging: muestra el error en consola
        msg = error.message;
    }

    res.json({ msg });
}

// //Método put
// export async function putCelda(req,res){
//     let msg= 'Celda updated'
//     const {id} =req.params;

//     const { numberCount, documentClient, saldo, entryDate, claveAcceso} = req.body

//     try{
//         // Concatenar numbercell y plateVehicle para crear el PIN
//         const concatenatedString = `${numbercell}${plateVehicle}`;
//         const hashedPin = bcrypt.hashSync(concatenatedString, 10); // Se recomienda usar un salt de 10
//         const newStatus = 'no disponible'

//         await Celda.findOneAndUpdate({_id:id},{status: newStatus, plateVehicle:plateVehicle, entryDate, departureDate:departureDate, pin:hashedPin})
//     }catch (error){
//         msg=error
//     }
//     res.json({msg:msg})
// }

// Método Delete
export async function deleteCuenta(req, res) {
    const msg = 'Cuenta eliminada';
    const { numberCount, id } = req.body;

    try {
        const cuenta = await Cuenta.findOne({ numberCount: numberCount });

        if (!cuenta) {
            return res.json({ msg: 'Cuenta no encontrada' });
        }

        if (cuenta.saldo === 0) {
            await Cuenta.findByIdAndDelete(id);
            return res.json({ msg: msg });
        } else {
            return res.json({ msg: 'La cuenta no se puede eliminar ya que tiene saldo a favor' });
        }

    } catch (error) {
        console.error(error); 
        return res.json({ msg: 'Hubo un problema al eliminar la cuenta' });
    }
}


