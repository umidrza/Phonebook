
const Person = ({ person, deletePerson }) => {
    return (
        <div>
            <span>{person.name} {person.number} </span> 
            <button onClick={() => deletePerson(person.id)}>Delete</button>
        </div>
    )
}

export default Person