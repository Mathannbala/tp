import { Form } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive'

export default function InputDropdown(props) {

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)'})

  return (
    <>
      <Form.Group 
      className="dropdown" 
      controlId={props.controlId}>
        <Form.Label>{props.formLabel}</Form.Label>

        <Form.Select size="sm" onChange={props.onChange} value={props.value} disabled={props.disabled}
        style={{ display: isTabletOrMobile && isDesktop ? "none" : "block"}}>
          {props.dictionary
            ? Object.entries(props.dropdownList).map((item, index) => (
                <option key={item[0]} value={item[0]}>
                  {item[0]}
                </option>
              ))
            : props.dropdownList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}

        </Form.Select>
      </Form.Group>
    </>
  );
}
