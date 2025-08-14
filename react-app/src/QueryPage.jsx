import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class QueryPage extends React.Component {
    state = {
        query: '',
    }

    handleRun = e => {
        e.preventDefault();
        console.log('handleRun query', this.state.query);
    }

    render() {
        return <Form>
            <Form.Group>
                <Form.Label>SOQL Query: </Form.Label>
                <Form.Control as="textarea" rows={6} onChange={value=>this.setState({query: value})} />
            </Form.Group>
            <Button onClick={this.handleRun}>Run</Button>
        </Form>
    }
}