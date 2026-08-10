const players = {
  Clarence:{wins:0,losses:0},
  Zeke:{wins:0,losses:0},
  Kyzer:{wins:0,losses:0},
  Josh:{wins:0,losses:0}
};

let history = [];

function getScore(id){
  return parseInt(document.getElementById('score'+id).textContent,10);
}

function setScore(id,val){
  document.getElementById('score'+id).textContent = Math.max(0,Math.min(99,val));
}

function changeScore(id,delta){
  setScore(id,getScore(id)+delta);
}

function resetScores(){
  setScore(1,0);
  setScore(2,0);
}

function submitMatch(){
  const p1 = document.getElementById('player1').value;
  const p2 = document.getElementById('player2').value;
  if(p1===p2){
    alert('Please select two different players.');
    return;
  }
  const s1 = getScore(1);
  const s2 = getScore(2);
  if(s1===s2){
    alert('Tie games are not ranked. Please finish the match.');
    return;
  }
  const winner = s1>s2 ? p1 : p2;
  const loser = s1>s2 ? p2 : p1;
  players[winner].wins++;
  players[loser].losses++;
  history.unshift(`${winner} defeated ${loser} (${s1}-${s2})`);
  if(history.length>8) history.pop();
  renderHistory();
  renderRankings();
  resetScores();
}

function renderHistory(){
  const ul = document.getElementById('history');
  ul.innerHTML = '';
  history.forEach(item=>{
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
}

function renderRankings(){
  const tbody = document.getElementById('rankings');
  tbody.innerHTML = '';
  const order = Object.entries(players).sort((a,b)=>{
    const pa = a[1];
    const pb = b[1];
    const ra = pa.wins*3 - pa.losses;
    const rb = pb.wins*3 - pb.losses;
    if(rb!==ra) return rb-ra;
    if(pb.wins!==pa.wins) return pb.wins-pa.wins;
    return a[0].localeCompare(b[0]);
  });
  const labels = ['🥇 1st','🥈 2nd','🥉 3rd','4th'];
  order.forEach(([name,data],idx)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${labels[idx]||`${idx+1}th`}</td><td>${name}</td><td>${data.wins}</td><td>${data.losses}</td>`;
    tbody.appendChild(tr);
  });
}

renderRankings();
