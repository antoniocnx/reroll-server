import { Response, Request, NextFunction } from 'express';
import Token from '../clases/token';
import TokenAdmin from '../clases/token-admin';
 

// export const verificaToken = ( req: any, res: Response, next: NextFunction  ) => {

//     const userToken = req.get('x-token') || '';

//     Token.comprobarToken( userToken )
//         .then(  (decoded: any) => {
//             console.log('Decoded', decoded );
//             req.usuario = decoded.usuario;
//             next();
//         })
//         .catch( err => {

//             res.json({
//                 ok: false,
//                 mensaje: 'Token incorrecto'
//             });

//         });

// }

export const verificaToken = ( req: any, res: Response, next: NextFunction  ) => {

    const userToken = req.get('x-token') || '';
    const userToken2 = req.get('x-token-2') || '';

    if (userToken && userToken2) {
      // Ambos tokens están presentes, verifica ambos
      Promise.all([
        Token.comprobarToken(userToken),
        Token.comprobarToken(userToken2)
      ]).then((decoded: any) => {
        console.log('Decoded', decoded);
        req.usuario = decoded[0].usuario; // Primer usuario autenticado
        req.usuario = decoded[1].usuario; // Segundo usuario autenticado
        next();
      }).catch(err => {
        res.json({
          ok: false,
          mensaje: 'Token incorrecto'
        });
      });
    } else if (userToken) {
      // Solo se proporcionó un token, verifica solo el primer usuario
      Token.comprobarToken(userToken)
        .then((decoded: any) => {
          console.log('Decoded', decoded);
          req.usuario = decoded.usuario;
          next();
        })
        .catch(err => {
          res.json({
            ok: false,
            mensaje: 'Token incorrecto'
          });
        });
    } else {
      res.json({
        ok: false,
        mensaje: 'Token no proporcionado'
      });
    }
}


export const verificaTokenAdmin = ( req: any, res: Response, next: NextFunction  ) => {

    const adminToken = req.get('y-token') || '';

    TokenAdmin.comprobarTokenAdmin( adminToken )
        .then(  (decoded: any) => {
            console.log('Decoded', decoded );
            req.admin = decoded.admin;
            next();
        })
        .catch( err => {

            res.json({
                ok: false,
                mensaje: 'Token incorrecto'
            });

        });

}


