const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { esRoleValido, existeEmail, existeUsuarioPorID } = require('../helpers/db-validators');
const router = Router();

router.get('/', usuariosGet);
router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom((id) => existeUsuarioPorID(id)),
    // check('rol').custom((rol) => esRoleValido(rol)),
    validarCampos
], usuariosPut);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    // check('rol', 'No es un rol válido').isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check('correo').custom((correo) => existeEmail(correo)),
    check('rol').custom((rol) => esRoleValido(rol)),
    validarCampos
], usuariosPost);
router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom((id) => existeUsuarioPorID(id)),
    validarCampos
], usuariosDelete);

module.exports = router;