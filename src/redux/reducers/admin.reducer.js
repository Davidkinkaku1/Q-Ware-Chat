


const adminGetReducer = (state =[], action) => {
    if (action.type === 'SET_ADMIN_LIST') {
        console.log("here is the payload for ADMINGETReducer", action.payload)
        return action.payload;
    }
    return state;
}; // end of the adminGetReducer



export default adminGetReducer;
