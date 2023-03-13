import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Images } from "assets/images"
import { Colors } from "shared/styles/colors"
import { RolllStateType } from "shared/models/roll"
import { Activity } from "shared/models/activity"
import { RollCountBox } from "./roll-count-box"
import useCollapse from 'react-collapsed';
import { formatDate } from "shared/helpers/date-utils"


interface Props {
    activity: Activity;
    getStudentName: (id: number) => string
}

const rolls: RolllStateType[] = ['absent', 'unmark', 'present', 'late']
export const ActivityListTile: React.FC<Props> = ({ activity, getStudentName }) => {
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
                     <S.Title>{activity.entity.name}</S.Title>
                    <div>Completed At - {formatDate(activity.entity.completed_at.toString())}</div>
                </S.TopSection>
                <S.RollSection>
                    {rolls.map((roll) => <RollCountBox key={activity.entity.id + roll} roll={roll} entity={activity.entity} toggleCollapsible={toggleCollapsible} activeRoll={activeRoll} />)}
                </S.RollSection>
                <S.CollapseContent {...getCollapseProps()}>
                    <h3> {activeRoll.charAt(0).toUpperCase() + activeRoll.slice(1)} Students</h3>
                    {activeContent.map((student) => {
                        return (
                            <S.StudentContainer key={student.student_id}>
                                <S.Avatar url={Images.avatar}></S.Avatar>
                                <S.StudentContent>
                                    <div>{getStudentName(student.student_id)}</div>
                                </S.StudentContent>
                            </S.StudentContainer>
                        )
                    })}
                </S.CollapseContent>
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
    justify-content:space-between;,
    align-content:base-line
  `,
    Title: styled.h3`
     margin:0px;
    `,
    RollSection: styled.div`
    display: flex;
    flex-grow:1;
    margin-top:${Spacing.u3}
  `,
    CollapseContent: styled.section`
  `,
    StudentContainer: styled.div`
        margin-top: ${Spacing.u3};
        padding-right: ${Spacing.u2};
        display: flex;
        height: 40px;
        border-radius: ${BorderRadius.default};
        background-color: #fff;
        box-shadow: 0 2px 7px rgba(5, 66, 145, 0.13);
        transition: box-shadow 0.3s ease-in-out;

        &:hover {
            box-shadow: 0 2px 7px rgba(5, 66, 145, 0.26);
        }
    `,
    Avatar: styled.div<{ url: string }>`
        width: 40px;
        background-image: url(${({ url }) => url});
        border-top-left-radius: ${BorderRadius.default};
        border-bottom-left-radius: ${BorderRadius.default};
        background-size: cover;
        background-position: 50%;
        align-self: stretch;
    `,
    StudentContent: styled.div`
        flex-grow: 1;
        padding: ${Spacing.u2};
        color: ${Colors.dark.base};
        font-weight: ${FontWeight.strong};
    `,
    Roll: styled.div`
        display: flex;
        align-items: center;
        margin-right: ${Spacing.u4};
    `,
}
