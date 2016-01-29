import oHoverable from 'o-hoverable';
import attachFastClick from 'fastclick';
import mainTemplate from '../templates/main.hbs';
import dateTemplate from '../templates/dates.hbs';
import state_item from '../templates/_state_item.hbs';
import date_group from '../templates/_date_group.hbs';
import hb_helper from'./handlebars-helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  // make hover effects work on touch devices
  oHoverable.init();

  // remove the 300ms tap delay on mobile browsers
  attachFastClick(document.body);

  // YOUR CODE HERE!
  var dateNames = [];
  var dates = [];
  var dataset = spreadsheet.data;
  // var dateTitles = spreadsheet.dates;
  var credits = spreadsheet.credits;

  dataset.forEach(function (row) {
    if (dateNames.indexOf(row.date) === -1) {
      dateNames.push(row.date);
      dates.push({
        date: row.date,
        state: []
      });
    }
  });

  dataset.forEach(function (row) {
    var dateIndex = dateNames.indexOf(row.date);
    dates[dateIndex].state.push(row);
  });

  console.log(dates)

  dates.sort(function (a, b) {
    if (a.date > b.date) return 1;
    if (a.date < b.date) return -1;
    return 0;
  });
  dates.forEach(function (date) {
    date.state.sort(function (a, b) {
      if (a.longstate > b.longstate) return 1;
      if (a.longstate < b.longstate) return -1;
      return 0;
    });
  });

  document.querySelector('main').innerHTML = mainTemplate(spreadsheet);

  var datesHTML = dateTemplate(dates, {
    partials: {
      state_item,
      date_group
    }
  });

  document.querySelector('.content').innerHTML = datesHTML;

  // add headers to each date based on date sheets
  // dateTitles.forEach(function (row, indx) {
  //   document.querySelector('.' + dateTitles[indx].name + ' .date-heading').innerHTML = dateTitles[indx].value;
  // });

  document.querySelector('.byline').innerHTML = writeCredits(credits);
});
