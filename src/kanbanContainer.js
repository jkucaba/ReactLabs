import React, {Component} from 'react';
import KanbanBoard from "./kanban";
import update from 'immutability-helper';
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
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        let newTask = {id: Date.now(), name: taskName, done: false};
        let nextState = update(this.state.cards, {
                                    [cardIndex]: {
                                        tasks: {$push: [newTask]}
                                    }
                                });
        this.setState({cards: nextState});
    }
    deleteTask(cardId, taskId, taskIndex) {
        console.log(`Deleted ${cardId}:${taskId}:${taskIndex}`)

        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$splice: [[taskIndex, 1]]}
            }
        });

        this.setState({cards: nextState});
    }

    toggleTask(cardId, taskId, taskIndex) {
        console.log(`Toggled ${cardId}:${taskId}:${taskIndex}`)
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        let newDoneValue;
        let nextState = update(this.state.cards, {
                                    [cardIndex]: {
                                        tasks: {
                                            [taskIndex]: {
                                                done: {$apply: (done) => {
                                                    newDoneValue = !done;
                                                    return newDoneValue;
                                                }}
                                            }
                                        }
                                    }
                                });
        this.setState({cards: nextState});
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