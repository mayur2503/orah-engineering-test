import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Images } from "assets/images"
import { Colors } from "shared/styles/colors"
import { Person, PersonHelper } from "shared/models/person"
import { RollStateSwitcher } from "staff-app/components/roll-state/roll-state-switcher.component"
import { RolllStateType } from "shared/models/roll"
import { useAppDispatch } from "shared/hooks/redux-hooks"
import { setRole, setRollState } from "features/students/studentSlice"
import { Activity } from "shared/models/activity"
import { RollCountBox } from "./roll-count-box"
import useCollapse from 'react-collapsed';


interface Props {
    activity: Activity
}

const rolls: RolllStateType[] = ['absent', 'unmark', 'present', 'late']
export const ActivityListTile: React.FC<Props> = ({ activity }) => {
    const dispatch = useAppDispatch()
    const [isExpanded, setExpanded] = useState(false);
    const [activeRoll, setActiveRoll] = useState<RolllStateType | ''>('');
    const [activeContent, setActiveContent] = useState<{ student_id: number; roll_state: RolllStateType }[]>([]);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });


    const toggleCollapsible = (roll: RolllStateType, prevActiveRoll: RolllStateType | '') => {
        if (activeRoll == '') {
            setActiveRoll(roll)
            setExpanded(true)
            return
        }
        if (prevActiveRoll != roll) {
            setActiveRoll(roll)
            setExpanded(true)
            return

        } else {
            setExpanded((prevExpanded) => !prevExpanded)
        }
    }

    useEffect(() => {
        if (activeRoll == '') {
            return
        }
        let activeData = activity.entity.student_roll_states.filter((item) => item.roll_state === activeRoll)
        setActiveContent(activeData)
    }, [activeRoll])


    return (
        <S.Container>

            <S.Content>
                <S.TopSection>
                    <div>{activity.entity.name}</div>
                    <div>Completed At</div>
                </S.TopSection>
                <S.RollSection>
                    {rolls.map((roll) => <RollCountBox key={activity.entity.id + roll} roll={roll} entity={activity.entity} toggleCollapsible={toggleCollapsible} activeRoll={activeRoll} />)}
                </S.RollSection>
                {/* <div>{PersonHelper.getFullName(student)}</div> */}
                <section {...getCollapseProps()}>Collapsed {activeRoll.charAt(0).toUpperCase() + activeRoll.slice(1)} {activeContent.length}</section>
            </S.Content>

        </S.Container>
    )
}

const S = {
    Container: styled.div`
    margin-top: ${Spacing.u3};
    padding-right: ${Spacing.u2};
    display: flex;
    border-radius: ${BorderRadius.default};
    background-color: #fff;
    box-shadow: 0 2px 7px rgba(5, 66, 145, 0.13);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 2px 7px rgba(5, 66, 145, 0.26);
    }
  `,
    Content: styled.div`
    padding: ${Spacing.u2};
    color: ${Colors.dark.base};
    font-weight: ${FontWeight.strong};
    display: flex;
    flex-grow:1;
    flex-direction:column;
  `,
    TopSection: styled.div`
    display: flex;
    flex-grow:1;
    justify-content:space-between;
  `,
    RollSection: styled.div`
    display: flex;
    flex-grow:1;
    margin-top:${Spacing.u3}
  `
}
