let words = JSON.parse(localStorage.getItem("words")) || [

{
word:"Apple",
meaning:"सेब",
pronunciation:"Ap-puhl"
},

{
word:"Book",
meaning:"किताब",
pronunciation:"Buk"
},

{
word:"Friend",
meaning:"दोस्त",
pronunciation:"Frend"
},

{
word:"Teacher",
meaning:"शिक्षक",
pronunciation:"Tee-cher"
},

{
word:"School",
meaning:"विद्यालय",
pronunciation:"Skoo-l"
}

];

let current=0;
let learned = 0;

const word=document.getElementById("word");
const meaning=document.getElementById("meaning");
const pronunciation=document.getElementById("pronunciation");
const answer=document.getElementById("answer");

function saveData(){
localStorage.setItem("words",JSON.stringify(words));
}

function displayWord(){

word.innerHTML=words[current].word;

meaning.innerHTML=words[current].meaning;

pronunciation.innerHTML=words[current].pronunciation;

answer.classList.add("hidden");

displayList();

saveData();

}

document.getElementById("showBtn").onclick=function(){

answer.classList.remove("hidden");

if(learned<words.length){

learned++;

}

updateProgress();

}

document.getElementById("nextBtn").onclick=function(){

current++;

if(current>=words.length){

current=0;

}

displayWord();

}

document.getElementById("prevBtn").onclick=function(){

current--;

if(current<0){

current=words.length-1;

}

displayWord();

}

function addWord(){

const w=document.getElementById("newWord").value.trim();

const m=document.getElementById("newMeaning").value.trim();

const p=document.getElementById("newPronunciation").value.trim();

if(w==""||m==""||p==""){

alert("Please fill all fields");

return;

}

words.push({

word:w,

meaning:m,

pronunciation:p

});

document.getElementById("newWord").value="";
document.getElementById("newMeaning").value="";
document.getElementById("newPronunciation").value="";

displayWord();

}

function deleteWord(index){

words.splice(index,1);

if(current>=words.length){

current=0;

}

displayWord();

}

function displayList(){

const list=document.getElementById("wordList");

list.innerHTML="";

words.forEach((item,index)=>{

list.innerHTML+=`

<div class="word-item">

<span>${item.word}</span>

<button class="delete-btn" onclick="deleteWord(${index})">

Delete

</button>

</div>

`;

});

}

displayWord();

let score = 0;

let currentQuiz = 0;

function shuffle(array){

return array.sort(()=>Math.random()-0.5);

}

function loadQuiz(){

if(words.length<4){

document.getElementById("quizQuestion").innerHTML="Add at least 4 words for Quiz.";

return;

}

currentQuiz=Math.floor(Math.random()*words.length);

const correct=words[currentQuiz];

document.getElementById("quizQuestion").innerHTML=

"What is the meaning of <b>"+correct.word+"</b>?";

let options=[correct.meaning];

while(options.length<4){

let random=words[Math.floor(Math.random()*words.length)].meaning;

if(!options.includes(random)){

options.push(random);

}

}

options=shuffle(options);

const optionBox=document.getElementById("options");

optionBox.innerHTML="";

options.forEach(option=>{

optionBox.innerHTML+=`

<button class="option-btn"

onclick="checkAnswer('${option}','${correct.meaning}')">

${option}

</button>

`;

});

}

function checkAnswer(selected,correct){

if(selected===correct){

document.getElementById("result").innerHTML="✅ Correct!";

score++;

}else{

document.getElementById("result").innerHTML="❌ Wrong!";

}

document.getElementById("score").innerHTML=score;

}

function nextQuiz(){

document.getElementById("result").innerHTML="";

loadQuiz();

}

loadQuiz();
updateProgress();

function updateProgress(){

let percentage=(learned/words.length)*100;

document.getElementById("progressBar").style.width=percentage+"%";

document.getElementById("progressText").innerHTML=
learned+" / "+words.length+" Words Learned";

}