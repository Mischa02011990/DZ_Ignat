import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import Greeting from './Greeting'
import {UserType} from './HW3'


// * 4 - в файле GreetingContainer.tsx дописать типизацию пропсов // +
// * 5 - в файле GreetingContainer.tsx указать нужные типы в useState с name и error // +
// * 6 - в файле GreetingContainer.tsx дописать тип и логику функции setNameCallback // +
// * 7 - в файле GreetingContainer.tsx дописать логику функций pureAddUser, pureOnBlur, pureOnEnter и проверить их тестами // -
// * 8 - в файле GreetingContainer.tsx вычислить количество добавленных и имя последнего (totalUsers, lastUserName) // -

export type GreetingContainerPropsType = {
    users: UserType[] // +  need to fix any
    addUserCallback: (name: string) => void // + need to fix any
}

export const pureAddUser = (name: string, setError: (error: string) => void, setName: (name: string) =>
    void, addUserCallback: (name: string) => void) => {
// дописать чтобы при вводе чисел выводило пустую строку
    if (name.trim() === '') {
        return setError('Ошибка! Введите имя!')
    } else {
        addUserCallback(name)
        setName('')
        // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
    }
}

export const pureOnBlur = (name: string, setError: (error: string) => void) => {
    // дописать чтобы при вводе чисел выводило пустую строку
    if (name === '') {
        return setError('Ошибка! Введите имя!')
    } else if (name.trim() === '') {
        return setError('Ошибка! Введите имя!')
    }// если имя пустое - показать ошибку
}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: () => void) => {
    if (e.key === 'Enter') {
        return addUser()
    } else if (e.key !== 'Enter') {
        return ''// если нажата кнопка Enter - добавить юзера
    }
}

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({users, addUserCallback}) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>(''); // + need to fix any
    const [error, setError] = useState<string>(''); // + need to fix any

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => { // + need to fix any
        setName(e.target.value) // + need to fix

        error && setError('Error! Enter name!');
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
        pureOnBlur(name, setError);
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser);
    }

    const totalUsers = users.length // + need to fix
    const lastUserName = users[totalUsers - 1]?.name// + need to fix

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
