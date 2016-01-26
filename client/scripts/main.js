import oHoverable from 'o-hoverable';
import attachFastClick from 'fastclick';
import mainTemplate from '../templates/main.hbs';
import peopleTemplate from '../templates/people.hbs';
import person_item from '../templates/_person_item.hbs';
import person_group from '../templates/_person_group.hbs';
import hb_helper from'./handlebars-helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  // make hover effects work on touch devices
  oHoverable.init();

  // remove the 300ms tap delay on mobile browsers
  attachFastClick(document.body);

  // YOUR CODE HERE!
  var groupNames = [];
  var groups = [];
  var dataset = spreadsheet.data;
  var groupTitles = spreadsheet.groups;
  var credits = spreadsheet.credits;

  // put the dataset into groups and add the corresponding indicators
  groupTitles.forEach(function (row) {
    groupNames.push(row.name);
    groups.push({
      type: row.name,
      person: []
    });
  });

  dataset.forEach(function (row) {
    var groupIndex = groupNames.indexOf(row.type);
    groups[groupIndex].person.push(row);
  });

  document.querySelector('main').innerHTML = mainTemplate(spreadsheet);

  var peopleHTML = peopleTemplate(groups, {
    partials: {
      person_item,
      person_group
    }
  });

  document.querySelector('.content').innerHTML = peopleHTML;

  // add headers to each group based on group sheets
  groupTitles.forEach(function (row, indx) {
    document.querySelector('.' + groupTitles[indx].name + ' .group-heading').innerHTML = groupTitles[indx].value;
  });

  document.querySelector('.byline').innerHTML = writeCredits(credits);
});
