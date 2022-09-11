document.getElementById("btn").addEventListener("click", clickText);
document.getElementById("guess").addEventListener("click", clickGuess);
document.getElementById("skip").addEventListener("click", clickSkip);


var streaks = parseInt(sessionStorage.getItem('streaks'), 10) || 0;
document.getElementById("htmlStreak").innerHTML = "Current Streak: " + streaks;
var count = 1;
var sec = 2;
var delay = 2000;
var seeker = random(20, 0);
var prog = 20;



function random(max, min) {
  var a = Math.floor(Math.random() * (max - min)) + min;
  return a
}

async function getData(song) {

  let url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=artist:"kanye_West" track:"${song}"`;
  console.log(url);
  let data = await fetch(url).then(res => res.json());
  return data.data[0];
}

async function loadSongs() {
  const response = await fetch('songs.json');
  const songs = await response.json();

  return songs
}

function clickText() {
  this.disabled = true;
  var sound = new Howl({
    src: [x.preview],
    volume: 0.5,
    html5: true,
  });
  sound.seek(seeker);
  sound.play();
  sound.fade(0.5, 0.4, delay);
  console.log("current delay", delay);


  sound.on('fade', function () {
    sound.stop();
    console.log("ended");
  });
}

function clickGuess() {
  var guess = document.getElementById("kanye_songs");
  let selectedValue = $("select option:selected").text();
  console.log(selectedValue);
  if (selectedValue == str) {
    console.log("true");
    document.getElementById("guess" + count).innerHTML = selectedValue;
    document.getElementById("result" + count).innerHTML = "Correct";
    sessionStorage.setItem('streaks', ++streaks);
    setTimeout(function () {
      window.location.reload();
    }, 2000);

  }

  else {
    delay = delay + 2000;
    prog = prog + 25;
    sec = sec + 2;
    document.getElementById("guess" + count).innerHTML = selectedValue;
    document.getElementById("result" + count).innerHTML = "False";
    $(".progress-bar").css("width", prog + "%").text(sec + "s");
    btn.disabled = false;
    count = count + 1
    if (count == 5) {
      setTimeout(function () {
        window.location.reload();
      }, 2000);

    }
  }
}

function clickSkip() {
  delay = delay + 2000;
  prog = prog + 20;
  sec = sec + 2;
  document.getElementById("guess" + count).innerHTML = "No Guess";
  document.getElementById("result" + count).innerHTML = "False";
  $(".progress-bar").css("width", prog + "%").text(sec + "s");
  btn.disabled = false;
  count = count + 1

}



$(".progress-bar").css("width", prog + "%").text("2s");
var songs = await loadSongs();
console.log(songs);
let str = Object.values(songs[random(181, 0)]);
console.log(str);

let x = await getData(str);
console.log(x.preview);


let dropdown = $('#kanye_songs');
dropdown.empty();
dropdown.append('<option selected="true" disabled>Choose Song</option>');
dropdown.prop('selectedIndex', 0);
const url = 'songs.json';
$.getJSON(url, function (data) {
  $.each(data, function (key, entry) {
    dropdown.append($('<option></option>').attr('value', entry.songs).text(entry.songs));
  })
});
console.log(streaks);