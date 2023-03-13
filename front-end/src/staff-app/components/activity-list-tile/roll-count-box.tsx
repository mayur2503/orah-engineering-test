import React from "react"
import styled from "styled-components"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { Roll, RolllStateType } from "shared/models/roll"
import { useAppDispatch } from "shared/hooks/redux-hooks"
import { getBgColor } from "../roll-state/roll-state-icon.component"

interface Props {
    roll: RolllStateType;
    entity: Roll;
    toggleCollapsible: (roll: RolllStateType, prevActiveRoll: RolllStateType | '') => void
    activeRoll: RolllStateType | ''
}

export const RollCountBox: React.FC<Props> = ({ roll, entity, toggleCollapsible, activeRoll }) => {
    return (
        <S.Container textColor={getTextColor(roll)} borderColor={getBgColor(roll)} onClick={() => toggleCollapsible(roll, activeRoll)}>
            {roll.charAt(0).toUpperCase() + roll.slice(1)} {entity.student_roll_states.filter((item) => item.roll_state == roll).length}
        </S.Container>
    )
}

export function getTextColor(type: RolllStateType) {
    switch (type) {
        case "unmark":
            return "#000000"
        case "present":
            return "#ffffff"
        case "absent":
            return "#ffffff"
        case "late":
            return "#ffffff"
        default:
            return "#ffffff"
    }
}

const S = {
    Container: styled.div<{ borderColor: string, textColor: string }>`
    margin: ${Spacing.u1};
    padding: ${Spacing.u2};
    border-radius: ${BorderRadius.default};
    border-width:1px;
    border-style:solid;
    border-color: ${({ borderColor }) => borderColor === '#fff' ? 'black' : borderColor};
    box-shadow: 0 2px 7px rgba(5, 66, 145, 0.13);
    transition: box-shadow 0.3s ease-in-out;
    color: black;
    cursor:pointer;
    &:hover {
      box-shadow: 0 2px 7px rgba(5, 66, 145, 0.50);
    }
  `,
    Content: styled.div`
    padding: ${Spacing.u2};
    color: ${Colors.dark.base};
    font-weight: ${FontWeight.strong};
    display: flex;
    flex-grow:1;
  `,
    TopSection: styled.div`
    display: flex;
    flex-grow:1;
    justify-content:space-between;
  `,
    RollSection: styled.div`
    display: flex;
  `
}
