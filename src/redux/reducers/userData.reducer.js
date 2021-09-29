

const linkListReducer = (state = [], action) => {
    // How to handle SET_GARDEN action to update our plants?
    switch (action.type) {
      case 'SET_LINKS':
        return action.payload;
      default:
        return state;
    }
  };



  export default linkListReducer;
