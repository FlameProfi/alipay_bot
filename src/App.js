import { useEffect } from "react"
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Form from "./components/Form/Form"
import ProductList from "./components/ProductList/ProductList"
import './fonts/Gilroy/Gilroy-Bold.ttf'
import { useTelegram } from "./hooks/useTelegram"
import AccountsList from './page/accountsList/accounList'
import AddAccount from './page/addAccount/addAccount'
import MainPage from './page/mainPage/mainPage'
import Menu from './page/menu/menu'

function App() {
    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <div className="App">
            <Routes>
                <Route index element={<MainPage />}/>
                <Route path={'menu'} element={<Menu />} />
                <Route path={'add'} element={<AddAccount />} />
                <Route path={'mylist'} element={<AccountsList />} />
                <Route path={'products'} element={<ProductList />}/>
                <Route path={'form'} element={<Form />}/>
            </Routes>
        </div>
    );
}

export default App;
