
const prefix = "!";

function getWeatherImage(area) {
  try {
    const uk = "Xo5bJRh7ab1BvzuXlkfaagAAALY";
    let url = "search?w=tot&q=" + encodeURIComponent(area + " 날씨");
    let location = "https://m.search.daum.net/" + url;
    let res = String(org.jsoup.Jsoup.connect(location).cookies({uvkey: uk}).get());
    const mk = res.split("var mk = \"")[1].split("\"")[0];
    const id = res.split("\"id\":\"")[1].split("\"")[0];
    const code = res.split("\"lcode\":\"")[1].split("\"")[0];
    url = "qsearch?mk=" + mk + "&uk=" + uk + "&q=" + encodeURIComponent(area + " 날씨") + "&w=weather&m=balloon&lcode=" + code + "&id=" + id + "&viewtype=json";
    location = "https://m.search.daum.net/" + url;
    res = org.jsoup.Jsoup.connect(location).cookies({uvkey: uk}).ignoreContentType(true).get().text();
    return JSON.parse(res).RESULT.WEATHER_BALLOON.result;
  } catch(e) {
    return "없는 지역 입니다.";
  }
}

function runpy(src) {
  const res = org.jsoup.Jsoup.connect("https://tpcg1.tutorialspoint.com/tpcg.php").requestBody("lang=python&device=&code=" + encodeURIComponent(src.replace(/ /g, "+")) + "&stdinput=&ext=py&compile=0&execute=python+main.py&mainfile=main.py&uid=5610580").post().text().replace("$python main.py", "");
  return res;
}

function run(msg, type) {
  switch(type) {
    case 0:
      return getWeatherImage(msg);
    case 1:
      const result = runpy(msg).trim();
      if (result == "")
      return "No Result";
      else return result;
  }
}

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if (msg.startsWith(prefix)) {
    const command = msg.split(prefix)[1].split(" ")[0];
    const message = msg.split(" ")[1];
    switch (command) {
      case "날씨":
        replier.reply(run(message, 0));
        break;
      case "runpy":
        replier.reply("현재 사용이 불가능 합니다.");
        break;
    }
  }
}
