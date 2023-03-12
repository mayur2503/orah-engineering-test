import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { Colors } from 'shared/styles/colors'
import { SortType } from './student-filter'
interface Props {
  name:string,
  options: SortType[],
  selectedOption: string,
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}



const DropDown: React.FC<Props> = ({ options, selectedOption, handleChange ,name}) => {
  return (
    <S.Select value={selectedOption} onChange={(e) => handleChange(e)} name={name}>
      {options.map(option => (
        <S.Option key={option.key} value={option.key}>{option.title}</S.Option>
      ))}
    </S.Select>
  )
}

const S = {
  Select: styled.select`
    height: 25px;
    background: white;
    color: ${Colors.dark};
    font-size: 10px;
    border: none;
    border-radius:5px;
   
  `,
  Option: styled.option`
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
   `
}

export default DropDown 