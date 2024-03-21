import { heroesFetching, heroesFetched, heroesFetchingError } from "../components/heroesList/heroesSlice";
import { filtersFetching, filtersAdd } from "../components/heroesFilters/filterSlice";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters/")
        .then(filter => dispatch(filtersAdd(filter)))
        .catch((err) => console.log(err))
}

// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

// // export const filtersAdd = (filters) => (dispatch) => {
// //     setTimeout(() => {
// //         dispatch({
// //         type: 'FILTERS_ADD',
// //         payload: filters
// //     })
// //     }, 1000) 
// // }

// export const filtersAdd = (filters)=> {
//     return {
//         type: 'FILTERS_ADD',
//         payload: filters
//     }
// }

// export const filteredByElement = (element) => {
//     return {
//         type: 'FILTERED_BY_ELEMENT',
//         payload: element
//     }
// }