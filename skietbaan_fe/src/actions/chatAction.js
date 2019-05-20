import { SENDMESSAGE, CONNECTUSER ,GETMESSAGE ,EMPTYMESSAGEARRAY} from './types'
import { tokenUrl , instanceLocator } from '../server'
import ChatKit from '@pusher/chatkit-client';
let messageArr=[];
export const connectUser = (userid) => dispatch=>{
    const chatMananger = new ChatKit.ChatManager({
        instanceLocator,
        userId:"tuman",
        tokenProvider: new ChatKit.TokenProvider({
            url:tokenUrl
        })
    })
    chatMananger.connect()
    .then(user =>dispatch({
        type:CONNECTUSER,
        payload:user,
        pay:user.rooms
        
    }))
    .catch(err =>console.log("error on connection",err))
}

export const getMessages = ( id , user) => dispatch =>{
     let messageArr = []
    user.subscribeToRoom({
        roomId:id.toString(),
        messageLimit:20,
        hooks:{
            onMessage:message=>{
                 messageArr.push(message)
                console.log("new messages",messageArr)
            },
            onUserJoined:m=>{
                console.log("we are here in this",m)
            }
        }
    })

    

    return dispatch({
        type:GETMESSAGE,
        payload:messageArr,
        pay:id,
        duty:user.rooms.users
    })
}

export const sendMessage = ( text , roomId , user) =>dispatch=>{
    user.sendMessage({
        text:text,
        roomId:roomId.toString()
    })
}

export const emptyMessageArray = () => dispatch =>{
    return dispatch({
        type:EMPTYMESSAGEARRAY,
        payload:[]
    })
}