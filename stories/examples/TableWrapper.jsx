import React from 'react';

import Table from '../../lib';
import data from './fake-data';
import CheckCircle from '../../src/svg/check-circle-outline.svg';
import More from '../../src/svg/dots-horizontal.svg';

class TableWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selection: {},
            data
        }
        this.onRowSelected = this.onRowSelected.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
        this.renderTableRowActions = this.renderTableRowActions.bind(this);
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

    isSelected(entry, index) {
        return this.state.selection[index];
    }

    renderTableRowActions(entry, index) {
        return (
            <span style={{display: 'flex'}}>
            <a>
                <CheckCircle className="svg"/>
            </a>
            <a>
                <More className="svg"/>
            </a>
            </span>

        )
    }

    render() {
        return (
            <div style={{ margin: '30px' }}>
            <Table
                {...this.props}
                data={this.state.data}
                onSelectAllRows={this.onSelectAll}
                onRowSelected={this.onRowSelected}
                isRowSelected={this.isSelected}
                renderTableRowActions={this.renderTableRowActions}
                clickable
            />
            </div>
    );
  }
}

export default TableWrapper;
