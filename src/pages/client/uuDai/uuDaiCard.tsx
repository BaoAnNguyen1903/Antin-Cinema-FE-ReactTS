import Card from "react-bootstrap/Card";

interface IProps {
    imgPath: string
    title: string
    duration: string
}

function UudaiCard(props: IProps) {
    return (
        <Card className="project-card-view">
            <Card.Img variant="top" src={props.imgPath} alt="card-img" style={{ maxHeight: 215 }} />
            <Card.Body className="d-flex flex-column">
                <Card.Title>
                    {props.duration}
                </Card.Title>
                <Card.Title>
                    {props.title}
                </Card.Title>
            </Card.Body>
        </Card>
    );
}
export default UudaiCard;