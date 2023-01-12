/* exported data */
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function () {
  var entry = JSON.stringify(data.entries);
  if (entry !== null) {
    localStorage.setItem('data', entry);
  }
});
