
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from "../../hooks/useTelegram"
import './assets/accountList.css'

const products = [
	{id: 1, email: "rannylegend@mail.ru", status: "На проверке"},
	{id: 1, email: "rannylegend@mail.ru", status: "Залит"},
	{id: 1, email: "rannylegend@mail.ru", status: "Валидный"},
	{id: 1, email: "rannylegend@mail.ru", status: "Не валидный"},
	{id: 1, email: "rannylegend@mail.ru", status: "На проверке"}
]



const AccountsList = () => {
    const {tg, user, queryId} = useTelegram();
    const navigate = useNavigate();
		const [accounts, setAccounts] = useState([])
		let textColor;

		// const data = {
		// 	userId: 5589964967,
		// }

		// const getApiData = async () => {
		// 	const response = await fetch('http://localhost:4000/user/getAccounts', {
		// 		method: 'POST',
		// 		headers: {
		// 				'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify(data)
		// })

		// };

		const StatusComponent = ({ status }) => {
			switch (status) {
				case 'На проверке':
					textColor = '#ffae49';
					break;
				case 'Валидный':
					textColor = '#00ab17';
					break;
				case 'Не валидный':
					textColor = '#b50000';
					break;
				default:
					textColor = '#fff';
			}

			return(
					<div className={'input_item'}>
							<p>Статус</p>
							<input type="text" value={status} disabled={true} style={{
								color: `${textColor}`
							}}/>
							</div>
			)
		}
		
		if(user){ 
		const data = {
			userId: user.id,
		}
		const getApiData = async () => {
			const response = await fetch('https://api.nebeadidd.ru/user/getAccounts', {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json',
				},
				body: JSON.stringify(data)
		})
			const result = await response.json()
			setAccounts(result);
		};
		
		useEffect(() => {
			getApiData();
		}, []);

	}

    return (
        <div className={'myAccount_content'}>
					<div className={'items'}> 
						<h1>Добавленные аккаунты</h1>
						<div className={'inputs'}>
						{accounts.length > 0 ? <>
						{accounts.map((item) =>
							<>
							<div className={'account__item'}> 
							<div className={'input_item'}>
							<p>Почта</p>
							<input type="text" value={item.email} disabled={true}/>
							</div>
							<StatusComponent status={item.status} /> 
							</div>
							</>
							)} </>: <h1>Пока нету аккаунтов</h1>
						}
							{/* <button onClick={() => StatusComponent('На проверке')}>ПРОГНАТЬ</button> */}
						</div>
						</div>
        </div>
    );
};

export default AccountsList;
