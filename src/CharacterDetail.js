

const CharacterDetail = ({ character, setSelectedCharacter }) => {

    return (
        <div className="character-detail"
            onClick={() => { setSelectedCharacter(false) }}
            style={{
                position: "absolute",
                top: 120,
                left: "2%",
                padding: "20px",
                backgroundColor: "#333",
                opacity: 0.9,
                borderRadius: "8px",
                zIndex: 1000,

                maxHeight: "80vh", // Maximum height of the dialog box
                overflowY: "auto", // Enable vertical scrolling if content exceeds max height
            }}>

            <h1>{character.name}</h1>
            <img src={character.image} width="150"></img>
            <p>Homeworld: {`${character.homeworld[0].toUpperCase()}${character.homeworld.slice(1)}`}</p>
            <p>Species: {character.species}</p>
            <p>Affiliations:
                {character.affiliations.map(elem => (
                    <ul
                        style={{ fontSize: "10pt" }}>
                        {elem}
                    </ul>
                ))}
            </p>

        </div>
    )
}

export default CharacterDetail;