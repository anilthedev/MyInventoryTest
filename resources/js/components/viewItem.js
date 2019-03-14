import React, { Component } from 'react';

import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Input,
    Button,
    InputGroup, Table
} from 'reactstrap';

import { Link, Redirect } from 'react-router-dom';
import axios from "axios";


class ViewItem extends Component {

    constructor(props) {
        super(props);

        this.getItemDetails = this.getItemDetails.bind(this);

        this.state = {
            item: []
        };
    }

    componentDidMount() {
        var itemId = this.props.match.params.id;
        this.getItemDetails(itemId);

    }

    getItemDetails(itemId) {
        var url = 'http://localhost:8888/myInventory/public/api/items/'+itemId;
        axios.get(url)
            .then((response) => {
                this.setState({ item: response.data.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {

        if (this.state.status == 1) return <Redirect to={{ pathname: '/', state: { referrer: 1, message:'Item details updated successfully' }} } />;

        return (
            <div className="animated fadeIn">
                <Row className="justify-content-center">
                    <Col xs="8" sm="8">
                        <Row>
                            <Col className="text-right">
                                <Link to={'/'}>
                                    <button className="btn btn-success mb-3">
                                        Go Back
                                    </button>
                                </Link>
                            </Col>
                        </Row>
                        {(this.state.status == 1) ? (
                                <Card>
                                    <CardBody>
                                        <i class="fa fa-check" aria-hidden="true"></i>
                                        <strong> Item details Updated Successfully</strong>
                                        <Button color="success" block>
                                            <Link to={'/'}>Back to Items</Link>
                                        </Button>
                                    </CardBody>
                                </Card>
                            ) :
                            (<Card>
                                <CardHeader>
                                    <strong> Item Details </strong>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive hover>
                                        <tbody>
                                        <tr>
                                            <th scope="row">
                                              Item Name
                                            </th>
                                            <td>
                                                {this.state.item.item_name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                Item Type
                                            </th>
                                            <td>
                                                {this.state.item.item_type}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                Item Description
                                            </th>
                                            <td>
                                                {this.state.item.item_description}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                Item Price
                                            </th>
                                            <td>
                                                {this.state.item.price}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                Item Quantity
                                            </th>
                                            <td>
                                                {this.state.item.quantity}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                Item Status
                                            </th>
                                            <td>
                                                {this.state.item.status}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>)}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ViewItem;
