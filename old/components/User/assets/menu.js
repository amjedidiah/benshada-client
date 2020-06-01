// JS Document
import $ from 'jquery';

const menu = () => {
  $('#dashboardMenuToggle').click(() => {
    $('#userSide').toggle();
  });
  $(window).resize(() => {
    if ($(window).innerWidth() >= 768) $('#userSide').show();
  });
};

export default menu;
