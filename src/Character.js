

const Character = ({character, setSelectedCharacter }) => {

    return (
        <div className = "character" onClick={()=>{setSelectedCharacter(character)}}>
            {character.name}

        </div>
    )
}

export default Character;