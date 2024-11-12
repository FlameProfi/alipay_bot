import React, { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from "../../../hooks/useTelegram"
import './assets/addAccount.css'

const AddAccount = () => {
    const {tg, queryId} = useTelegram();
    const navigate = useNavigate();
		const emailRef = useRef(null);
		let isChecked = false;

		tg.MainButton.show();
		tg.MainButton.setParams({
				text: `Отправить данные`
		})

		const onSendData = useCallback(() => {
			if(isChecked == null) return tg.showAlert("Заполните все поля");
			if(emailRef.current.value == null) return tg.showAlert("Заполните все поля");
			tg.showAlert("Данные отправлены успешно");
			tg.HapticFeedback.impactOccurred('heavy')
			const data = {
					email: emailRef.current.value,
					pasport: isChecked,
					queryId,
			}
			fetch('https://testbot-nebeadidd.amvera.io/added-account', {
					method: 'POST',
					headers: {
							'Content-Type': 'application/json',
					},
					body: JSON.stringify(data)
			})
	}, [])

	useEffect(() => {
		tg.onEvent('mainButtonClicked', onSendData)
		tg.useCallback
		return () => {
				tg.offEvent('mainButtonClicked', onSendData)
		}
}, [onSendData])


		const handleChange = (e) => {
			isChecked = e.target.checked;
		}

		const check = () => {
			console.log(emailRef.current.value, isChecked)
		}

    return (
        <div className={'add_content'}>
					<div className={'items'}> 
						<h1>Добавление аккаунта</h1>
						<div className={'inputs'}>
							<div className={'input_item'}>
							<p>Почта</p>
							<input type="email" required={true} ref={emailRef} />
							</div>
							<div className={'input_item_checkbox'}>
							<p style={{fontSize: "14px" }}>Паспорт?(если да, прожимаем кнопку)</p>
							<input type="checkbox" required={true} onChange={e => handleChange(e)} />
							</div>
							<div className={'input_item'}>
							<p>Паспорт/Рисовка</p>
							<input type="file" />
							</div>
							{/* <button onClick={() => check()}>ПРОГНАТЬ</button> */}
						</div>
						</div>
        </div>
    );
};

export default AddAccount;
