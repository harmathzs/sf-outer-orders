import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

//import sfCredentials from './credentials.js';

export default class App extends React.Component {
  state = {
    externalClientAppConsumerKey: process.env.REACT_APP_externalClientAppConsumerKey,
    externalClientAppConsumerSecret: process.env.REACT_APP_externalClientAppConsumerSecret,
  }

  render() {
    const sfAuthUrl = `https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=${this.state.externalClientAppConsumerKey}&redirect_uri=https%3A%2F%2Fxxx.vercel.com%2Foauth%2Fcallback&scope=refresh_token+api`;

    return <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <a href={sfAuthUrl}>Log in to Salesforce</a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  } 
}

