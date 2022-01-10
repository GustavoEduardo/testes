//const mongoose = require("mongoose");
import { Schema } from "mongoose";
import ISala from "../../types/ISala";

const schema = new Schema<ISala>({
    nome: { type: String, required: true },
    sid: { type: String, required: true },
    criada: {type: Date, default: Date.now},
    criador: { type: String, required: true },
    url: { type: String, required: true },
    duracao: String
})

export default schema;