// import React, { createContext, useContext, useMemo } from "react";
// import { io } from 'socket.io-client';

// const SocketContext = createContext(null);
// export const useSocket = () => {
//     const socket = useContext(SocketContext)
//     return socket
// }
// export const SocketProvider = (props: any) => {
//     const socket = useMemo(() => io('localhost:7000'), [])

//     return (
//         <SocketContext.Provider value={socket}>
//             {props.children}
//         </SocketContext.Provider>
//     )
// }