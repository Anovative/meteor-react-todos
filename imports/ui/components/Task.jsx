import React, { Component } from 'react';
import { Tasks }            from '../../api/tasks';
import { Meteor }           from 'meteor/meteor';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked () {
    // Set the checked property to the opposite of its current value
    Meteor.call( 'tasks.setChecked', this.props.task._id, !this.props.task.isComplete );
  }

  deleteThisTask () {
    Meteor.call( 'tasks.remove', this.props.task._id );
  }

  render () {
    // Give tasks a different className when they are checked off, so that we can style them nicely in CSS
    const taskClassName = this.props.task.isComplete ? 'checked' : '';

    return (
        <li className={taskClassName}>
          <button className="delete" onClick={this.deleteThisTask.bind( this )}>
            &times;
          </button>

          <input
              type="checkbox"
              readOnly
              checked={this.props.task.isComplete}
              onClick={this.toggleChecked.bind( this )}
          />

          <span className="text"><b>{this.props.task.username}</b>: {this.props.task.text}</span>
        </li>
    );
  }
}
