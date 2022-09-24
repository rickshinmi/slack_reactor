const SLACK_BOT_TOKEN = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN')
const SLACK_ADD_REACTION_URL = "https://slack.com/api/reactions.add"
const SLACK_REMOVE_REACTION_URL = "https://slack.com/api/reactions.remove"

const reactionEmojiObj = {
  gorilla: 'gorigori',
  vote2: 'vote2',
  vote3: 'vote3',
  vote4: 'vote4',
  vote5: 'vote5',
  vote6: 'vote6',
  vote7: 'vote7',
}

// SlackのOutgoingから来るメッセージ
function doPost(e) {
  try {
    const json = JSON.parse(e.postData.getDataAsString())
    if (json.type == "url_verification") {
      return ContentService.createTextOutput(json.challenge)
    }
  }
  catch (ex) {
  }

  try {
    const json = JSON.parse(e.postData.getDataAsString())
    const { item: { channel, ts }, reaction, item_user, user, type } = json.event

    logging(ts, channel, reaction, item_user, user, type)

    if (type == "reaction_added") {
      switch (reaction) {
        case 'koutou_yumin':
          addAndRemoveReaction(ts, channel, rick)
          break
        default:
          addReaction(ts, channel, reactionEmojiObj[reaction])
          break
      }
    }
    if (type == "reaction_removed") {
      switch (reaction) {
        case 'koutou_yumin':
          addAndRemoveReaction(ts, channel, rick)
          break
        default:
          removeReaction(ts, channel, reactionEmojiObj[reaction])
          break
      }
    }

  }
  catch (e) {
    console.error(e)
  }
}


function logging(ts, channel, reaction, user_item, user, type) {
  const id = "1FwyZk1cSouBpJrLvhAkcEBEHTZyJ9agqj3E2dUygyrw"//spreadsheetのid
  const ss = SpreadsheetApp.openById(id)
  const sheet = ss.getActiveSheet()
  const date = new Date()
  const timestamp = (Utilities.formatDate(date, 'Asia/Tokyo', 'yyyyMMdd: hhmmss'))
  sheet.appendRow([timestamp, ts, reaction, channel, user_item, user, type])
}

function addReaction(ts, channel, emojis) {
  const method = 'post'
  const payload = {
    token: SLACK_BOT_TOKEN,
    channel: channel,
    timestamp: ts,
  }
  const params = {
    method,
    payload,
  }
  // 追加対象のemoji

  for (let i = 0;i < emojis.length;i++) {
    Utilities.sleep(300)
    payload.name = emojis[i]
    UrlFetchApp.fetch(SLACK_ADD_REACTION_URL, params)
  }
}

function removeReaction(ts, channel, emojis) {
  const method = 'post'

  const payload = {
    token: SLACK_BOT_TOKEN,
    channel: channel,
    timestamp: ts,
  }
  const params = {
    'method': method,
    'payload': payload
  }

  for (let i = 0;i < emojis.length;i++) {
    Utilities.sleep(300)
    payload.name = emojis[i]
    UrlFetchApp.fetch(SLACK_REMOVE_REACTION_URL, params)
  }
}

function addAndRemoveReaction(ts, channel, emojis) {
  const method = 'post'
  const payload = {
    token: SLACK_BOT_TOKEN,
    channel: channel,
    timestamp: ts,
  }
  const params = {
    method,
    payload
  }
  // 追加対象のemoji
  for (let i = 0;i < emojis.length;i++) {
    Utilities.sleep(300)
    payload.name = emojis[i]
    UrlFetchApp.fetch(SLACK_ADD_REACTION_URL, params)
  }

  const url2 = "https://slack.com/api/reactions.remove"
  for (let i = 0;i < emojis.length;i++) {
    Utilities.sleep(300)
    payload.name = emojis[i]
    UrlFetchApp.fetch(url2, params)
  }
}

// addReaction関数が正常に動くかのテスト
function tester() {
  addReaction("1662651643.944659", "C03NANWSP8A", vote2)
}

// logging関数が正常に動くかのテスト
function tester2() {
  logging("1", "neko")
}

function tester3() {
  removeReaction("C03NANWSP8A", "1662452797.957969", gorigori)
}