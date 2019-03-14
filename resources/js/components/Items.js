import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import axios from "axios";

function ItemRow(props) {
    const item = props.item;
    const itemDetailsLink = `/item/details/${item.id}`;
    const itemEditLink = `/item/edit/${item.id}`;
    const itemDeleteLink = `/item/delete/${item.id}`;

    return (
        <tr key={item.id.toString()}>
            <th scope="row">
                <Link to={itemDetailsLink}>{item.id}</Link>
            </th>
            <td>
                <Link to={itemDetailsLink}>{item.item_name}</Link>
            </td>
            <td>
                <Link to={itemDetailsLink}>{item.item_type}</Link>
            </td>
            <td>
                US ${item.price}
            </td>
            <td>{item.status}</td>
            <td>{item.created_at}</td>
            <td>
                <Link to={itemEditLink}>
                    <button className="btn btn-primary mr-2 btn-sm">
                        Edit
                    </button>
                </Link>
                <Link to={itemDeleteLink}>
                    <button className="btn btn-success mr-2 btn-sm">
                        Delete
                    </button>
                </Link>
            </td>
        </tr>
    );
}


class Items extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            deleteStatus: 0
        };
        this.getAllItems = this.getAllItems.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    componentDidMount() {
        this.getAllItems();
    }

    getAllItems() {
        var url = 'http://localhost:8888/myInventory/public/api/items';
        axios.get(url)
            .then((response) => {
                this.setState({ items: response.data.data });

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteItem(teamId){
        var url = 'http://localhost:8888/myInventory/public/api/items'+teamId;
        axios.delete(url)
            .then((response) => {
                this.setState({ deleteStatus: 1});
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        const itemList = this.state.items;
        const itemAddLink = `/item/add`;


        return (
            <div className="animated fadeIn">
                <Row className="justify-content-center">
                    <Col xl={12} sm="12">
                        {this.props.location.state &&
                        this.props.location.state.referrer == 1 ? (
                            <Card className="mb-2">
                                <CardBody>
                                    <i class="fa fa-check" aria-hidden="true" />
                                    <strong> {this.props.location.state.message}</strong>
                                </CardBody>
                            </Card>
                        ) : (
                            ""
                        )}
                        {this.state.deleteStatus == 1 ? (
                            <Card className="mb-2">
                                <CardBody>
                                    <i class="fa fa-check" aria-hidden="true" />
                                    <strong> Item deleted successfully</strong>
                                </CardBody>
                            </Card>
                        ) : (
                            ""
                        )}
                        <Row>
                            <Col className="text-right">
                                <Link to={itemAddLink}>
                                    <button className="btn btn-primary mb-3">
                                        <i className="nav-icon icon-plus" /> Create Item
                                    </button>
                                </Link>
                            </Col>
                        </Row>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify" /> Items
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover>
                                    <thead>
                                    <tr>
                                        <th scope="col" width="20">
                                            ID
                                        </th>
                                        <th scope="col">Item Name</th>
                                        <th scope="col">Item Type</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Created On</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {itemList.map((item, index) => (
                                        <ItemRow key={index} item={item} />
                                    ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Items;
