import { Form } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

export default function FormCheck(props) {

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
  return (
    <>
          {isTabletOrMobile && Object.entries(props.list).map((item, index) => (
        <Form.Check
          disabled={props.disabled}
          inline={props.inline}
          label={item[0]}
          name={props.name}
          type={props.type}
          id={`${props.name}_${index}`}
          key={`${props.name}_${index}`}
          checked={item[1]}
          onChange={props.onChange}
          isInvalid={props.isInvalid}
        />
      ))
      }
      {isDesktop && Object.entries(props.list).map((item, index) => (
        <Form.Check
          disabled={props.disabled}
          inline={props.inline}
          label={item[0]}
          name={props.name}
          type={props.type}
          id={`${props.name}_${index}`}
          key={`${props.name}_${index}`}
          checked={item[1]}
          onChange={props.onChange}
          isInvalid={props.isInvalid}
        />
      ))
      }
    </>
  );
}
