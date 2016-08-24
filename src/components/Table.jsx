import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import TableRowSelector from './TableRowSelector';
import CheckSelectAll from '../svg/checkbox-multiple-marked-circle-outline.svg';

export default class Table extends Component {

    static Props = {
        data: PropTypes.array,
        isFetching: PropTypes.boolean,
        className: PropTypes.string,
        columns: PropTypes.array,
        hasHeader: PropTypes.boolean,
        loadingMessage: PropTypes.string,
        emptyMessage: PropTypes.string,
        emptyMessageOnFilter: PropTypes.string,
        renderTableRowImage: PropTypes.func,
        onRowClicked: PropTypes.func,
        onRowSelected: PropTypes.func,
        onSelectAllRows: PropTypes.func,
        isRowSelected: PropTypes.func
    }

    static defaultProps = {
        hasHeader: true,
        emptyMessage: 'Es wurden keine Einträge gefunden.',
        loadingMessage: 'Einen Moment bitte...',
        emptyMessageOnFilter: 'Die Suche erbrachte keine Ergebnisse.',
        isRowSelected() { }
    }

    constructor(props) {
        super(props);
        this.onRowClick = this.onRowClick.bind(this);
    }

    onRowClick(entry, index) {
        if (this.props.onRowClicked) this.props.onRowClicked(entry, index);
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
            <th className="table-row-selector-cell head">
                <a className="table-row-selector" onClick={this.props.onSelectAllRows}>
                    <CheckSelectAll className="svg select-all" />
                </a>
            </th>
        )
    }

    renderHeader() {
        return (
            <thead>
                <tr>
                    { this.props.selectable && this.renderSelectAll() }
                    { !this.props.selectable && this.props.renderTableRowImage && <th /> }
                    { this.props.columns.map((column, index) => this.renderHeaderCell(column, index)) }
                    { this.props.renderTableRowActions && <th /> }
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
        return <TableRowSelector entry={entry} index={index} renderTableRowImage={this.props.renderTableRowImage} select={this.props.onRowSelected} />
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
        const cx = classNames({
            selected: this.props.selectable && this.props.isRowSelected(entry, index)
        });
        return (
            <tr key={index} className={cx} onClick={() => this.onRowClick(entry, index)}>
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
        return <span>{ this.props.loadingMessage }</span>;
    }

    renderEmptyMessage() {
        return <span>{ this.props.emptyMessage }</span>;
    }

    renderFilteredEmptyMessage() {
        return <span>{ this.props.emptyMessageOnFilter }</span>;
    }

    render() {
        if (!this.props.data) return null;
        if (this.props.isFetching && (!this.props.data || !this.props.data.length)) return this.renderLoadingMessage();
        if (!this.props.isFetching && (!this.props.data || !this.props.data.length)) {
            return this.props.filtered ? this.renderEmptyMessage() : this.renderFilteredEmptyMessage();
        }

        const clazz = classNames(
            this.props.tableClass || 'table table-default',
            { 'table-hover': this.props.hover,
              'table-striped': this.props.striped,
              'table-clickable': this.props.clickable,
               'table-row-images': this.props.renderTableRowImage,
               'table-row-selectable': this.props.selectable,
               'table-row-actions': this.props.renderTableRowActions
            }
        )
        return (
            <table className={clazz}>
                { this.props.hasHeader && this.renderHeader()}
                { this.renderBody()}
            </table>
        )
    }

}
