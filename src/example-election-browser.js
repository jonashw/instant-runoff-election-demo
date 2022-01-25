import React from "react";
import { performInstantRunoff } from "./instant-runoff";
import ElectionDisplay from "./election-display";
import { getExampleElections } from "./firebase-adapter";
import { useParams, NavLink } from "react-router-dom";
import { QuickInfo } from "./ui";

export default ({}) => {
    let params = useParams();
    const [sampleElections, setSampleElections] = React.useState([]);
    const [selectedElection, setSelectedElection] = React.useState(undefined);
    React.useEffect(() => {
        const load = async () =>
        {
            let elections = await getExampleElections();
            console.log('elections from firebase',elections);
            let sampleElections = elections.map(e => ({
                ...e,
                result: performInstantRunoff(e.ballots.map((b,i) => ({votes: b, id: i+1})), 10)
            }));
            setSampleElections(sampleElections);
            console.log('elections from firebase',sampleElections);
        }
        load();
    }, []);

    React.useEffect(() => {
        if(params.electionId){
            let election = sampleElections.filter(e => e.id === params.electionId)[0];
            if(election){
                setSelectedElection(election);
            }
        } else {
            setSelectedElection(null);
        }
    }, [sampleElections, params.electionId]);

    return (
        <div>
            <div className="columns">
                <div className="column">
                    <QuickInfo>
                        <strong className="ml-1">Examples to illustrate RCV</strong>
                        <p className="mt-1">
                            Here are some interesting examples of how rank-choiced voting can lead to favorable outcomes in an election.
                            Each example was constructed to be as simple as possible, with a minimal number of ballots and candidates.
                        </p>
                    </QuickInfo>
                </div>
                <div className="column">
                    <aside class="menu">
                        <p class="menu-label">
                            Example Elections
                        </p>
                        <ul class="menu-list">
                            {sampleElections.map(e => 
                                <li>
                                    <NavLink 
                                        to={`/examples/${e.id}`}
                                        className={({isActive}) => isActive ? "is-active" : ""}
                                    >
                                        {e.name}
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </aside>
                </div>
            </div>
            {!!selectedElection && 
                <div>
                    <ElectionDisplay result={selectedElection.result}/>
                </div>
            }
        </div>);
};