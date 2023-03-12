import { setFilter } from 'features/students/studentSlice'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks'
import { Spacing } from 'shared/styles/styles'
import { ToolbarAction } from 'staff-app/daily-care/home-board.page'
import styled from "styled-components"
import DropDown from './drop-down'

export interface SortType {
    key: string,
    title: string
}

const nameOptions: SortType[] = [{
    key: 'first_name',
    title: 'By First Name'
},
{
    key: 'last_name',
    title: 'By Last Name'
}];
const orderByOptions: SortType[] = [{
    key: 'asc',
    title: 'Asc'
},
{
    key: 'desc',
    title: 'Desc'
}];

export interface Filter {
    name: string,
    order: string
}

interface StudentFilterProps {
}

const StudentFilter: React.FC<StudentFilterProps> = () => {
    const { filter } = useAppSelector(state => state.student)

    const dispatch = useAppDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilter({
            ...filter,
            [e.target.name]: e.target.value
        }))
    }
    useEffect(() => {
        dispatch(setFilter({
            name: 'first_name',
            order: 'asc'
        }))
    }, [])
    return (
        <S.FilterContainer>
            <DropDown name='name' handleChange={handleChange} options={nameOptions} selectedOption={filter.name} />
            <DropDown name='order' handleChange={handleChange} options={orderByOptions} selectedOption={filter.order} />
        </S.FilterContainer>
    )
}

const S = {
    FilterContainer: styled.div`
      display:flex;
      justify-content:flex-start;
      gap:${Spacing.u1};
    `,

}

export default StudentFilter