import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TableWrapper from './examples/TableWrapper';


storiesOf('Table', module)
    .add('default', () => {
        const columns = [
            {
                title: 'Name',
                value: (entry) => (
                    <span>
                        {entry.name}
                    </span>
                )
            },
            {
                title: 'Company',
                value: (entry) => (
                    <span>
                        {entry.company}
                    </span>
                )
            },
            {
                title: 'Email',
                value: (entry) => (
                    <span>
                        {entry.email}
                    </span>
                )
            }
        ];

        return <TableWrapper
                    columns={columns}
                    selectable
                    striped
                    hover
                    clickable
                    hasHeader
                />
    });
