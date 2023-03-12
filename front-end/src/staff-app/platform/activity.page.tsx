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
import { resetRollStates, setFilteredStudents, setStudents, setTotalStudents } from "features/students/studentSlice"
import { RolllStateType } from "shared/models/roll"
import { Activity } from "shared/models/activity"
import { ActivityListTile } from "staff-app/components/activity-list-tile/activity-list-tile.component"

export const ActivityPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [getActivities, data, loadState] = useApi<{ activity: Activity[] }>({ url: "get-activities" })
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (data?.activity) {
      console.log(data.activity)
    }
  }, [data?.activity])

  useEffect(() => {
    void getActivities()
  }, [getActivities])


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
              <ActivityListTile key={`${a.entity.name}-count`} activity={a} />
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
