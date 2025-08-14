import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class AddLeadPage extends React.Component {
    state={
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@doe.com',
        company: 'Encom Corp',
    }

    handleAddNewLead = e => {
        e.preventDefault();
        console.log('handleAddNewLead state', this.state);
    }

    render() {
        return <Container style={{top: '112px', marginTop: '56px'}}>
            <Row>
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