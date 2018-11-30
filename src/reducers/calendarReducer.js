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
      if (typeof(newState.dayObject[action.hour]) === 'undefined') {
        console.log('returning for undefined');
        return newState;
      }
      if (newState.dayObject[action.hour].positionsPainted) {
        newState.dayObject[action.hour].positionsPainted.push(action.position);
      } else {
        newState.dayObject[action.hour].positionsPainted = [action.position];
      }
      return newState;
    default:
      return state;
  }
}