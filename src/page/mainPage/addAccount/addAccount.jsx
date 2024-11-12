import React, { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from "../../../hooks/useTelegram"
import './assets/addAccount.css'
import warning_ico from './assets/warning_ico.svg'

const AddAccount = () => {
    const {tg, user, queryId} = useTelegram();
    const navigate = useNavigate();
		const emailRef = useRef(null);
		let isChecked = false;
		if(!user) return navigate('/menu', {replace: true});
		tg.MainButton.show();
		tg.MainButton.setParams({
				text: `Отправить аккаунт`
		})

		const onSendData = useCallback(() => {
			if(isChecked == null) return tg.showAlert("Заполните все поля");
			if(!emailRef.current.value) return tg.showAlert("Заполните все поля");
			const data = {
					email: emailRef.current.value,
					pasport: isChecked,
					queryId,
					userId: user.id,
			}
			fetch('https://bottg-nebeadidd.amvera.io/user', {
					method: 'POST',
					headers: {
							'Content-Type': 'application/json',
					},
					body: JSON.stringify(data)
			})
			tg.showAlert("Данные отправлены успешно");
			tg.HapticFeedback.impactOccurred('heavy')
			navigate("/home")
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
							<button onClick={() => onSendData()}>ПРОГНАТЬ</button>
						</div>
						<div className={'warning'}>
							<div className={'warning_ico'}>
								<img src={warning_ico} alt="" />
							</div>
							<p>Пароль от почты и аккаунта должен быть <span>098smvbt</span></p>
						</div>
						</div>
        </div>
    );
};

export default AddAccount;
