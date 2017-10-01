module.exports = function(req, res) {
  var data = JSON.parse(req.body.params);
  if (!data) {
    res.status(400 /* Bad params */ ).send('Invalid params');
    return;
  }

  var width = data.width > 600 ? 600 : data.width;
  // var height = data.height > 1500 ? 1500 : data.height;
  var html = '<img style="max-width:100%;" src="' + data.src + '" width="' + width + '"/>';
  res.json({
    body: html
    // Add raw:true if you're returning content that you want the user to be able to edit
  });
};
