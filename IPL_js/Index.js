let csvToJson = require('convert-csv-to-json');
let matches = csvToJson.fieldDelimiter(',').getJsonFromCsv('/home/abhishek/Desktop/IPL_js/matches.csv');
let deliveries = csvToJson.fieldDelimiter(',').getJsonFromCsv('/home/abhishek/Desktop/IPL_js/deliveries.csv');

findMatchesPlayedPerSeason();
findWinnerByTeam();
top10EconomicalBowlersInTheYear2015();
findPLayerOfTHeMatchPerYear();
findTHeExtraRunsConceededByTeamPerSeason2016();

function findMatchesPlayedPerSeason(){
    let mp = new Map
    matches.forEach(i => {
        if(mp.has(i.season)){
            let count = mp.get(i.season);
            mp.set(i.season,count+1)
        }
        else{
            mp.set(i.season,1)
        }
    })
    console.log(mp)
}



function findWinnerByTeam(){
    let mp = new Map
matches.forEach(i => {
    if(mp.has(i.winner)){
        let count = mp.get(i.winner);
        mp.set(i.winner,count+1)
    }
    else{
        mp.set(i.winner,1)
    }
})
console.log(mp)
}


function top10EconomicalBowlersInTheYear2015() {
    let matchIdSet = new Set();
    for (let index = 0; index < matches.length; index++) {
        if (matches[index].season == '2015') {
            const matchId = matches[index].id;
            matchIdSet.add(matchId);
        }
    }

    let bowlersAndBalls = new Map();
    let bowlersAndConcededRuns = new Map();

    for (let index = 0; index < deliveries.length; index++) {

        let matchId = deliveries[index].match_id;

        if (matchIdSet.has(matchId)) {
            let bowlerName = deliveries[index].bowler;
            let runs = Number(deliveries[index].total_runs);
            let ball = (deliveries[index].extra_runs == '0') ? 1 : 0;

            if (bowlersAndBalls.has(bowlerName)) {
                let ballsThrown = Number(bowlersAndBalls.get(bowlerName));
                ballsThrown += ball; 
                bowlersAndBalls.set(bowlerName, ballsThrown);

                let totalRuns = bowlersAndConcededRuns.get(bowlerName);
                totalRuns += runs;
                bowlersAndConcededRuns.set(bowlerName, totalRuns); 
            } else {
                bowlersAndBalls.set(bowlerName, ball);
                bowlersAndConcededRuns.set(bowlerName, runs);

            }
        }
    }
    let bowlersAndEconomy = new Map(); 
    bowlersAndBalls.forEach((value, key)=>{
        let bowlerName = key; 
        let balls = value; 
        let over = balls/6; 
        let runs = bowlersAndConcededRuns.get(bowlerName); 
        let economy = runs/over; 

        bowlersAndEconomy.set(bowlerName, economy); 
    })

    bowlersAndEconomy = new Map([...bowlersAndEconomy.entries()].sort((a, b) => a[1] - b[1])); 

    console.log("List of top 10 economic bowlers of year 2015 : " ); 
    let counter = 1;
    for (const [key, value] of bowlersAndEconomy)
    {
        if (counter > 10)
            break; 
        console.log(key , " " , value); 
        counter++; 
    }

}

function findTHeExtraRunsConceededByTeamPerSeason2016(){
    let mp = new Map
    var ar = []
    matches.forEach(i => {
    if((i.season) == 2016){
        ar.push(Number(i.id))
    }
})

    deliveries.forEach(i => {
        if(ar.includes(Number(i.match_id))){
            if(mp.has(i.batting_team)){
                var extraRun = mp.get(i.batting_team)
                mp.set(i.batting_team,extraRun+Number((i.extra_runs)))
            
            }
            else{
                mp.set(i.batting_team,(Number(i.extra_runs)))
            }
        }
    })

    console.log(mp);
}

function findPLayerOfTHeMatchPerYear(){
let mp = new Map
matches.forEach(i => {
    if(mp.has(i.player_of_match)){
        let count = mp.get(i.player_of_match);
        mp.set(i.player_of_match,count+1)
    }
    else{
        mp.set(i.player_of_match,1)
    }
})
console.log(mp)
}



 
