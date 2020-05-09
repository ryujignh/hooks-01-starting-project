import React, { useState } from 'react';

export const AuthContext = React.createContext({
    isAuth: false,
    //ここで外部に公開するAPI用の関数名を定義
    login: () => {
    }
});

const AuthContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //ここに関数を定義
    const loginHandler = () => {
        setIsAuthenticated(true);
    };
    return (
        //ここで外部公開用の関数名が実際に内部のどの関数を呼ぶか定義する
        <AuthContext.Provider value={{login: loginHandler, isAuth: isAuthenticated}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
