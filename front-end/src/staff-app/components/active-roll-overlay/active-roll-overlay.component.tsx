import React from "react"
import styled from "styled-components"
import Button from "@material-ui/core/Button"
import { BorderRadius, Spacing } from "shared/styles/styles"
import { ItemType, RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import { useAppDispatch, useAppSelector } from "shared/hooks/redux-hooks"
import { setRoleFilter } from "features/students/studentSlice"
import { useApi } from "shared/hooks/use-api"


export type ActiveRollAction = "filter" | "exit"
interface Props {
  isActive: boolean
  onItemClick: (action: ActiveRollAction, value?: string) => void
}

export const ActiveRollOverlay: React.FC<Props> = (props) => {
  const [saveRoll, data, loadState] = useApi<{ success: boolean }>({ url: "save-roll" })

  const { isActive, onItemClick } = props
  const { roleStates, students } = useAppSelector((state) => state.student)
  const dispatch = useAppDispatch()

  const onRollClick = (type: ItemType) => {
    dispatch(setRoleFilter(type))
  }

  const completeRoll = () => {
    let student_roll_states = []
    student_roll_states = students.map((student) => {
      let rollState = {
        student_id: student.id,
        roll_state: student.roll == undefined ? 'unmark' : student.roll
      }
      return rollState
    })
    saveRoll({ student_roll_states: student_roll_states })
    onItemClick('exit')
  }


  return (
    <S.Overlay isActive={isActive}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList
            stateList={roleStates}
            onItemClick={onRollClick}
          />
          <div style={{ marginTop: Spacing.u6 }}>
            <Button color="inherit" onClick={() => onItemClick("exit")}>
              Exit
            </Button>
            <Button color="inherit" style={{ marginLeft: Spacing.u2 }} onClick={() => completeRoll()}>
              Complete
            </Button>
          </div>
        </div>
      </S.Content>
    </S.Overlay>
  )
}

const S = {
  Overlay: styled.div<{ isActive: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isActive }) => (isActive ? "120px" : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
}
