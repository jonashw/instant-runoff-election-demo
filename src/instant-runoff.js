const removeLoser = (losers,ballots) => {
  //console.log(`advancing ballots for "${losers[losers.length-1]}"`);
  const newBallots = ballots.map(ballot => {
    var nextVotes = ballot.votes.slice(0);
    while(losers.indexOf(nextVotes[0]) > -1 && nextVotes.length > 0){
      nextVotes.shift();
    }
    //console.log(`nextVote=${nextVote} loser=${loser} same? = ${nextVote === loser}`);
    return {...ballot, votes: nextVotes };
  });

  return newBallots.filter(b => b.votes.length > 0);
};

const calculateLeaders = (votes) => {
  let counted = votes.reduce((leaders, c) => {
    let l = leaders[c] || 0;
    leaders[c] = l + 1;
    return leaders;
  }, {});
  return Object.entries(counted)
    .map(([candidate, voteCount]) => ({
      candidate: candidate === "null" ? null : candidate,
      voteCount,
      votePercentage: (voteCount / votes.length) * 100
    }))
    .sort((a, b) => b.voteCount - a.voteCount);
};

var performInstantRunoff = (ballots, maxRunOffs) => {
	if(ballots.length === 0 ){
		return [];
	}
  var runOff = step => {
    var losers = [...step.losers, step.leaders[step.leaders.length-1].candidate];
    var nextBallots = removeLoser(losers,step.ballots);
    var leaders = calculateLeaders(nextBallots.map(b => b.votes[0]));
    return {
      ballots: nextBallots,
      losers,
      leaders
    };
  };

  var runOffs = [
    {
      ballots,
      losers: [],
      leaders: calculateLeaders(ballots.map(b => b.votes[0]))
    }
  ];
  for(var i=0; i<maxRunOffs; i++){
    var lastRound = runOffs[runOffs.length - 1];
    if(!!lastRound.leaders[0] && lastRound.leaders[0].votePercentage < 50){
      runOffs.push(runOff(lastRound));
    }
  }
  return runOffs;
};

export {performInstantRunoff};