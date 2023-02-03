import ProgressBar from "react-bootstrap/ProgressBar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function ProjectProgressBar() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
  
  const notification = useSelector((state) => state.forms.notification);

  const windActivated = useSelector((state) => state.wind.activated);
  const windTotalFieldsCompleted = useSelector((state) => state.wind.totalFieldsCompleted);
  const windTotalFields = useSelector((state) => state.wind.totalFields);

  const solarActivated = useSelector((state) => state.solar.activated);
  const solarTotalFieldsCompleted = useSelector((state) => state.solar.totalFieldsCompleted);
  const solarTotalFields = useSelector((state) => state.solar.totalFields);

  const noiseActivated = useSelector((state) => state.noise.activated);
  const noiseTotalFieldsCompleted = useSelector((state) => state.noise.totalFieldsCompleted);
  const noiseTotalFields = useSelector((state) => state.noise.totalFields);

  const [totalFieldsCompleted, setTotalFieldsCompleted] = useState(0);
  const [totalFields, setTotalFields] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0);

  // get total fields & total completed fields
  // on change of forms / selected input triggers no. of total fields change
  useEffect(() => {
    setTotalFieldsCompleted(0);
    setTotalFields(0);

    if (windActivated) {
      setTotalFieldsCompleted((prevValue) => prevValue + windTotalFieldsCompleted);
      setTotalFields((prevValue) => +prevValue + +windTotalFields);
    }

    if (solarActivated) {
      setTotalFieldsCompleted((prevValue) => prevValue + solarTotalFieldsCompleted);
      setTotalFields((prevValue) => +prevValue + +solarTotalFields);
    }

    if (noiseActivated) {
      setTotalFieldsCompleted((prevValue) => prevValue + noiseTotalFieldsCompleted);
      setTotalFields((prevValue) => +prevValue + +noiseTotalFields);
    }
  }, [
    windActivated,
    windTotalFieldsCompleted,
    windTotalFields,
    solarActivated,
    solarTotalFieldsCompleted,
    solarTotalFields,
    noiseActivated,
    noiseTotalFieldsCompleted,
    noiseTotalFields,
  ]);

  // recalculate progress % after update of no. of fields
  useEffect(() => {
    setTotalPercentage(((totalFieldsCompleted / totalFields) * 100).toFixed());
  }, [totalFieldsCompleted, totalFields]);

  return (
    <>
      <span><b>Progress</b>  : {notification} </span>
      {isTabletOrMobile ? (
      <ProgressBar
        style={{
          border: "1px solid lightgrey",
          borderRadius: "0px",
        }}
        animated
        now={isNaN(totalPercentage) === true ? 0 : totalPercentage}
        label={`${totalPercentage}%`}

        // uncomment for debugging
        //label={`${totalFieldsCompleted} / ${totalFields}`}
      />
    ) : (
      <div>
        <ProgressBar
          style={{
            "margin-bottom": "2vh",
            width: '90%',
          }}
          animated
          now={isNaN(totalPercentage) === true ? 0 : totalPercentage}
          label={`${totalPercentage}%`}
        />
      </div>
    )}
  </>
);
}
