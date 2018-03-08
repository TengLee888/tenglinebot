## 如何運作
當使用者傳了一個訊息時，會透過LINE Platform 傳一個 request 到設定的webhook，應用程式會透過 Messaging API 去處理及傳遞 request 到 LINE Platform 然後回應給使用者，這些 request 必須透過 HTTPS 去傳遞



## 步驟
1. 建立line developer帳號
  1.1 add provider
  1.2 Messaging API
  1.3 填寫資料
2. 建立heroku app
  2.1 deploy heroku app
  2.2 撰寫程式碼
    2.2.1 mkdir line-bot && cd line-bot
    2.2.2 npm init
    2.2.3 npm install --save express @line/bot-sdk
    2.2.4 touch index.js .gitignore
  2.3 push 上heroku master
3. 設定LINE bot未完成的部分
  3.1按下方的小箭頭
  3.2把channelAccessToken, channelSecret寫到程式碼或heroku app setting裡
  3.3 Use webhook => Enabled
  3.4 更新webhook URL, 就是heroku app 的網址
  3.5 Auto replying視情況記得改
4. line去照QRcode就可以測試了

## 程式碼
```
app.post('/', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});
```
- 先把config丟進line.middleware()進行驗證
- 把req.body.events這個array中的每一個元素丟進去handleEvent
- 最後把result傳給Line Platform


```
const client = new line.Client(config);
```
- 初始化


```
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}
```
- 先驗證message.type
- 回傳text:裡面的東西


## Ref
https://hackmd.io/8JM_mPKNThq4OcDl4ST5qQ?view
