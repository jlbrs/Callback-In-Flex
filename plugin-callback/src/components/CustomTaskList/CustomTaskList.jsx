import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneSquareAlt } from '@fortawesome/free-solid-svg-icons'
import { withTaskContext } from '@twilio/flex-ui';

import { CustomTaskListComponentStyles } from './CustomTaskList.Styles';

// It is recommended to keep components stateless and use redux for managing states
class CustomTaskList extends React.Component {
    render() {
        const {task} = this.props;
        console.log(task);
        return (
            <CustomTaskListComponentStyles>
            {task.attributes.type && task.attributes.type === "callback" && (
                <>
                    <h1>Demande de rappel</h1>
                    <h2>Contact :</h2>
                    <p>{task.attributes.name}</p>
                    <h2>Téléphone :</h2>
                    <p>{task.attributes.phone_number}</p>
                    <h2>Motif :</h2>
                    <p>{task.attributes.motif}</p>
                    <h2>Appeler :</h2>
                    <p><a onClick={(e) => this.props.clickToDial(task.attributes.phone_number, task)}><FontAwesomeIcon icon={faPhoneSquareAlt}/> rappeler</a></p>
                </>
            )
            }
            </CustomTaskListComponentStyles>
        );
    };
}

export default withTaskContext(CustomTaskList);
