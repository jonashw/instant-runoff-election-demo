import React from "react";
import Ballot from "./ballot";

export default function App() {
  var choiceCount = 3;
  var candidates = "🐸,🐰,🐙,🐵,🐼,🦊,🐴".split(",").slice(0, 5);
  //🐮,🐶,,🐭
  var ballots = Array(100)
    .fill()
    .map(
      (_, i) =>
        Array(choiceCount)
          .fill()
          .reduce(
            (state) => {
              let i = Math.floor(
                Math.random() * state.availableCandidates.length
              );
              //a voter may not vote for any one candidate more than once.
              let [selectedCandidate] = state.availableCandidates.splice(i, 1);
              state.votes.push(selectedCandidate);
              return state;
            },
            {
              votes: [],
              availableCandidates: candidates.slice(0)
            }
          ).votes
    );
  var leaders = ((ballots, i) => {
    let counted = ballots.reduce((leaders, b) => {
      let c = b[i];
      let l = leaders[c] || 0;
      leaders[c] = l + 1;
      return leaders;
    }, {});
    return Object.entries(counted)
      .map(([candidate, voteCount]) => ({
        candidate,
        voteCount,
        votePercentage: (voteCount / ballots.length) * 100
      }))
      .sort((a, b) => b.voteCount - a.voteCount);
  })(ballots, 0);

  return (
    <div className="container is-fluid">
      <h1 className="title">Ranked Choice Voting</h1>
      <h2 className="subtitle">and Instant Runoff Election</h2>
      <table className="table is-striped is-fullwidth has-text-centered">
        <thead>
          <tr>
            <th>Place</th>
            <th>Candidate</th>
            <th>Votes</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((l, i) => (
            <tr>
              <td className="p-1">{i + 1}</td>
              <td>{l.candidate}</td>
              <td>{l.voteCount}</td>
              <td>{l.votePercentage.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table class="table is-striped is-fullwidth has-text-centered">
        <thead>
          <tr>
            <th className="p-1" />
            {Array(choiceCount)
              .fill()
              .map((_, i) => (
                <th className="p-1">{i + 1}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {ballots.map((b, i) => (
            <tr>
              <th className="p-1">{i + 1}</th>
              {b.map((c) => (
                <td className="p-1 is-size-1">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/*

🐻🐱🐯🐷
🙈 See-No-Evil Monkey
🙉 Hear-No-Evil Monkey
🙊 Speak-No-Evil Monkey
🐒 Monkey
🦍 Gorilla
🦧 Orangutan
🐶 Dog Face
🐕 Dog
🦮 Guide Dog
🐕‍🦺 Service Dog
🐩 Poodle
🐺 Wolf
🦊 Fox
🦝 Raccoon
🐱 Cat Face
🐈 Cat
🐈‍⬛ Black Cat
🦁 Lion
🐯 Tiger Face
🐅 Tiger
🐆 Leopard
🐴 Horse Face
🐎 Horse
🦄 Unicorn
🦓 Zebra
🦌 Deer
🦬 Bison
 Cow Face
🐂 Ox
🐃 Water Buffalo
🐄 Cow
🐖 Pig
🐗 Boar
🐽 Pig Nose
🐏 Ram
🐑 Ewe
🐐 Goat
🐪 Camel
🐫 Two-Hump Camel
🦙 Llama
🦒 Giraffe
🐘 Elephant
🦣 Mammoth
🦏 Rhinoceros
🦛 Hippopotamus
🐭 Mouse Face
🐁 Mouse
🐀 Rat
🐹 Hamster

🐇 Rabbit
🐿️ Chipmunk
🦫 Beaver
🦔 Hedgehog
🦇 Bat
 Bear
🐻‍❄️ Polar Bear
🐨 Koala
🐼 Panda
🦥 Sloth
🦦 Otter
🦨 Skunk
🦘 Kangaroo
🦡 Badger
🐾 Paw Prints
🦃 Turkey
🐔 Chicken
🐓 Rooster
🐣 Hatching Chick
🐤 Baby Chick
🐥 Front-Facing Baby Chick
🐦 Bird
🐧 Penguin
🕊️ Dove
🦅 Eagle
🦆 Duck
🦢 Swan
🦉 Owl
🦤 Dodo
🪶 Feather
🦩 Flamingo
🦚 Peacock
🦜 Parrot

🐊 Crocodile
🐢 Turtle
🦎 Lizard
🐍 Snake
🐲 Dragon Face
🐉 Dragon
🦕 Sauropod
🦖 T-Rex
🐳 Spouting Whale
🐋 Whale
🐬 Dolphin
🦭 Seal
🐟 Fish
🐠 Tropical Fish
🐡 Blowfish
🦈 Shark
🐙 Octopus
🐚 Spiral Shell
🐌 Snail
🦋 Butterfly
🐛 Bug
🐜 Ant
🐝 Honeybee
🪲 Beetle
🐞 Lady Beetle
🦗 Cricket
🪳 Cockroach
🕷️ Spider
🕸️ Spider Web
🦂 Scorpion
🦟 Mosquito
🪰 Fly
🪱 Worm
🦠 Microbe
💐 Bouquet
🌸 Cherry Blossom
💮 White Flower
🏵️ Rosette
🌹 Rose
🥀 Wilted Flower
🌺 Hibiscus
🌻 Sunflower
🌼 Blossom
🌷 Tulip
🌱 Seedling
🪴 Potted Plant
🌲 Evergreen Tree
🌳 Deciduous Tree
🌴 Palm Tree
🌵 Cactus
🌾 Sheaf of Rice
🌿 Herb
☘️ Shamrock
🍀 Four Leaf Clover
🍁 Maple Leaf
🍂 Fallen Leaf
🍃 Leaf Fluttering in Wind
🍄 Mushroom
🌰 Chestnut
🦀 Crab
🦞 Lobster
🦐 Shrimp
🦑 Squid
🌍 Globe Showing Europe-Africa
🌎 Globe Showing Americas
🌏 Globe Showing Asia-Australia
🌐 Globe with Meridians
🪨 Rock
🌑 New Moon
🌒 Waxing Crescent Moon
🌓 First Quarter Moon
🌔 Waxing Gibbous Moon
🌕 Full Moon
🌖 Waning Gibbous Moon
🌗 Last Quarter Moon
🌘 Waning Crescent Moon
🌙 Crescent Moon
🌚 New Moon Face
🌛 First Quarter Moon Face
🌜 Last Quarter Moon Face
☀️ Sun
🌝 Full Moon Face
🌞 Sun with Face
⭐ Star
🌟 Glowing Star
🌠 Shooting Star
☁️ Cloud
⛅ Sun Behind Cloud
⛈️ Cloud with Lightning and Rain
🌤️ Sun Behind Small Cloud
🌥️ Sun Behind Large Cloud
🌦️ Sun Behind Rain Cloud
🌧️ Cloud with Rain
🌨️ Cloud with Snow
🌩️ Cloud with Lightning
🌪️ Tornado
🌫️ Fog
🌬️ Wind Face
🌈 Rainbow
☂️ Umbrella
☔ Umbrella with Rain Drops
⚡ High Voltage
❄️ Snowflake
☃️ Snowman
⛄ Snowman Without Snow
☄️ Comet
🔥 Fire
💧 Droplet
🌊 Water Wave
🎄 Christmas Tree
✨ Sparkles
🎋 Tanabata Tree
🎍 Pine Decoration
*/
