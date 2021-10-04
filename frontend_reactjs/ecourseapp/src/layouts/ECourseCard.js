import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ECourseCard(props) {
    let path = `/courses/${props.obj.id}/lessons/`
    if (props.type === "lesson")
      path = `/lessons/${props.obj.id}`
    return (
        <Col md={4} xs={12}>
            <Card>
              <Link to={path}>
                <Card.Img variant="top" src={props.obj.image} />
              </Link>
              <Card.Body>
                <Card.Title>{props.obj.subject}</Card.Title>
                <Card.Text>
                  Ngay tao: {props.obj.created_date}
                </Card.Text>
              </Card.Body>
            </Card>
        </Col>
    )
}