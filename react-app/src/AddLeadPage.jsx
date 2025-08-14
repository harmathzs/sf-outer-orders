import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Toast from 'react-bootstrap/Toast';

export default class AddLeadPage extends React.Component {
    state={
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@doe.com',
        company: 'Encom Corp',
        //sfdata: {},
        createdLead: {},
    }

    componentDidMount() {
        //this.setState({sfdata: this.props.sfdata});
    }

    handleAddNewLead = async (e) => {
        e.preventDefault();

        const { firstName, lastName, email, company } = this.state;
        console.log('handleAddNewLead props', this.props);
        const { access_token, instance_url } = this.props.sfdata; // Pass these from parent after login
        console.log('handleAddNewLead access_token', access_token);
        console.log('handleAddNewLead instance_url', instance_url);

        try {
            const response = await fetch('/api/add-lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
                body: JSON.stringify({
                    instance_url,
                    lead: {
                        FirstName: firstName,
                        LastName: lastName,
                        Email: email,
                        Company: company,
                    },
                }),
            });

            const data = await response.json();
            console.log('Salesforce response', data);

            if (response.ok) {
                //alert(`Lead created! Id: ${data.id}`);
                this.setState({createdLead: data});
            } else {
                alert(`Error creating lead: ${JSON.stringify(data)}`);
            }
        } catch (err) {
            console.error(err);
            alert(`Request failed: ${err.message}`);
        }
    };


    render() {
        return <Container style={{top: '112px', marginTop: '56px'}}>
            <Row>
                {this.state.createdLead && this.state.createdLead.id && 
                <Col>
                    <Toast bg="success">
                        <Toast.Header>
                            <strong>Lead</strong>
                            <small>success</small>
                        </Toast.Header>
                        <Toast.Body>
                            Lead created! Id: {this.state.createdLead.id}
                        </Toast.Body>
                    </Toast>
                </Col>}

                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>First Name: </Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={e=>this.setState({firstName: e.target.value})} 
                                placeholder="Jane"
                                value={this.state.firstName}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name: </Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={e=>this.setState({lastName: e.target.value})} 
                                placeholder="Doe"
                                value={this.state.lastName}
                            />
                        </Form.Group>  
                        <Form.Group>
                            <Form.Label>Email: </Form.Label>
                            <Form.Control 
                                type="email" 
                                onChange={e=>this.setState({email: e.target.value})} 
                                placeholder="jane@doe.com"
                                value={this.state.email}
                            />
                        </Form.Group>   
                        <Form.Group>
                            <Form.Label>Company: </Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={e=>this.setState({company: e.target.value})} 
                                placeholder="Encom Corp"
                                value={this.state.company}
                            />
                        </Form.Group>                                                                    
                        <Button onClick={this.handleAddNewLead}>Add new Lead</Button>
                    </Form>                
                </Col>
            </Row>
        </Container>
    }
}