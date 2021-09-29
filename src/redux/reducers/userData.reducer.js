import { combineReducers } from 'redux';

const linkListReducer = (state = [], action) => {
    // How to handle SET_GARDEN action to update our plants?
    switch (action.type) {
      case 'SET_LINK':
        return action.payload;
      default:
        return state;
    }
  };


  const userLinkPostReducer = () => {
    if (action.type === 'ADD_LINK') {
      return [...state, action.payload];
  }
  return state;

  }

  export default combineReducers({
    linkListReducer,
    userLinkPostReducer,
  });



  