import React, { Component } from 'react';

import {
    Col,
    Row,
} from 'reactstrap';

import { Redirect } from 'react-router-dom';
import axios from "axios";


class DeleteItem extends Component {

    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this);

        this.state = {
            status: 0
        };
    }

    componentDidMount() {
        var itemId = this.props.match.params.id;
        this.deleteItem(itemId);

    }

    deleteItem(itemId) {
        var url = 'http://localhost:8888/myInventory/public/api/items/'+itemId;
        axios.delete(url)
            .then((response) => {
                this.setState({error: 0, status: 1, message: response.data.message});
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

                    </Col>
                </Row>
            </div>
        )
    }
}

export default DeleteItem;
