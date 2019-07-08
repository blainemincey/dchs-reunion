import React, {Component} from 'react';
import {Header, Message, Divider} from 'semantic-ui-react';

export default class Help extends Component {

    render() {

        return (
            <div>
                <Header as="h1">DCHS Class of 1989</Header>
                <Header as="h2">30 Year Class Reunion Registration</Header>
                <Divider/>
                <div>
                    <Message
                        info
                        header='Help'
                        content='If you have any questions/issues, please contact Blaine Mincey via blaine (.) mincey @ gmail (.) com.'
                    />
                </div>
            </div>
        );
    }
};