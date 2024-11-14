import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from "../../hooks/useTelegram"
import './assets/cabinet.css'

const Cabinet = () => {
		const {user} = useTelegram();
    const navigate = useNavigate();
		const [apiUser, setUser] = useState()
		if(user){ 
		const getApiData = async () => {
			const data = {
				userId: user.id,
			}
			const response = await fetch('https://api.nebeadidd.ru/user/getUserProfile', {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json',
				},
				body: JSON.stringify(data)
			})
			const result = await response.json()
			setUser(result);
		};
		
		useEffect(() => {
			getApiData();
		}, []);
	}
    return (
        <div className={'lc_content'}>
					<div className={'items'}> 
						<h1>Личный кабинет</h1>
						<div className={'news_item'}>
								<h1>Имя пользователя:&nbsp;</h1> <span>{user?.username}</span>
						</div>
						<div className={'news_item'}>
								<h1>Баланс:&nbsp;</h1> <span>{apiUser?.balance}$</span>
						</div>
						<div className={'news_item'}>
								<h1>Всего аккаунтов:&nbsp;</h1> <span>{apiUser?.allAccounts}</span>
						</div>
						<div className={'news_item'}>
								<h1>Валидных аккаунтов:&nbsp;</h1> <span>{apiUser?.approvedAccounts}</span>
						</div>
						</div>
        </div>
    );
};

export default Cabinet;
