import React, { Component } from 'react';
import CheckList from './checklist';
import PropTypes from 'prop-types';

let titlePropType = (props, propName, componentName) => {
    if(props[propName]){
        let value = props[propName];
        if(typeof value !== 'string' || value.length > 80){
            return new Error(
                `${propName} in ${componentName} is longer than 80 characters`
            );
        }
    }
}
class Card extends Component {
    constructor() {
        super();
        this.state = {
            showDetails: false
        };
    }
    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails});
    }
    render() {
        let cardDetails;
        if(this.state.showDetails){
            cardDetails =
                (<div className="card_details">
                {this.props.description}
                <CheckList
                    key={this.props.id}
                    cardId={this.props.id}
                    tasks={this.props.tasks}
                    taskCallbacks={this.props.taskCallbacks}
                />
                </div>
                );
        }
        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.color
        }
        return (
            <div className="card">
                <div style={sideColor}/>
                <div className={this.state.showDetails ? "card_title card_title--is-open" : "card_title"}
                     onClick={this.toggleDetails.bind(this)}></div>
                {cardDetails}
            </div>
        );
    }
}

Card.propTypes = {
    id: PropTypes.number,
    title: titlePropType,
    description: PropTypes.string,
    color: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object
}
export default Card;