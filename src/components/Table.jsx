import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

export default class Table extends Component {

    static Props = {
        data: PropTypes.array,
        className: PropTypes.string,
        columns: PropTypes.array,
        hasHeader: PropTypes.boolean,
        loadingMessage: PropTypes.string,
        emptyMessage: PropTypes.string,
        emptyMessageOnFilter: PropTypes.string,
        renderTableRowImage: PropTypes.func,
        onRowClick: PropTypes.func,
        onRowSelected: PropTypes.func,
        onSelectAll: PropTypes.func,
        selection: PropTypes.object
    }

    renderHeaderCell(column, key) {
        const isFunction = typeof column.title === 'function';
        return (
            <th key={key} width={column.width}>
                { isFunction && column.title(column, key)}
                { !isFunction && column.title }
            </th>
        )
    }

    renderSelectAll() {
        return (
            <th>
                <a>SEA</a>
            </th>
        )
    }

    renderHeader() {
        return (
            <thead>
                <tr>
                    { this.props.selectable && this.renderSelectAll() }
                    { !this.props.selectable && this.props.renderTableRowImage && <th></th> }
                    { this.props.columns.map((column, index) => this.renderHeaderCell(column, index)) }
                    { this.props.renderTableRowActions && <th width="100px"></th> }
                </tr>
            </thead>
        )
    }

    renderBodyCell(entry, column, colIndex) {
        const isFunction = typeof column.value === 'function';
        return (
            <td key={colIndex}>
                { isFunction && column.value(entry)}
                { !isFunction && <span>{entry.doc[column.value]}</span> }
            </td>
        )
    }

    renderTableRowSelector(entry, index) {
        return (
            <td className="table-row-selector-cell">
                {
                    this.props.renderTableRowImage && (
                        <span className="table-row-image">
                            { this.props.renderTableRowImage(entry, index)}
                        </span>
                    )
                }
                <span className="table-row-selector">
                    <span className="mdi mdi-check"></span>
                </span>
            </td>
        )
    }

    renderTableRowActions(entry, index) {
        return (
            <td className="table-row-actions-cell">
                <span className="table-row-actions">
                    { this.props.renderTableRowActions(entry, index)}
                </span>
            </td>
        )
    }

    renderTableRow(entry, index) {
        return (
            <tr key={index} onClick={() => this.props.onRowClick(entry.id || entry)}>
                { this.props.selectable && this.renderTableRowSelector(entry, index) }
                { !this.props.selectable && this.props.renderTableRowImage && <td>{ this.props.renderTableRowImage(entry, index)}</td> }
                { this.props.columns.map((column, colIndex) => this.renderBodyCell(entry, column, colIndex)) }
                { this.props.renderTableRowActions && this.renderTableRowActions(entry, index) }
            </tr>
        )
    }

    renderBody() {
        return (
            <tbody>
                {
                    this.props.data.map((entry, index) => this.renderTableRow(entry, index))
                }
            </tbody>
        )
    }

    renderLoadingMessage() {
        return <span>{ this.props.loadingMessage || 'Einen Moment bitte...' }</span>;
    }

    renderEmptyMessage() {
        return <span>{ this.props.emptyMessage || 'Es wurden keine Einträge gefunden.' }</span>;
    }

    renderFilteredEmptyMessage() {
        return this.props.emptyMessage || 'Die Suche erbrachte keine Ergebnisse.';
    }

    render() {
        if (!this.props.data) return null;
        if (this.props.isFetching && (!this.props.data || !this.props.data.length)) return this.renderLoadingMessage();
        if (!this.props.isFetching && (!this.props.data || !this.props.data.length)) return this.renderEmptyMessage();
        const clazz = classNames(
            'table', this.props.tableClass || 'table-default',
            { 'table-hover': this.props.hover,
              'table-striped': this.props.striped,
              'table-clickable': this.props.clickable,
               'table-row-images': this.props.renderTableRowImage,
               'table-row-selectable': this.props.selectable,
               'table-row-actions': this.props.renderTableRowActions
            }
        )
        return (
            <div className="table-container">
                <table className={clazz}>
                    { this.props.hasHeader && this.renderHeader()}
                    { this.renderBody()}
                </table>
            </div>
        )
    }

}
