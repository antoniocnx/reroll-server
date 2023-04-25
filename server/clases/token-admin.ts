import jwt from 'jsonwebtoken';


export default class TokenAdmin {

    private static seed: string = 'este-es-el-seed-de-mi-app-secreto';
    private static caducidad: string = '30d';

    constructor() { }

    static getJwtTokenAdmin( payload: any ): string {
        return jwt.sign({
            admin: payload
        }, this.seed, { expiresIn: this.caducidad });
    }

    static comprobarTokenAdmin( adminToken: string ) {

        return new Promise( (resolve, reject ) => {

            jwt.verify( adminToken, this.seed, ( err: any, decoded: unknown ) => {
    
                if ( err ) {
                    reject();
                } else {
                    resolve( decoded );
                }
    
    
            })

        });

    }


}


