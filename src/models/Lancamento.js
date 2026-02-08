import mongoose from "mongoose";

const lancamentoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    tipo: {
      type: String,
      enum: ["receita", "despesa"],
      required: true
    },

    descricao: {
      type: String,
      required: true,
      trim: true
    },

    valor: {
      type: Number,
      required: true,
      min: 0
    },

    categoria: {
      type: String,
      required: true
    },

    data: {
      type: Date,
      required: true,
      default: Date.now
    },

    recorrente: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Lancamento", lancamentoSchema);
