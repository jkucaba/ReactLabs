import React, {Component} from "react";
import PropTypes from 'prop-types';
class CheckList extends Component {
    checkInputKeyPress(evt) {
        if (evt.key === "Enter") {
            this.props.taskCallbacks.add(this.props.cardId, evt.target.value);
            evt.target.value = "";
        }
    }
    render() {
        let tasks = this.props.tasks.map((task, taskIndex) => (
            <li className="checklist_task" key={task.id}>
                <input type="checkbox" defaultChecked={task.done} onChange={
                    this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex)
                }/>
                {task.name}{' '}
                <a href="#" className="checklist_task--remove" onClick={
                    this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, taskIndex)
                }/>
            </li>
        ));

        return (
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text"
                       className="checklist--add-task"
                       placeholder="Type then hit Enter to add a task"
                       onKeyUp={this.checkInputKeyPress.bind(this)}/>
            </div>
        );
    }
}

CheckList.propTypes = {
    cardId: PropTypes.number,
    taskCallbacks: PropTypes.object,
    tasks: PropTypes.arrayOf(PropTypes.object)
}
export default CheckList;