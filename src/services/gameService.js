const baseUrl = 'http://localhost:3030';

export const getAll= ()=>{
    //tova trqbva da vurne promis(v koito da stoi LatestGames v json format, otgovornost na servera)
   return fetch(`${baseUrl}/data/games`)
   .then(response=> response.json());
}