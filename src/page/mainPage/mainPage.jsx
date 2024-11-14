import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from './assets/logo.png'
import './assets/mainPage.css'


const mainPage = () => {
    const navigate = useNavigate();
    setTimeout(() => {
        navigate('/menu');
    }, 2000);
    return (
        <> 
        {/* <Header /> */}
        <div className={'main_content'}>
            <img src={logo} alt="" />
            <h1>Приветствуем вас<br/> сейчас произойдет перенаправление</h1>
        </div>
        </>
    );
};

export default mainPage;
