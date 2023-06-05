const { handleHttpError } = require("../utils/handleError")
/**
 * Array con los roles permitidos
 * @param {*} roles
 * @returns 
 */

const checkAdminRole = (req, res, next) => {
    console.log(req.user.nickname)
    // Comprueba que req.user esté definido y que tenga una propiedad 'role'
    if (req.user.role==1) {
      // Retorna el rol del usuario
      next()
    }else{
  
    // Si no se encuentra un rol válido, retornamos un error de HTTP
    handleHttpError(res, "NOT_PERMISSION_ONLY_FOR_ADMIN", 401);
    }
  };


  module.exports = checkAdminRole