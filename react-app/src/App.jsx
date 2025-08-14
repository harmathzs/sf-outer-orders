import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import QueryPage from "./QueryPage";
import AddLeadPage from "./AddLeadPage";

export default class App extends React.Component {
  state = {
    consumerKey: null,
    code: null,
    sfData: null,
    page: 'home'
  }

  isLoggedIn() {
    return this.state.sfData && this.state.sfData.access_token;
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
        const code = urlParams.get('code');
        this.setState({ code: code });

        fetch(`/api/sf-token-exchange?code=${code}`)
        .then(res => res.json())
        .then(data => {
          this.setState({sfData: data});
          console.log('data', data);

        })
        .catch(console.warn);
      }
    }
  }

  render() {
    const callbackUrl = 'https://sf-outer-orders.vercel.app/oauth/callback';
    const sfAuthUrl = `https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=${this.state.consumerKey??''}&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=refresh_token+api`;

    return <>
      {this.isLoggedIn() && <Navbar fixed="top">
                <Container>
                  <Navbar.Brand href="#home" onClick={()=>this.setState({page: 'home'})}>React-Salesforce</Navbar.Brand>
                  <Navbar.Collapse>
                    <Nav>
                      <Nav.Link href="#home" onClick={()=>this.setState({page: 'home'})}>Login</Nav.Link>
                      <Nav.Link href="#query" onClick={()=>this.setState({page: 'query'})}>Query</Nav.Link>
                      <Nav.Link href="#addlead" onClick={()=>this.setState({page: 'addlead'})}>Add Lead</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
        }
      <Container style={{marginTop: '56px'}}>
        <Row>
          { this.state.page=='home' &&
            <Col>
              <Card>
                <Card.Body>
                  {this.isLoggedIn() ? <>
                    <Card.Text>You are successfully logged in to Salesforce!</Card.Text>
                    <Card.Text>access_token: {this.state.sfData.access_token}</Card.Text>
                    <Card.Text>refresh_token: {this.state.sfData.refresh_token}</Card.Text>
                    <Card.Text>instance_url: {this.state.sfData.instance_url}</Card.Text>
                  </> : <a href={sfAuthUrl}>Log in to Salesforce</a> }
                </Card.Body>
              </Card>
            </Col>
          }
          { this.state.page=='query' &&
            <Col>
              <QueryPage sfdata={this.state.sfData} />
            </Col>
          }
          { this.state.page=='addlead' &&
            <Col>
              <AddLeadPage />
            </Col>
          }                    
        </Row>
      </Container>
    </>
  } 
}

