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

import Table from 'react-bootstrap/Table';

export default class QueryPage extends React.Component {
    state = {
        query: 'SELECT Id, Name FROM Lead',
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
        const response = await fetch('/api/sf-query', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                url: url,
                sfdata: this.props.sfdata,
            })
        });
        console.log('response', response);
        const data = await response.json();
        console.log('data', data);
        this.setState({records: data.records});
    }

    render() {
        return <Container style={{top: '112px', marginTop: '56px'}}>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>SOQL Query: </Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={6} 
                                onChange={e=>this.setState({query: e.target.value})} 
                                placeholder="SELECT Id, Name FROM Lead"
                                value={this.state.query}
                            />
                        </Form.Group>
                        <Button onClick={this.handleRun}>Run</Button>
                    </Form>                
                </Col>
                <Col>
                    {this.state.records && this.state.records.length>=1 && 
                        <Table bordered={true} hover={true}>
                            <thead>
                                <tr>
                                    {Object.keys(this.state.records[0])
                                    .filter(key => key !== 'attributes')
                                    .map(key => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.records.map((record, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {Object.keys(record)
                                            .filter(key => key !== 'attributes')
                                            .map(key => (
                                            <td key={key}>{record[key]}</td>
                                            ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    }
                </Col>                
            </Row>

        </Container>
    }
}