Ideas = new Mongo.Collection("ideas");

Ideas.allow({
  insert: function (userId, idea) {
    if (userId) {
      return userId && idea.owner === userId;
    } else {
      return true;
    }
  },
  update: function (userId, idea, fields, modifier) {
    if (userId !== idea.owner)
      return false;

    return true;
  },
  remove: function (userId, idea) {
    if (userId !== idea.owner)
      return false;

    return true;
  }
});

// TODO: this isn't working because Angular is spitting out an $apply
// is already in progress.

IdeaSchema = new SimpleSchema({
  idea: {
    type: String,
    label: "Idea",
  },
  owner: {
    type: String,
    label: "Owner"
  },
  board: {
    type: String,
    label: "Board",
    optional: true
  },
  is_public: {
    type: Boolean,
    label: "Is Public",
    defaultValue: false
  },
  date_added: {
    type: Date,
    label: "Date Added",
    defaultValue: moment(),
    optional: true
  },
  // date_last_updated: {
  //   type: Date,
  //   label: "Date Last Updated",
  //   autoValue: function() {
  //     return moment();
  //   }
  // }
});

// Ideas.attachSchema(IdeaSchema);
