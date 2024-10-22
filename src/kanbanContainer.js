import React, {Component} from 'react';
import KanbanBoard from "./kanban";

class KanbanContainer extends Component {
    constructor() {
        super();
        this.state = {
            cards: []
        };
    }
    componentDidMount() {
        fetch('./cards.json')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({cards: responseData});
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            });
    }
    addTask(cardId, taskName) {
        console.log(`Added ${cardId}:${taskName}`)
    }
    deleteTask(cardId, taskId, taskIndex) {
        console.log(`Deleted ${cardId}:${taskId}:${taskIndex}`)
    }
    toggleTask(cardId, taskId, taskIndex) {
        console.log(`Toggled ${cardId}:${taskId}:${taskIndex}`)
    }
    render() {
        return (
            <KanbanBoard cards={this.state.cards}
                        taskCallback={{
                            toggle: this.toggleTask.bind(this),
                            delete: this.deleteTask.bind(this),
                            add: this.addTask.bind(this)
                        }}/>
        );
    }
}

export default KanbanContainer;