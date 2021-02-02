import './App.css';
import OurNav from "./Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Column from "react-bootstrap/Col";
import Routes from "./Routes";

function App() {
  return (
    <Container fluid className="p-0">
      <Row className="p-0">
        <Column className="p-0">
          <OurNav />
        </Column>
      </Row>
      <Routes />
    </Container>
  );
}

export default App;
