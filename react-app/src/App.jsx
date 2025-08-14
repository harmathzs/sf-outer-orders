import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default class App extends React.Component {
  state = {
    consumerKey: null,
    code: null,
  }

  async fetchConsumerKey() {
    console.log('fetchConsumerKey');
    const response = await fetch('/api/get-sf-consumer-key');
    console.log(response);
    const data = await response?.json();
    console.log(data ?? 'no data');
    return data?.sfConsumerKey ?? '';
  }

  async componentDidMount() {
    console.log('componentDidMount');
    if (!this.state.code) {
      this.setState({consumerKey: await this.fetchConsumerKey() ?? ''});

      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('code')) {
        this.setState({ code: urlParams.get('code')});
      }
    }
  }

  render() {
    const callbackUrl = 'https://sf-outer-orders.vercel.app/oauth/callback';
    const sfAuthUrl = `https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=${this.state.consumerKey??''}&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=refresh_token+api`;

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

