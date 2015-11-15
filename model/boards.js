Boards = new Mongo.Collection("boards");

Boards.allow({
  insert: function (userId, board) {
    return userId && board.owner === userId;
  },
  update: function (userId, board, fields, modifier) {
    if (userId !== board.owner)
      return false;

    return true;
  },
  remove: function (userId, board) {
    if (userId !== board.owner)
      return false;

    return true;
  }
});
