import * as types from './actionTypes';

const initialSate={
    contacts : [],
    contact :{}
}


const contactReducer = (state =initialSate,action)=>{
    switch(action.type){ 
        case types.GET_CONTACTS:
            return{
                ...state,
                contacts:action.payload,
                
            };
        

            case types.GET_CONTACT:
                return{
                    ...state,
                    contact:action.payload,
                    
                };

                case types.RESET:
                    return{
                        ...state,
                        contact:{},
                        
                    };
            default:
        return state;
    }
};

export default contactReducer;