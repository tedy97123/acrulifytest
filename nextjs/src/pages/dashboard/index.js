import { Container, Row, Col } from "react-bootstrap"

const style = {
    mainColumn: {},
    mainContainer: {backgroundColor: "purple", height: "100%"}
};

const Index = () => {
    return (
        <Container style={style.mainContainer}>
            <Col md = {4} style = {style.mainColumn}>
                Hello
            </Col>
            <Col md = {4} style = {style.mainColumn}>
            
            </Col>
            <Col md = {4} style = {style.mainColumn}>
            
            </Col>
        </Container>
    )
}

export default Index