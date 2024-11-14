import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from "../../hooks/useTelegram"
import './assets/admin.css'

const Admin = () => {
		const {user} = useTelegram();
    const navigate = useNavigate();
		const [accounts, setAccounts] = useState([])


		if(user){ 
		const changeStatus = async (statused, accountId) => {
			const data = {
				accountId: accountId,
				status: statused,
				userId: '5589964967',
			}
			console.log(data)
			const response = await fetch('https://api.nebeadidd.ru/user/updateStatusAccount', {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json',
				},
				body: JSON.stringify(data)
			})
			getApiData()
			return response;
		}



		const getApiData = async () => {
			const data = {
				userId: '5589964967',
			}
			const response = await fetch('https://api.nebeadidd.ru/user/getWaitedAccounts', {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json',
				},
				body: JSON.stringify(data)
			})
			const result = await response.json()
			setAccounts(result);
		};

		const filteredUsers = accounts.filter(account => account.status == "Залит", )

		useEffect(() => {
			getApiData();
		}, []);
	}
    return (
        <div className={'admin_content'}>
					<div className={'items'}> 
						<h1>Залитые аккаунты</h1>
						<button onClick={() => navigate('/admin_accounts_wait')}>Ожидающие</button>
							{filteredUsers.map((item) => 
								<>
								<div className={'news_item'}>
								<p>Айди: {item.id}</p>
								<p>Почта: {item.email}</p>
								<p>Статус: {item.status}</p>
								<div className={'buttons'}>
									<button onClick={() => changeStatus('На проверке', `${item.id}`)}>На проверку</button>
									<button onClick={() => changeStatus('Валидный', `${item.id}`)}>Валидный</button>
									<button onClick={() => changeStatus('Не валидный', `${item.id}`)}>Не валидный</button>
								</div>
								</div>
								</>
							)}
						</div>
        </div>
    );
};

export default Admin;
