import React, {  useEffect,useCallback } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person, PersonHelper } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { RolllStateType } from "shared/models/roll"
import { Activity } from "shared/models/activity"
import { ActivityListTile } from "staff-app/components/activity-list-tile/activity-list-tile.component"

export const ActivityPage: React.FC = () => {
  const [getActivities, data, loadState] = useApi<{ activity: Activity[] }>({ url: "get-activities" })
  const [getStudents, studentsData] = useApi<{ students: (Person & { roll?: RolllStateType })[] }>({ url: "get-homeboard-students" })

  useEffect(() => {
    void getActivities()
  }, [getActivities])

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  const getStudentName = useCallback((id: number) => {
    let student = studentsData?.students.find((s) => s.id == id)
    return PersonHelper.getFullName(student as Person)
  }, [studentsData])



  return (
    <>
      <S.PageContainer>
        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && data?.activity && (
          <>
            {data.activity.map((a) => (
              <ActivityListTile key={`${a.entity.name}-count`} activity={a} getStudentName={getStudentName} />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>

    </>
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
