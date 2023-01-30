import iaxios from './iaxios';

export const login = (username: string, password: string) => {
    return iaxios.post('/login/', {
        username: username,
        password: password
    })
}

export const register = (username: string, password: string, email: string, first_name: string, last_name: string) => {
    return iaxios.post('/register/', {
        username: username,
        password: password,
        email: email,
        first_name: first_name,
        last_name: last_name
    })
}

export const logout = () => {
    return iaxios.post('/logout/')
}
