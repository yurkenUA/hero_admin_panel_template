import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle'
// }

const initialState =  heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle',
})

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes', 
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/heroes");
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesAdd: (state, action) => {
            // state.heroesLoadingStatus = 'idle';
            // state.heroes.push(action.payload);
            heroesAdapter.addOne(state, action.payload);
        },
        heroesDelete: (state, action) => {
            // state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
            heroesAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                heroesAdapter.setAll(state, action.payload)})
            .addCase(fetchHeroes.rejected,  state => {state.heroesLoadingStatus = 'error';})
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = heroesSlice;

export const { heroesFetching, heroesFetched, heroesAdd, heroesDelete, heroesFetchingError } = actions;

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);

export const  filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    selectAll,
    (filter, heroes) => {
        if (filter === 'all') {
            return heroes;
        } else {
            return heroes.filter(item => item.element === filter); 
        }
    }
);

export default reducer;


