const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require("../models/usuario");

const usuariosGet = async(req = request, res = response) => {
    // const { nombre = "No name", apellido, apikey, page = 1, limit } = req.query;
    // res.send('Hello World') Para enviar un sitio web
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    /* total = await Usuario.countDocuments(query);
    usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite)); */

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
};
const usuariosPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    //TODO: Validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        usuario
    });
};
const usuariosPost = async(req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //Guardar en DB
    await usuario.save();

    res.json({
        usuario
    });
};
const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.json(usuario);
};
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
}