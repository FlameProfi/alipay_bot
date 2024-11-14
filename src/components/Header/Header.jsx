import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from "../../hooks/useTelegram"
import Button from "../Button/Button"
import './Header.css'

const Header = () => {
    const {user, onClose} = useTelegram();
    const navigate = useNavigate();

    return (
        <div className={'header'}>
            <Button onClick={() => navigate(-1)}>Назад</Button>
            <span className={'username'}>
            Приветствую, {user?.first_name}
            </span>
        </div>
    );
};

export default Header;
