import React from 'react'
import { useTelegram } from "../../hooks/useTelegram"
import Button from "../Button/Button"
import './Header.css'

const Header = () => {
    const {user, user2,onClose} = useTelegram();

    return (
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
            Приветствую, {user?.first_name}
            </span>
            <span className={'username2'}>
            Приветствую, {user2?.first_name}
            </span>
        </div>
    );
};

export default Header;
