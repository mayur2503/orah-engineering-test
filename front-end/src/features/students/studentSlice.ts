import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Person } from 'shared/models/person'
import { RolllStateType } from 'shared/models/roll';
import { ItemType, StateList } from 'staff-app/components/roll-state/roll-state-list.component';
import { Filter } from 'staff-app/components/student-filter/student-filter';
import type { RootState } from '../../store/store'

interface StudentState {
    totalStudents: number
    students: (Person & { roll?: RolllStateType })[];
    filteredStudents: (Person & { roll?: RolllStateType })[];
    filter: Filter;
    search: string;
    roleStates: StateList[],
    roleFilter: ItemType
}

const initialState: StudentState = {
    totalStudents: 0,
    students: [],
    filteredStudents: [],
    filter: {
        name: '',
        order: ''
    },
    search: '',
    roleStates: [
        { type: "all", count: 0 },
        { type: "present", count: 0 },
        { type: "late", count: 0 },
        { type: "absent", count: 0 },
    ],
    roleFilter: 'all'
}

export const studentSlice = createSlice({
    name: 'students',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setTotalStudents: (state, action: PayloadAction<number>) => {
            state.totalStudents = action.payload
            state.roleStates = state.roleStates.map((states) => {
                if (states.type == 'all') {
                    states.count = action.payload
                }
                return states
            })
        },
        setStudents: (state, action: PayloadAction<Person[]>) => {
            state.students = action.payload
        },
        setFilter: (state, action: PayloadAction<Filter>) => {
            state.filter = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setRole: (state, action: PayloadAction<{ id: number, roll: RolllStateType }>) => {
            state.students = state.students.map((student) => {
                if (student.id == action.payload.id) {
                    student.roll = action.payload.roll
                }
                return student
            })
        },
        setRollState: (state, action: PayloadAction<{ newState: RolllStateType, oldState: RolllStateType }>) => {
            let studentsWithRole = state.students.filter((student) => student.roll == action.payload.newState)
            state.roleStates = state.roleStates.map((states) => {
                if (states.type == action.payload.newState) {
                    states.count = studentsWithRole.length
                }
                if (states.type == action.payload.oldState) {
                    states.count = states.count - 1
                }
                return states
            })
        },
        setRoleFilter: (state, action: PayloadAction<ItemType>) => {
            state.roleFilter = action.payload
        },
        setFilteredStudents:(state, action: PayloadAction<(Person & { roll?: RolllStateType })[]>) => {
             state.filteredStudents = action.payload
        }
    },
})

export const { setStudents, setFilter, setSearch, setRole, setRollState, setTotalStudents, setRoleFilter,setFilteredStudents } = studentSlice.actions
export default studentSlice.reducer