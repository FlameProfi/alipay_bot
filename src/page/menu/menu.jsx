import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from "../../hooks/useTelegram"
import './assets/menu.css'

const Menu = () => {
		const {user} = useTelegram();
		const [admin, setAdmin] = useState(false)
    const navigate = useNavigate();
		if(user){ 
		const data = {
			userId: user.id,
		}
		const getApiData = async () => {
			const response = await fetch('https://api.nebeadidd.ru/user/getUser', {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json',
				},
				body: JSON.stringify(data)
		})
			setAdmin(response);
		};
		
		useEffect(() => {
			getApiData();
		}, []);
	}
    return (
        <div className={'menu_content'}>
					<div className={'items'}> 
						<h1>Меню</h1>
						<div className={'item'} onClick={() => navigate('/news')}>
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
						{admin? <>
							<div className={'item'}>
								<p>Ожидающие проверки</p>
							</div>
						</> : <></>}
						</div>
        </div>
    );
};

export default Menu;
