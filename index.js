const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'CoXKYe+ZuFR9j5tvXXN+zLwbpkW6LgXS1GeppXvrXI0C3M43hR643vZU0TpLTJeAXV2b/PevGJ6R2IwJo9IxBaU4AzsR3w1/uIMbsgXSKqC+LfWhQISxsG5Oh4oifXFkymKla88aFcfUZQ3/T8RrOgdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'b73b82bf14b98f6e89749521989429a9'
};

const app = express();
app.post('/', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(process.env.PORT || 8080, function() {
  console.log("App now running on port");
});
