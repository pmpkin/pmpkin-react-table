import React from 'react';

import Table from '../../src/';
import data from './fake-data';
import CheckCircle from '../../src/svg/check-circle-outline.svg';
import More from '../../src/svg/dots-horizontal.svg';

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

class SelectionTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selection: {},
            data
        }
        this.onRowSelected = this.onRowSelected.bind(this);
        this.isRowSelected = this.isRowSelected.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
        this.renderTableRowActions = this.renderTableRowActions.bind(this);
        this.onActionClicked = this.onActionClicked.bind(this);
    }

    onSelectAll() {
        let selection = {};
        if (Object.keys(this.state.selection).length < this.state.data.length) {
            selection = this.state.data.reduce((result, current, index) => {
                result[index] = current.id;
                return result;
            }, {});
        }

        this.setState(Object.assign({
            ...this.state,
            selection
        }));
    }

    onRowSelected(entry, index) {
        const selection = Object.assign({}, this.state.selection);
        if (selection[index]) {
            delete selection[index]
        } else {
            selection[index] = entry.id;
        }
        this.setState(Object.assign({
            ...this.state,
            selection
        }));
    }

    onActionClicked(e, entry, index, action) {
        e.stopPropagation();
        this.props.onActionClicked(entry, index, action);
    }

    isRowSelected(entry, index) {
        return this.state.selection[index];
    }

    renderTableRowActions(entry, index) {
        return (
            <span style={{ display: 'flex' }}>
            <a onClick={(e) => this.onActionClicked(e, entry, index, 'action 1')}>
                <CheckCircle className="svg" />
            </a>
            <a onClick={(e) => this.onActionClicked(e, entry, index, 'action 2')}>
                <More className="svg" />
            </a>
            </span>

        )
    }

    render() {
        return (
            <div style={{ margin: '30px' }}>
                <Table
                    {...this.props}
                    columns={columns}
                    data={this.state.data}
                    onSelectAllRows={this.onSelectAll}
                    onRowSelected={this.onRowSelected}
                    isRowSelected={this.isRowSelected}
                    renderTableRowActions={this.renderTableRowActions}
                    clickable
                    selectable
                    hover
                />
            </div>
        )
    }
}

export default SelectionTable;
