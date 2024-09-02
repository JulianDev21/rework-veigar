import Cuenta from '../models/cuentaAhorros.js';

// Método para parquear un vehículo
export async function consignarCuenta(req, res) {
    let msg = 'Consignar successfully';
    const { numberCount, consignacion} = req.body; 

    try {
        // Buscar una celda disponible
        const cuentaConsignar = await Cuenta.findOne({ numberCount: numberCount});

        if (!cuentaConsignar) {
            msg = 'No available cuenta';
            return res.status(404).json({ msg });
        }
        if(consignacion > 0){
            cuentaConsignar.saldo += consignacion;
        }else{
            return res.json({msg: "No se pueden consignar valores negativos"})
        }

        await cuentaConsignar.save();

    } catch (error) {
        console.error('Error consignar:', error); // Registrar el error en consola
        msg = error.message;
        return res.status(500).json({ msg });
    }

    res.json({ msg });
}
