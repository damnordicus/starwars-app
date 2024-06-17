// import React, { useState, useEffect } from "react";

// const CharacterFetch = ({ characterAPI }) => {
//     const [characterData, setCharacterData] = useState([]);

//     useEffect(() => {
//         if (characterAPI) {
//             fetch('https://akabab.github.io/starwars-api/api/all.json')
//                 .then((res) => res.json())
//                 .then((data) => {
//                     setCharacterData(data); // set the fetched plante data
//                 })
//         }

//     }, [characterAPI]);


// };

// if (characterAPI === null) {
//     return <p>...Loading</p>;
// };

// let testName = 'Darth Vader';
// let inputName = '';
// let i = 0;

// while(testName != inputName){
//     inputName = data[i].name;
//     i++;
// }
// i--;
// return (data[i].image)

// export default CharacterFetch;