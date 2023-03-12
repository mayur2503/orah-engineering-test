import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Person } from 'shared/models/person'
import { Filter } from 'staff-app/components/student-filter/student-filter';
import type { RootState } from '../../store/store'

interface StudentState {
    students: Person[];
    filter: Filter;
    search: string;
}

const initialState: StudentState = {
    students: [],
    filter: {
        name: '',
        order: ''
    },
    search: ''
}

export const studentSlice = createSlice({
    name: 'students',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setStudents: (state, action: PayloadAction<Person[]>) => {
            state.students = action.payload
        },
        setFilter: (state, action: PayloadAction<Filter>) => {
            state.filter = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        }
    },
})

export const { setStudents, setFilter, setSearch } = studentSlice.actions
export default studentSlice.reducer