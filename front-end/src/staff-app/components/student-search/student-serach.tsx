import { setSearch } from 'features/students/studentSlice';
import React from 'react'
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import styled from 'styled-components'

interface StudentSearchProps {
}

const StudentSearch: React.FC<StudentSearchProps> = () => {
    const { search } = useAppSelector(state => state.student)
    const dispatch = useAppDispatch()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(event.target.value))
    };

    return (
        <S.Input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Search....."
        />
    )
}

const S = {
    Input: styled.input`
        height: 30px;
        border-radius: 4px;
        margin: 8px 0;
        outline: none;
        padding: 8px;
        box-sizing: border-box;
        transition: 0.3s;
        cursor: text;
  `
}

export default StudentSearch