
// SlackのOutgoingから来るメッセージ
function doPost(e) {
  try {
    const json = JSON.parse(e.postData.getDataAsString());
    if (json.type == "url_verification") {
      return ContentService.createTextOutput(json.challenge);        
    }
  }
  catch (ex) {
} 

try {
    const json = JSON.parse(e.postData.getDataAsString());
      const channel = json.event.item.channel;
      const ts = json.event.item.ts;
      const reaction = json.event.reaction;
      const user_item = json.event.item_user
      const user = json.event.user
      const type = json.event.type
      logging(ts,channel,reaction,user_item,user,type)

if(type == "reaction_added"){
  if (reaction == "gorilla") {
    addReaction(ts,channel,gorigori);
  }
  else if(reaction == "koutou_yumin"){
    addandremovereaction(ts,channel,rick);
  }
  else if(reaction == "vote2"){
    addReaction(ts,channel,vote2);
  }
  else if(reaction == "vote3"){
    addReaction(ts,channel,vote3);
  }
  else if(reaction == "vote4"){
    addReaction(ts,channel,vote4);
  }
  else if(reaction == "vote5"){
    addReaction(ts,channel,vote5);
  }
  else if(reaction == "vote6"){
    addReaction(ts,channel,vote6);
  }
  else if(reaction == "vote7"){
    addReaction(ts,channel,vote7);
  }
}
if(type == "reaction_removed"){
    if(reaction == "gorilla"){
      removeReaction(ts,channel,gorigori)
  }
    else if(reaction == "koutou_yumin"){
    addandremovereaction(ts,channel,rick);
  }
    else if(reaction == "vote2"){
      removeReaction(ts,channel,vote2);
  }
    else if(reaction == "vote3"){
      removeReaction(ts,channel,vote3);
  }
    else if(reaction == "vote4"){
      removeReaction(ts,channel,vote4);
  }
    else if(reaction == "vote5"){
      removeReaction(ts,channel,vote5);
  }
    else if(reaction == "vote6"){
      removeReaction(ts,channel,vote6);
  }
    else if(reaction == "vote7"){
      removeReaction(ts,channel,vote7);
  }
}

      }   
catch (e) {

}

}


function tester2(){
  logging("1","neko")
}
//logging関数が正常に動くかのテスト

function logging(ts,channel,reaction,user_item,user,type) {
  var id = "1FwyZk1cSouBpJrLvhAkcEBEHTZyJ9agqj3E2dUygyrw"//spreadsheetのid
  var ss = SpreadsheetApp.openById(id)
  var sheet = ss.getActiveSheet()
  var date = new Date();
  var timestamp = (Utilities.formatDate( date, 'Asia/Tokyo', 'yyyyMMdd: hhmmss'));
  sheet.appendRow([timestamp, ts,reaction,channel,user_item,user,type])
}

//addReaction関数が正常に動くかのテスト
function tester(){
  addReaction("1662651643.944659","C03NANWSP8A",vote2)
}


function addReaction(ts,channel,emojis){
  const url = "https://slack.com/api/reactions.add";
  const token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  const method = 'post';
  var payload = {
    'token'      : token,
    'channel'    : channel,
    'timestamp'  : ts,
  };
  var params = {
    'method': method,
    'payload': payload
  };
  // 追加対象のemoji

  for (var i = 0; i < emojis.length; i++) {
    Utilities.sleep(300);
    payload.name = emojis[i];
    UrlFetchApp.fetch(url, params);
  }
}

function tester3(){
  removeReaction("C03NANWSP8A","1662452797.957969",gorigori)
}

function removeReaction(ts,channel,emojis){
  const url = "https://slack.com/api/reactions.remove";
  const token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  const method = 'post';

  var payload = {
    'token'      : token,
    'channel'    : channel,
    'timestamp'  : ts,
  };
  var params = {
    'method' : method,
    'payload' : payload
  };

  for (var i = 0; i < emojis.length; i++) {
    Utilities.sleep(300);
    payload.name = emojis[i];
    UrlFetchApp.fetch(url, params);
  }
}



function addandremovereaction(ts,channel,emojis){
  const url = "https://slack.com/api/reactions.add";
  const token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  const method = 'post';
  var payload = {
    'token'      : token,
    'channel'    : channel,
    'timestamp'  : ts,
  };
  var params = {
    'method': method,
    'payload': payload
  };
  // 追加対象のemoji
  for (var i = 0; i < emojis.length; i++) {
    Utilities.sleep(300);
    payload.name = emojis[i];
    UrlFetchApp.fetch(url, params);
  }

  const url2 = "https://slack.com/api/reactions.remove";
  for (var i = 0; i < emojis.length; i++) {
    Utilities.sleep(300);
    payload.name = emojis[i];
    UrlFetchApp.fetch(url2, params);
  }
}