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
        records: [],
    }

    handleRun = async e => {
        e.preventDefault();
        const query = this.state.query;
        console.log('handleRun query', query);

        console.log('props', this.props);

        const soqlEncoded = encodeURIComponent(query);
        console.log('soqlEncoded', soqlEncoded);
        const instanceUrl = this.props.sfdata.instance_url;
        console.log('instanceUrl', instanceUrl);
        const url = `${instanceUrl}/services/data/v57.0/query?q=${soqlEncoded}`;
        console.log('url', url);
        const accessToken = this.props.sfdata.access_token;
        console.log('accessToken length', accessToken.length);
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('response', response);
        const data = await response.json();
        console.log('data', data);
        this.setState({records: data.records});
    }

    render() {
        return <Form>
            <Form.Group>
                <Form.Label>SOQL Query: </Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={6} 
                    onChange={e=>this.setState({query: e.target.value})} 
                    placeholder="SELECT Id, Name FROM Lead"
                    value="SELECT Id, Name FROM Lead"
                />
            </Form.Group>
            <Button onClick={this.handleRun}>Run</Button>
        </Form>
    }
}