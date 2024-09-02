import Cuenta from '../models/cuentaAhorros.js';

// Método para parquear un vehículo
export async function retirarCuenta(req, res) {
    let msg = 'Consignar successfully';
    const { numberCount, retiro} = req.body; 

    try {
        // Buscar una celda disponible
        const cuentaRetirar = await Cuenta.findOne({ numberCount: numberCount});

        if (!cuentaRetirar) {
            msg = 'No available cuenta';
            return res.status(404).json({ msg });
        }
        if(retiro > 0 && retiro <= cuentaRetirar.saldo){
            cuentaRetirar.saldo -= retiro;
        }else{
            return res.json({msg: "No se puede retirar valores inferiores o superiores al saldo"})
        }

        await cuentaRetirar.save();

    } catch (error) {
        console.error('Error consignar:', error); // Registrar el error en consola
        msg = error.message;
        return res.status(500).json({ msg });
    }

    res.json({ msg });
}
