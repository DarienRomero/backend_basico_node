const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const { nombre = "No name", apellido, apikey, page = 1, limit } = req.query;
    // res.send('Hello World') Para enviar un sitio web
    res.json({
        msg: "Get al api - controlador",
        nombre,
        apellido,
        apikey,
        page,
        limit
    });
};
const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: "put al api",
        id
    });
};
const usuariosPost = (req, res = response) => {
    const body = req.body;

    res.json({
        msg: "post al api",
        body
    });
};
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "delete al api"
    });
};
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
}