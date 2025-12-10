// 认证上下文 - 用于管理用户登录状态
// 目前暂时注释，将在实现用户系统时启用
// import { createContext, useContext, useState } from "react";

// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: null | {
//     id: string;
//     username: string;
//     avatar?: string;
//   };
//   login: (username: string, password: string) => Promise<boolean>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType>({
//   isAuthenticated: false,
//   user: null,
//   login: async () => false,
//   logout: () => {},
// });

// export const useAuth = () => useContext(AuthContext);

// // 认证提供者组件
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<null | { id: string; username: string; avatar?: string }>(null);

//   // 模拟登录函数
//   const login = async (username: string, password: string): Promise<boolean> => {
//     // 实际项目中这里会调用API进行身份验证
//     if (username && password) {
//       setIsAuthenticated(true);
//       setUser({
//         id: '1',
//         username,
//         avatar: `https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=user%20avatar%20${username}&sign=avatar123`
//       });
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };