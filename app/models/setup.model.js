let mongoose = require('mongoose');

let setupSchema = mongoose.Schema({
  circuit: {
    nom: String
  },

  pilote: {
    nom: String,
    prenom: String,
    licence: String
  },

  chassis: {
    marque: String,
    modele: String,
    chassis_number: String,
    front_axle: {
      hauteur: Number,
      largeur: Number
    },

    roar_axle: {
      hauteur: Number,
      largeur: Number
    },

    front_cross: String,
    jantes: String,
    pressure: {
      avg: Number,
      avd: Number,
      arg: Number,
      ard: Number
    }
  },

  moteur: {
    marque: String,
    modele: String,
    motor_number: String,
    transmission: String,
    carburation: {
      aiguille: Number,
      boisseau: String,
      gicleur_principal: Number,
      gicleur_bas: Number
    }
  },

  meteo: {
    temps: String,
    temperature: Number,
    pressure: Number,
    humidite: Number
  },

  session: {
    session_type: String,
    nb_tours: Number
  },
  date: Date,
  chrono: Number

  }, {
    timestamps: true
});

module.exports = mongoose.model('Setup', setupSchema);
