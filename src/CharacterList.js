import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import characterData from './characters';
import Character from './Character';
import CharacterDetail from './CharacterDetail';

const CharacterList = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(false);
    const navigate = useNavigate();

    if (selectedCharacter) {
        return (
            <CharacterDetail character={selectedCharacter}
                setSelectedCharacter={setSelectedCharacter} />
        )
    }

    const handleCloseClick = (e) => {
        e.stopPropagation(); // Prevent the click event from propagating to the parent element
        // if (planetName) {
            navigate("/");
        // }
        // setShowPlanetInfo(false);
    };

    return (
        <div className="character-list"
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
            <button
                onClick={handleCloseClick}
                style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    backgroundColor: "transparent",
                    border: "none",
                    color: "white",
                    fontSize: "20px",
                    cursor: "pointer",
                }}
            >
                ×
            </button>
            {characterData.map(character => (
                <Character character={character}
                    setSelectedCharacter={setSelectedCharacter} />))}
        </div>
    )
}

export default CharacterList;