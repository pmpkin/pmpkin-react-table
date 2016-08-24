import React from 'react';

import Table from '../../src/';
import data from './fake-data';

const columns = [
    {
        title: 'Name',
        value: (entry) => (entry.name)
    },
    {
        title: 'Company',
        value: (entry) => (entry.company)
    },
    {
        title: 'Email',
        value: (entry) => (entry.email)
    }
];

class BasicTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data
        }
    }

    render() {
        return (
            <div style={{ margin: '30px' }}>
                <Table
                    {...this.props}
                    columns={columns}
                    data={this.state.data}
                />
            </div>
        )
    }
}

export default BasicTable;
