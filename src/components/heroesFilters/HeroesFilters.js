
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useSelector, useDispatch } from "react-redux";
import { filteredByElement, fetchFilters, selectAll } from "../heroesFilters/filterSlice";
import classNames from 'classnames';
import { useEffect } from "react";
import store from '../../store'

const HeroesFilters = () => {
    const { filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    // const filters = selectAll(store.getState());
    const filters = useSelector(selectAll);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
        // request("http://localhost:3001/filters/")
        //     .then(filter => dispatch(filtersAdd(filter)))
        //     .catch((err) => console.log(err))

        // eslint-disable-next-line
    }, []);


    if (filtersLoadingStatus === "loading") {
        return <option>Loading...</option>
    }

    const renderFiltersList = (arr) => {
        if (arr.length === 0) {
            return <button className="btn btn-outline-dark active">Filters пока нет</button>
        }

        if (filters && filters.length > 0 ) {

            return arr.map(({name, className, label}) => {
                const cn = classNames(
                    'btn', className, {
                        active: name === activeFilter
                    })
                return <button className={cn} onClick={() => dispatch(filteredByElement(name))} key={name}>{label}</button>
            })
        }
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderFiltersList(filters)}
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;