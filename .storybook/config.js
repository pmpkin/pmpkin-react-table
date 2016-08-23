import { configure, addDecorator } from '@kadira/storybook';
import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '../scss/style.scss';

addDecorator((story) => {
  return (story());
});

function loadStories() {
  require('../stories/TableStories');
}

configure(loadStories, module);
