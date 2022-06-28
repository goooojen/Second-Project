//랜덤번호 지정
//번호입력 and go라는 버튼을 누름
//만약 유저가 랜덤 번호를 맞추면,  맞췄습니다!
//랜덤번호 < 유저번호 down!
//랜덤번호 > 유저번호 UP!
//reset버튼을 누르면 게임이 리셋
// 5번의 기회를 다쓰면 게임이 끝난다 (버튼 disable)
//유저가 1-100범위 밖 숫자를 입력하면 알림 + 기회 깍지 않음
//유저가 이미 입력한 숫자를 또 입력하면 알림 + 기회 깍지 않음

let computerNum = 0
let PlayButton = document.getElementById("Play-button");
console.log(PlayButton);
let input = document.getElementById("user-input");
let result = document.getElementById("result-area");
let ResetButton = document.getElementById("Reset-button");
let chance = 5
let chanceArea = document.getElementById("chances-area");
let GameOver = false;
let hist = []

PlayButton.addEventListener("click",play);
ResetButton.addEventListener("click",reset);
input.addEventListener("focus",function(){input.value="";});

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답",computerNum);
}


function play(){
    let UserValue = input.value;

    if(UserValue<1 || UserValue>100){
        result.textContent = "1에서 100사이를 입력해주세요"
        return;
    }

    if(hist.includes(UserValue)){
        result.textContent = "이미 입력한 값입니다."
        return;
    }

    chance -- ;
    chanceArea.textContent = `${chance}`;
    console.log("찬스",chance);


if(UserValue < computerNum){
    result.textContent = "UP!!!"
}
    else if(UserValue > computerNum){
        result.textContent = "Down!!"
    }
    else{
        result.textContent = "That's right!"
        GameOver == true
    }

    hist.push(UserValue);
    console.log(hist)

    if(chance < 1){
        GameOver = true
    }

    if(GameOver == true){
        PlayButton.disabled = true 
    }
}

function reset(){
    input.value = ""
    pickRandomNum()
    result.textContent = "결과값이 나옵니다!"
}


pickRandomNum();

