import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

//import sfCredentials from './credentials.js';

export default class App extends React.Component {
  async fetchConsumerKey() {
    const response = await fetch('/api/get-sf-consumer-key');
    const data = await response.json();
    return data.consumerKey;
  }

  async componentDidMount() {
    this.setState({consumerKey: await this.fetchConsumerKey()});
  }

  render() {
    const callbackUrl = 'https://sf-outer-orders.vercel.app/oauth/callback';
    const sfAuthUrl = `https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=${this.state.consumerKey}&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=refresh_token+api`;

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

