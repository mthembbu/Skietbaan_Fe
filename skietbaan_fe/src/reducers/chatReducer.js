import { SENDMESSAGE, CONNECTUSER ,GETMESSAGE ,EMPTYMESSAGEARRAY} from '../actions/types'

const initialState = {
    currentUser:'',
    roomId:'',
    lastMessage:'',
    messages:[],
    rooms:[],
    users:[]
}

export default function(state = initialState, action) {
    switch(action.type){
        case SENDMESSAGE:
        return {
            ...state,
            allItems: action.payload
          };
          case CONNECTUSER:
          return{
              ...state,
              currentUser:action.payload,
              rooms:action.pay
          }
          case GETMESSAGE:
          return {
            ...state,
            messages:action.payload,
            roomId:action.pay,
            users:action.duty
          }
          case EMPTYMESSAGEARRAY:
          return {
            ...state,
            messages:action.payload
          }
          default:
          return state;
    }
}