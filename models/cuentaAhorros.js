import mongoose, { model, Schema } from 'mongoose';


// Define el esquema para una celda
const cuentaSchema = new Schema({
    numberCount: {
        type: Number,
        unique: true 
    },
    documentClient: {
        type: Number,
        unique: true,
        minLength: [11, "max length 11 characters"],

    },
    saldo: {
        type: Number,
        minLength: [1, "min length 6 characters"],
        default: 0
    },
    entryDate: {
        type: Date
    },
    claveAcceso: {
        type: String,
        minLength: [4, "min length 4 characters"]
    }
},
{
    timestamps: true, // Añade campos de `createdAt` y `updatedAt`
    versionKey: false // Desactiva el campo de versión `__v`
});

// Exporta el modelo basado en el esquema de celda
export default model("Cuenta", cuentaSchema);
