import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import TableWrapper from './examples/TableWrapper';


storiesOf('TextInput', module)
    .add('default', () => (
        <TableWrapper  />
    ));
