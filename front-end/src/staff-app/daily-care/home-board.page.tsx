import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import StudentFilter, { Filter } from "staff-app/components/student-filter/student-filter"
import StudentSearch from "staff-app/components/student-search/student-serach"
import { byPropertiesOf } from "shared/helpers/sort-utils"
import { useAppDispatch, useAppSelector } from "shared/hooks/redux-hooks"
import { setStudents } from "features/students/studentSlice"

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const dispatch = useAppDispatch()
  const { students, filter, search } = useAppSelector(state => state.student)
  // const [students, setStudents] = useState<(Person & { attendance?: string })[]>([])

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  useEffect(() => {
    console.log('from redux', students)
  }, [students])

  useEffect(() => {
    console.log('filter change', filter, search)
    if (data?.students) {
      let searchFilter = [...data?.students].filter((student) => student.first_name.includes(search) || student.last_name.includes(search))
      let sortProperty: keyof Person | string = `${filter.order == 'asc' ? '' : '-'}${filter.name}`
      let sortedStudents = [...searchFilter].sort(byPropertiesOf<Person>([sortProperty as keyof Person]))
      dispatch(setStudents(sortedStudents))
    }

  }, [filter, search])

  useEffect(() => {
    if (data?.students) {
      dispatch(setStudents(data.students))
    }
  }, [data?.students])

  const onToolbarAction = (action: ToolbarAction, value: string | Filter | undefined) => {
    if (action === "roll") {
      setIsRollMode(true)
    }
  }

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
    }
  }

  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && data?.students && (
          <>
            {students.map((s) => (
              <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
    </>
  )
}

export type ToolbarAction = "roll" | "sort" | "search"
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string | Filter) => void
}
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick } = props
  return (
    <S.ToolbarContainer>
      <S.ToolBarItem>
        <StudentFilter />
      </S.ToolBarItem>
      <S.ToolBarItem>
        <StudentSearch />
      </S.ToolBarItem>
      <S.ToolBarItem>
        <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
      </S.ToolBarItem>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  ToolBarItem: styled.div`
    flex-grow:1;
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
      align-items:end
    }
  `,
}
