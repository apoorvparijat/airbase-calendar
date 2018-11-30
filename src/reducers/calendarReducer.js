const initialState = {
  dayObject: {}
};

export function calendarReducer(state = initialState, action) {
  let newState = { ...state };
  switch(action.type) {
    case 'UPDATE_DAY_OBJECT':
      newState.dayObject = action.dayObject;
      return newState;
    case 'POSITION_PAINTED':
      if (typeof(newState.dayObject[action.minute]) === 'undefined') {
        console.log('returning for undefined');
        return newState;
      }
      if (newState.dayObject[action.minute].positionsPainted) {
        newState.dayObject[action.minute].positionsPainted.push(action.position);
      } else {
        newState.dayObject[action.minute].positionsPainted = [action.position];
      }
      return newState;
    default:
      return state;
  }
}