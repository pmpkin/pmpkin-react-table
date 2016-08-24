import React, { Component } from 'react';
import CheckCircleOutline from '../svg/check-circle-outline.svg';
import CheckCircle from '../svg/check-circle.svg';
import CheckBoxBlankCircleOutline from '../svg/checkbox-blank-circle-outline.svg';

export default class TableRowSelector extends Component {

    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(e) {
        e.stopPropagation();
        this.props.select(this.props.entry, this.props.index);
    }

    render() {
        return (
            <td className="table-row-selector-cell">
                {
                    this.props.renderTableRowImage && (
                        <span className="table-row-image">
                            { this.props.renderTableRowImage(this.props.entry, this.props.index)}
                        </span>
                    )
                }
                <a className="table-row-selector" onClick={this.onSelect}>
                    <span className="icon">
                        <CheckBoxBlankCircleOutline className="svg off" />
                        <CheckCircleOutline className="svg on" />
                        <CheckCircle className="svg selected" />
                    </span>

                </a>
            </td>
        )
    }
}
