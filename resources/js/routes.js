import React from 'react';
import Home from "./components/items";
import EditItem from "./components/EditItem";
import AddItem from "./components/AddItem";
import ViewItem from "./components/ViewItem";
import DeleteItem from "./components/DeleteItem";

const routes = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/item/add', exact: true, name: 'Add New Item', component: AddItem },
    { path: '/item/details/:id', exact: true, name: 'View Item Details', component: ViewItem },
    { path: '/item/edit/:id', exact: true, name: 'Edit Item Details', component: EditItem },
    { path: '/item/delete/:id', exact: true, name: 'Delete Item Details', component: DeleteItem },

];

export default routes;
