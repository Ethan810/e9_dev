import React from 'react';
import ReactDOM from 'react-dom';
import styled, {
    css
} from 'styled-components';

export default class Button2 extends React.PureComponent {

    render() {
            const Button = styled.button`
            border-radius: 3px;
            padding: 0.25em 1em;
            margin: 0 1em;
            background: transparent;
            color: palevioletred;
            border: 2px solid palevioletred;
          
            ${props => props.primary && css`
              background: palevioletred;
              color: white;
            `}
          `;
        return(
            <div> 
                <Button {...this.props}>{this.props.children}</Button>
            </div>
        )
    }
}