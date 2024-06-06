let music=document.getElementById('myAudio1');
let winmusic=document.getElementById('myAudio2');
let gboard=document.querySelector(".board");
let pchoose=document.querySelector(".pchoose");
let boxes=document.querySelectorAll(".cell")
let turnX=null;
let x=document.querySelector("#X");
let o=document.querySelector("#O");
let clickCount=0;
let reset=document.querySelector("#resetButton");
let winmessage=document.querySelector(".winmessage");
let head=document.querySelector("h1");

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];


pchoose.addEventListener('click',(e)=>
{
    if(e.target!=pchoose)
        {
            if(e.target.id=="X"&&x.textContent=="player X")
                {
                 turnX=true;
                 x.style.cssText="background-color: rgb(4, 202, 251);color: darkred;"
                 o.style.cssText=` padding: 2vmin 2vmin;
                 border-radius: 10vmin;
                 color: rgb(32, 180, 19);
                 font-size: 3vmin;
                 background-color: #4e4949;
                 font-weight: 700;`;
                 x.textContent="Player X";
                 o.textContent="Player O";
                 music.play();
                }
            if(e.target.id=="O"&&o.textContent=="player O")
            {
                turnX=false;
                o.style.cssText="background-color: rgb(4, 202, 251);color: darkred;"
                x.style.cssText=` padding: 2vmin 2vmin;
                border-radius: 10vmin;
                color: rgb(32, 180, 19);
                font-size: 3vmin;
                background-color: #4e4949;
                font-weight: 700;`;
                o.textContent="Player O";
                x.textContent="Player X";
                music.play();
            }
        }
});

        gboard.addEventListener('click',(e)=>
            {
               if(e.target!=gboard&&turnX!=null)    /*important turnX!=null*/
                {
                    clickCount++;
                    let selectedCell=document.getElementById(e.target.id);
                    if(turnX&&selectedCell.textContent=="")
                        {
                            selectedCell.textContent="X";
                            turnX=false;
                            music.play();
                        }
                        else
                        {
                            if(selectedCell.textContent=="")
                                {
                                    selectedCell.textContent="O";
                                    turnX=true;
                                    music.play();
                                }
                        }
                } 
                if(clickCount>8 && !(checkWinner()))
                    {
                        winmessage.style.cssText="font-size:3rem;display:block";
                        winmessage.textContent="Game Draw";
                        head.style.cssText="display:none";
                        clickCount=0;
                    }  
                    let winner=checkWinner();
                    if(winner!=undefined)
                        {
                        winmessage.style.cssText="font-size:3rem;display:block";
                        winmessage.textContent= winner+ ' is Winner'; 
                        head.style.cssText="display:none";
                        winmusic.play();
                        }
                          
                        if(winner) 
                       {
                        for(let i=0;i<9;i++)
                            {
                                if(boxes[i].textContent=="")
                                    {
                                        boxes[i].textContent=".";
                                        boxes[i].style.cssText="font-size:0px"
                                    }
                            } 
                       }      
            });

           
                  
            const checkWinner = () => {
                for (let pattern of winPatterns) {
                  let pos1Val = boxes[pattern[0]].innerText;
                  let pos2Val = boxes[pattern[1]].innerText;
                  let pos3Val = boxes[pattern[2]].innerText;
              
                  if (pos1Val != "" && pos2Val != "" && pos3Val != "")
                {
                    if (pos1Val === pos2Val && pos2Val === pos3Val) 
                    {
                     
                      return pos1Val;
                    }
                }
              
                }
              };

              
              
              reset.addEventListener("click",(e)=>
            {
                 o.style.cssText=`  padding: 2vmin 2vmin;
                 border-radius: 10vmin;
                 color: rgb(32, 180, 19);
                 font-size: 3vmin;
                 background-color: #4e4949;
                 font-weight: 700;`;
                 x.style.cssText=`  padding: 2vmin 2vmin;
                 border-radius: 10vmin;
                 color: rgb(32, 180, 19);
                 font-size: 3vmin;
                 background-color: #4e4949;
                 font-weight: 700;`;
                 x.textContent="player X";
                 o.textContent="player O";
                 head.style.cssText="display:inline-flex";
                 winmessage.style.cssText="font-size:3rem;display:none";
                 for(let i=0;i<9;i++)
                    {
                        boxes[i].textContent='';
                    }
                 turnX=null;
            })