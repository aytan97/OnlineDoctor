// // ProtectedRoute.tsx
// import React from "react";
// import { RouteProps, Navigate, Route } from "react-router-dom";
// // import { useAuth } from "../../contexts/AuthContext";
// import { useAppSelector } from "../../../redux/hooks";

// interface ProtectedRouteProps extends Omit<RouteProps, "element"> {
//     component: React.ComponentType<any>;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//     component: Component,
// }) => {
//     const { isLoggedIn } = useAppSelector((state) => state.auth)

//     console.log(isLoggedIn)
//     return (

//         <Route
//             element={isLoggedIn ? <Component /> : <Navigate to="/login" />} />
//     );
// };

// export default ProtectedRoute;
