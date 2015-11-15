Meteor.publish('ideas', function (options, searchString) {

  if (searchString === null || searchString === undefined)
    searchString = '';

  Counts.publish(this, 'numberOfIdeas', Ideas.find({
    'idea' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
    $and:[
      {'owner': this.userId},
      {'owner': {$exists: true}}
    ]}), {noReady: true});

  if (options && options.sort === undefined || options.sort === null) {
    options.sort = {date_added: -1};
  }

  return Ideas.find({
    'idea' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
    $and:[
      {'owner': this.userId},
      {'owner': {$exists: true}}
    ]}, options);
});
