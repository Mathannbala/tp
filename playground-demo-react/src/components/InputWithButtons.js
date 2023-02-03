import { Form, Col, Row, InputGroup, Button } from "react-bootstrap";
import { preventKeys } from "./Utils";
import { useMediaQuery } from 'react-responsive'


export default function InputWithButtons(props) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)'})

  return (
    <>
      {props.noLabel ? (
        <InputGroup className={isDesktop ? 'ml-3' : ''}>
          <Button
            variant={props.disabled || props.subDisabled ? "secondary" : "outline-secondary"}
            name={props.decBtnName}
            disabled={props.disabled || props.subDisabled}
            onClick={props.onDecBtnClick}
          >
            -
          </Button>


          <Form.Control
            className="text-center"
            type="number"
            placeholder={props.placeholder}
            min={props.min}
            max={props.max}
            step={props.step}
            value={props.value}
            disabled={props.disabled}
            onChange={props.onChange}
            onBlur={props.onBlur}
            required={props.required}
            onKeyDown={(e) => preventKeys(e)}
            isInvalid={props.isInvalid}
          />
          <Button
            variant={props.disabled || props.addDisabled ? "secondary" : "outline-secondary"}
            name={props.incBtnName}
            disabled={props.disabled || props.addDisabled}
            onClick={props.onIncBtnClick}
          >
            +
          </Button>

        </InputGroup>
      ) : (
        <Form.Group className="mb-3" controlId={props.controlId}>
          <Row className="align-items-center">
            <Col sm={props.sm}>
              <Form.Label>{props.formLabel}</Form.Label>
            </Col>
            <Col sm={props.sm}>
              <InputGroup>
                <Button
                  variant={props.disabled || props.subDisabled ? "secondary" : "outline-secondary"}
                  name={props.decBtnName}
                  disabled={props.disabled || props.subDisabled}
                  onClick={props.onDecBtnClick}
                >
                  -
                </Button>

                <Form.Control
                  className="text-center"
                  style={{
                    color:"black"
                  }}
                  type="number"
                  placeholder={props.placeholder}
                  min={props.min}
                  max={props.max}
                  step={props.step}
                  value={props.value}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  onKeyDown={(e) => preventKeys(e)}
                  isInvalid={props.isInvalid}
                  disabled = {props.disabled}
                />

                <Button
                  variant={props.disabled || props.addDisabled ? "secondary" : "outline-secondary"}
                  name={props.incBtnName}
                  disabled={props.disabled || props.addDisabled}
                  onClick={props.onIncBtnClick}
                >
                  +
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Form.Group>
      )}
    </>
  );
}
