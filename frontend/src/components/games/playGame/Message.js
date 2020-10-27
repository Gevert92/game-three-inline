//Importacion npm
import React, {Fragment} from 'react';

const Message = ( {message} ) => {
    return ( 
        <Fragment>
            <div className="col-sm-4 offset-sm-3 text-center mt-4">
                <h2 className="tittle-game-play">{ message }</h2>
            </div>
        </Fragment>
    );
}
 
export default Message;