// ---------------- GLOBAL STATE ----------------

// remaining time in seconds (default 25 minutes)
let timeLeft = 1500;

// holds the running timer
let timerInterval = null;

// tells if timer is paused
let isPaused = false;

// file where sessions are stored
const STORAGE_FILE = "sessions.json";


// ---------------- APP INITIALIZATION ----------------

async function init(){

    // connect web UI with Neutralino runtime
    Neutralino.init();

    // show starting time
    updateDisplay();

    // load previous sessions from disk
    await loadSessions();

    // start RAM monitor
    startResourceMonitor();
}


// ---------------- TIMER DISPLAY ----------------

function updateDisplay(){

    // convert seconds to minutes and seconds
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;

    // format time like 05:09
    const timeString =
        `${mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`;

    // update timer text on screen
    document.getElementById("time").innerText = timeString;

    // update window title
    Neutralino.window.setTitle(`Focus: ${timeString}`);
}


// ---------------- TIMER CONTROL ----------------

function getMinutesInput(){

    // read user input
    let minutes =
        parseInt(document.getElementById("minutesInput").value);

    // fallback if input invalid
    if(isNaN(minutes) || minutes < 1){
        minutes = 25;
    }

    return minutes;
}


async function startTimer(){

    // prevent multiple timers
    if(timerInterval) return;

    // set timer if not paused
    if(!isPaused){
        timeLeft = getMinutesInput() * 60;
    }

    setStatus("Focusing...", "#38bdf8");

    // countdown every second
    timerInterval = setInterval(async () => {

        timeLeft--;

        updateDisplay();

        // when time reaches zero
        if(timeLeft <= 0){
            await handleSessionComplete();
        }

    },1000);
}


function resetTimer(){

    // stop timer
    clearInterval(timerInterval);

    timerInterval = null;

    isPaused = false;

    // reset time to user input
    timeLeft = getMinutesInput() * 60;

    setStatus("Ready to Focus");

    updateDisplay();
}


// ---------------- STATUS HANDLING ----------------

function setStatus(text,color){

    const status = document.getElementById("status");

    // update status text
    status.innerText = text;

    // update color if provided
    if(color){
        status.style.color = color;
    }
}


// ---------------- SESSION COMPLETE ----------------

async function handleSessionComplete(){

    // stop timer
    clearInterval(timerInterval);
    timerInterval = null;

    isPaused = false;

    // play alarm safely
    const alarm = document.getElementById("alarmSound");

    if(alarm){
        alarm.currentTime = 0;
        alarm.play().catch(()=>{});
    }

    // show desktop notification
    await Neutralino.os.showNotification(
        "Session Complete!",
        "Great work! Your focus session has been saved."
    );

    setStatus("Break Time","#22c55e");

    // save session to disk
    await saveSession();
}


// ---------------- FILE STORAGE ----------------

async function saveSession(){

    try{

        let history = [];

        try{

            // read existing history file
            const data =
                await Neutralino.filesystem.readFile(STORAGE_FILE);

            history = JSON.parse(data || "[]");

        }catch(e){

            // if file does not exist yet
            history = [];

        }

        // create new session object
        const newSession = {

            id: Date.now(),

            timestamp: new Date().toLocaleString(),

            duration: getMinutesInput()

        };

        history.push(newSession);

        // write updated history back to disk
        await Neutralino.filesystem.writeFile(
            STORAGE_FILE,
            JSON.stringify(history)
        );

        // update counter
        document.getElementById("sessionCount").innerText =
            history.length;

        // reload UI history
        await loadSessions();

    }
    catch(err){

        console.error("Filesystem Error:",err);

    }
}


async function loadSessions(){

    const list = document.getElementById("history");

    try{

        const data =
            await Neutralino.filesystem.readFile(STORAGE_FILE);

        const history =
            JSON.parse(data || "[]").reverse();

        // show last 5 sessions
        list.innerHTML =
            history.slice(0,5).map(s=>`

            <li>
                <span>📅 ${s.timestamp}</span>
                <span class="count-chip">${s.duration}m</span>
            </li>

        `).join("");

        document.getElementById("sessionCount").innerText =
            history.length;

    }
    catch(e){

        // no sessions yet
        list.innerHTML =
            "<li>No sessions yet. Ready to start?</li>";

    }
}


// ---------------- SYSTEM MONITOR ----------------

async function startResourceMonitor(){

    setInterval(async()=>{

        try{

            // get system RAM info
            const ram =
                await Neutralino.computer.getMemoryInfo();

            const used =
                Math.round((ram.total - ram.available) / ram.total * 100);

            document.getElementById("ramUsage").innerText =
                `System Load: ${used}% RAM | Native API Connected`;

        }
        catch(e){

            document.getElementById("ramUsage").innerText =
                "System Load: Not available on this OS";

        }

    },5000);
}


// ---------------- START APP ----------------

init();