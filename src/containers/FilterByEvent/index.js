import React from "react";
import { compose, withProps } from "recompose";
import { inject, observer } from "mobx-react";
import Popper from "@material-ui/core/Popper";
import MultipleSelect from "@/components/MultipleSelect";
import {getFilterOptionsGrade} from "@/stores/wrd_apis";

import { STORE_KEYS } from "@/stores";

const FilterByEvents = ({
  optEvents,
  isDsSet,
  setEventsOpt,
  setIsEventsSelected,
  isTestSelected,
  setGradesOpt,
  setIsGradeSelected
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  const open = Boolean(anchorEl && !isTestSelected);
  const id = open ? "popper" : undefined;
  return (
    <div onClick={handleClick}>
      <MultipleSelect
        name="event"
        options={optEvents}
        isSet={isDsSet}
        setOptions={setEventsOpt}
        disabled={!isTestSelected}
        setFlag={setIsEventsSelected}
        setOptions={setGradesOpt}
        getDataFromServer={getFilterOptionsGrade}
        setFlag={setIsGradeSelected}
      />
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div>Please select data by test</div>
      </Popper>
    </div>
  );
};

export default compose(
  inject(STORE_KEYS.VIEWMODESTORE),
  observer,
  withProps(
    ({
      [STORE_KEYS.VIEWMODESTORE]: {
        optEvents,
        isDsSet,
        setEventsOpt,
        setIsEventsSelected,
        isTestSelected,
        setGradesOpt,
        setIsGradeSelected
      }
    }) => ({
      optEvents,
      isDsSet,
      setEventsOpt,
      setIsEventsSelected,
      isTestSelected,
      setGradesOpt,
      setIsGradeSelected
    })
  )
)(FilterByEvents);
