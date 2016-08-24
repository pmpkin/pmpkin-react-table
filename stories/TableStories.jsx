import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import SelectionTable from './examples/SelectionTable';
import BasicTable from './examples/BasicTable';


storiesOf('Table', module)
    .add('Basic table', () => (<BasicTable />))
    .add('Basic table: clickable, hover, striped', () => (<BasicTable clickable hover striped onRowClicked={action('onRowClicked(entry, index)')} />))
    .add('Selectable rows, table row actions', () => (<SelectionTable onRowClicked={action('onRowClicked(entry, index)')} onActionClicked={action('onActionClicked(entry, index, action)')} />));
