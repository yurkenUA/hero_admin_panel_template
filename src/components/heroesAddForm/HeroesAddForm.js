

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid4 } from "uuid";
import { useHttp } from "../../hooks/http.hook";
import { heroesAdd } from "../heroesList/heroesSlice";
import { filtersFetching, filtersAdd, selectAll } from "../heroesFilters/filterSlice";
import { fetchFilters } from "../../actions";
import store from "../../store";

const HeroesAddForm = () => {

    const {filtersLoadingStatus} = useSelector(state => state.filters);

    // const filters = selectAll(store.getState());
    const filters = useSelector(selectAll);

    
    const dispatch = useDispatch();
    const {request} = useHttp();
    
    const initialState = {
        heroName: '',
        heroDescr: '',
        heroElement: '',
        id: null
    }
    const [state, setState] = useState(initialState);


    // useEffect(() => {
    //     dispatch(fetchFilters(request));
    //     request("http://localhost:3001/filters/")
    //         .then(data => dispatch(filtersAdd(data)))
    //         .catch((err) => console.log(err))

    //    // eslint-disable-next-line
    // }, []);

    const onSubmitHero = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuid4(),
            name: state.heroName,
            description: state.heroDescr,
            element: state.heroElement,
        }
        request(`http://localhost:3001/heroes/`,
            'POST',
            JSON.stringify(newHero))
            .then(dispatch(heroesAdd(newHero)))
            .catch(error => console.log(error))
            .finally(setState(initialState))
    }

    if (filtersLoadingStatus === "loading") {
        return <option>Loading...</option>
    }

    const renderFiltersList = (arr) => {
        if (arr.length === 0) {
            return <option>Filters пока нет</option>
        }

        if (filters && filters.length > 0 ) {
            return arr.map(({name, label}) => {
                if (name === 'all') return;
                return <option value={name} key={name}>{label}</option>
            })
        }

    }


    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={(e) => onSubmitHero(e)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name"
                    value={state.heroName} 
                    placeholder="Как меня зовут?"
                    onChange={(e) => setState({...state, heroName: e.target.value})}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text"
                    value={state.heroDescr}
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    onChange={(e) => setState({...state, heroDescr: e.target.value})}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={state.heroElement}
                    onChange={(e) => setState({...state, heroElement: e.target.value})}>
                    <option >Я владею элементом...</option>
                    {/*<<option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                    {renderFiltersList(filters)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;