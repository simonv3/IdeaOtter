Meteor.publish('ideas', function (options, searchString, boardFilter) {

  if (searchString === null || searchString === undefined)
    searchString = '';

  if (boardFilter === null || boardFilter === undefined)
    boardFilter = '';

  var filter = {
    'idea' :
      { '$regex' : '.*' + (searchString !== undefined ? searchString : '') + '.*',
        '$options' : 'i' },
  };

  if (boardFilter !== '')
    filter.board = boardFilter;

  Counts.publish(this, 'numberOfIdeas', Ideas.find(filter), {noReady: true});

  if (options && options.sort === undefined || options.sort === null) {
    options.sort = {date_added: -1};
  }

  return Ideas.find(filter, options);
});
