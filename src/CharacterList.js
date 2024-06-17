import { useState } from 'react';
import characterData from './characters';
import Character from './Character';
import CharacterDetail from './CharacterDetail';

const CharacterList = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(false);

    if (selectedCharacter) {
        return (
            <CharacterDetail character={selectedCharacter}
                setSelectedCharacter={setSelectedCharacter} />
        )
    }
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
            {characterData.map(character => (
                <Character character={character}
                    setSelectedCharacter={setSelectedCharacter} />))}
        </div>
    )
}

export default CharacterList;