import React, { Component } from 'react';

import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Input,
    Button,
    InputGroup
} from 'reactstrap';

import { Link, Redirect } from 'react-router-dom';
import axios from "axios";


class EditItem extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.getItemDetails = this.getItemDetails.bind(this);
        this.updateItem = this.updateItem.bind(this);

        this.state = {
            item: [],
            status: 0
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

    handleChange(event) {
        const inputKey = event.target.name;
        this.setState({item: {...this.state.item, [inputKey]: event.target.value}});
    }


    updateItem(e) {
        e.preventDefault();
        if(this.state.item.id !== undefined && this.state.item.id !==''){
            var url = 'http://localhost:8888/myInventory/public/api/items/'+this.state.item.id;

            axios.put(url,this.state.item)
                .then((response) => {
                    this.setState({error: 0, status: 1, message: response.data.message});
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    render() {

        if (this.state.status == 1) return <Redirect to={{ pathname: '/', state: { referrer: 1, message:'Item details updated successfully' }} } />;

        return (
            <div className="animated fadeIn">
                <Row className="justify-content-center">
                    <Col xs="8" sm="8">
                        {(this.state.status == 1) ? (
                                <Card>
                                    <CardBody>
                                        <i className="fa fa-check" aria-hidden="true"></i>
                                        <strong> Item details Updated Successfully</strong>
                                        <Button color="success" block>
                                            <Link to={'/'}>Back to Items</Link>
                                        </Button>
                                    </CardBody>
                                </Card>
                            ) :
                            (<Card>
                                <CardHeader>
                                    <strong>+ Edit Item Details </strong>
                                </CardHeader>
                                <CardBody>
                                    <form onSubmit={this.updateItem}>
                                    <InputGroup className="mb-3">
                                        <Input
                                            type="text"
                                            placeholder="item Name"
                                            name="item_name"
                                            onChange={this.handleChange}
                                            value={this.state.item.item_name}
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <Input
                                            type="text"
                                            placeholder="Item Type"
                                            name="item_type"
                                            onChange={this.handleChange}
                                            value={this.state.item.item_type}
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <Input type="textarea" value={this.state.item.item_description} name="item_description" id="item_description" onChange={this.handleChange}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <Input
                                            type="text"
                                            placeholder="Price"
                                            name="price"
                                            onChange={this.handleChange}
                                            value={this.state.item.price}
                                        />
                                    </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input
                                                type="text"
                                                placeholder="Quantity"
                                                name="quantity"
                                                onChange={this.handleChange}
                                                value={this.state.item.quantity}
                                            />
                                        </InputGroup>

                                    <InputGroup className="mb-3">
                                        <select
                                            class="form-control"
                                            id="ccyear"
                                            name="status"
                                            onChange={this.handleChange}
                                            value={this.state.item.status}
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </InputGroup>
                                        <Input type={"submit"} value={"Submit"}/>

                                    </form>
                                </CardBody>
                            </Card>)}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EditItem;
