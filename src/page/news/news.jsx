import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from "../../hooks/useTelegram"
import './assets/news.css'

const products = [
	{id: 1, tittle: "Мы начинаем!", description: "Тут будет описание новости"},
	{id: 1, tittle: "Мы начинаем!", description: "Тут будет описание новости"},
	{id: 1, tittle: "Мы начинаем!", description: "Тут будет описание новости"},
	{id: 1, tittle: "Мы начинаем!", description: "Тут будет описание новости"},
	{id: 1, tittle: "Мы начинаем!", description: "Тут будет описание новости"}
]

const News = () => {
		const {user} = useTelegram();
    const navigate = useNavigate();
		const [news, setNews] = useState([])
		const getApiData = async () => {
			const response = await fetch('https://api.nebeadidd.ru/user/news', {
				method: 'GET',
				headers: {
						'Content-Type': 'application/json',
				}
			})
			const result = await response.json()
			setNews(result);
		};
		
		useEffect(() => {
			getApiData();
		}, []);

    return (
        <div className={'news_content'}>
					<div className={'items'}> 
						<h1>Новости</h1>
							{news.map((item) => 
								<>
								<div className={'news_item'}>
								<h1>{item.tittle}</h1>
								<p>{item.description}</p>
								</div>
								</>
							)}
						</div>
        </div>
    );
};

export default News;
