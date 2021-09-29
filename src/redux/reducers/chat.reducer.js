
const getMessageReducer = (state = [], action) => {
    // How to handle SET_LINK
    switch (action.type) {
      case 'SET_MESSAGES':
        return action.payload;
      default:
        return state;
    }
  }; // WORKING ON GETTING NEW MESSAGES AND SETTING THE LIST





  export default getMessageReducer;
  




  