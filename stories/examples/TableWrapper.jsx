import React from 'react';

import TextInput from '../../src/components/TextInput';

class TextInputWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: null
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(property, value) {
        this.setState({
            [property]: value
        })
    }

    render() {
        const { input } = this.state;
        return (
            <div style={{margin: '30px', background: '#fafafa', border: 'solid 1px #eee', borderRadius: '4px', padding: '30px', width: '500px'}}>
            <TextInput
                {...this.props}
                name="input"
                value={input}
            />
            </div>
    );
  }
}

export default TextInputWrapper;
