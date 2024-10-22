import React, {Component} from 'react';

class GroceryList extends Component {
    render(){
        return (
            <ul>
                <ListItem quantity="1" name="Butter" />
                <ListItem quantity="6" name="Eggs" />
                <ListItem quantity="2" name="Milk" />
            </ul>
        );
    }
}


class ListItem extends Component {
    render(){
        return (
            <li>
                {this.props.quantity} x {this.props.name}
            </li>
        );
    }
}


export default GroceryList;