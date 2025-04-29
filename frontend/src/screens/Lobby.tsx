// import React, { useCallback, useEffect, useState } from "react";
// import { useSocket } from "../shared/contexts/SocketProvider";

// const LobbyScreen = () => {
//     const [room, setRoom] = useState('');
//     const [email, setEmail] = useState('');

//     const socket = useSocket();
//     console.log(socket)
//     const handleSubmitForm = useCallback((e: any) => {
//         socket?.emit('room:join', { room, email })
//     }, [room, email, socket])


//     const handleJoinRoom = useCallback

//     useEffect(() => {
//         socket?.on('room:join', (data: any) => {
//             console.log(`Data from BE ${data}`)
//         })
//     }, [socket])

//     return (
//         <div className="container">
//             <div className="d-flex flex-column">
//                 <h1 >Lobby</h1>

//                 <form className="d-flex flex-column w-50" onSubmit={handleSubmitForm}>
//                     <label htmlFor="email">Email address</label>
//                     <input type="email" id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <label htmlFor="room">Room number</label>
//                     <input type="text" id="room"
//                         value={room}
//                         onChange={(e) => setRoom(e.target.value)}
//                     />
//                     <button type="submit">Join</button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default LobbyScreen