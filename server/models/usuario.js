const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};

const Schema = mongoose.Schema;

let userSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El email es necesario'] },
    password: { type: String, required: [true, 'El password es necesario'] },
    img: { type: String, required: false },
    role: { type: String, enum: rolesValidos, default: 'USER_ROLE'},
    estado: { type: Boolean,  default: true },
    google: { type: Boolean, default: false }
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
 }
 
userSchema.plugin( uniqueValidator, { message: '{PATH} no esta disponible' });

module.exports = mongoose.model('usuarios', userSchema);