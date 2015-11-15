Meteor.publish('boards', function (options, searchString) {

  if (searchString === null || searchString === undefined)
    searchString = '';

  Counts.publish(this, 'numberOfBoards', Boards.find({
    'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
    $and:[
      {owner: this.userId},
      {owner: {$exists: true}}
    ]}, options), { noReady: true });

  return Boards.find({
    'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
    $and:[
      {owner: this.userId},
      {owner: {$exists: true}}
    ]}, options);
});
