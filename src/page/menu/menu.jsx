import React from 'react'
import { useNavigate } from 'react-router-dom'
import './assets/menu.css'

const Menu = () => {
    const navigate = useNavigate();
    return (
        <div className={'menu_content'}>
					<div className={'items'}> 
						<h1>Меню</h1>
						<div className={'item'}>
						<p>Новости</p>
						</div>
						<div className={'item'} onClick={() => navigate('/add')}>
						<p>Добавить аккаунт</p>
						</div>
						<div className={'item'} onClick={() => navigate('/mylist')}>
						<p>Мои аккаунты</p>
						</div>
						<div className={'item'}>
						<p>Информация</p>
						</div>
						</div>
        </div>
    );
};

export default Menu;
