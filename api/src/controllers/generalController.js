'use strict'

/*
* Verifica si llega toda la data obligatoría en la petición
*/
function verifyDataPetition( dataRequired, dataPetition ){
    let response = {
        code: 1,
        tag: 'SUCCESS',
        message: "Llegó toda la data necesaria",
        data: {}
    };

    let fieldRequired = '';
    for( let i=0; i < dataRequired.length; i++ ){
        fieldRequired = dataRequired[i];

        if( !dataPetition[fieldRequired] ){
            response = {
                code: 0,
                tag: 'FIELD_REQUIRED',
                message: `El campo '${fieldRequired}' es obligatorio`,
                data: {}
            };

            break;
        }
    }

    return response;
}

module.exports = {
    verifyDataPetition
}