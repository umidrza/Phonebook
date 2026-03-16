import Person from './Person';

const People = ({people, deletePerson}) => {

    return (
        <div>
            {people.map((person) =>
                <Person key={person.id} person={person} deletePerson={deletePerson}/>
            )}
        </div>
    )
}

export default People