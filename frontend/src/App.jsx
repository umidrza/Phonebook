import { useEffect, useState } from 'react'
import phonebookService from './services/phonebook';
import PersonForm from './components/PersonForm';
import People from './components/People';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
    const [people, setPeople] = useState([]);
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterValue, setFilterValue] = useState('');
    const [notification, setNotification] = useState({ message: null })

    useEffect(() => {
        phonebookService.getAll().then((data) => {
            setPeople(data);
        })
    }, []);

    function filterPeople() {
        const filter = filterValue.toLowerCase();
        return people.filter(p => p.name.toLowerCase().includes(filter) || p.number.includes(filter));
    }

    const clearForm = () => {
        setNewName('')
        setNewNumber('')
    }


    function addNewPerson(e) {
        e.preventDefault();
        const existingPerson = people.find((p) => p.name === newName)

        if (existingPerson) {
            const res = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);

            if (res) {
                updatePerson(existingPerson.id);
            }

            return;
        }

        const newPerson = {
            name: newName,
            number: newNumber
        }

        phonebookService.create(newPerson)
            .then((data) => {
                setPeople([...people, data]);
                notifyWith(`Added ${data.name}`);
                clearForm();
            })
            .catch(error => {
                notifyWith(error.response.data.error, true)
            })
    }

    function updatePerson(id) {
        const updatedPerson = {
            id: id,
            name: newName,
            number: newNumber
        }

        phonebookService.update(id, updatedPerson)
            .then((data) => {
                const updatedPeople = people.map(p => p.id === id ? data : p);
                setPeople(updatedPeople);
                notifyWith(`Phonenumber of ${data.name} updated!`)
                clearForm();
            })
            .catch(error => {
                notifyWith(error.response.data.error, true)
            })
    }

    function deletePerson(id) {
        const person = people.find(p => p.id === id);
        const res = confirm(`Delete ${person.name} ?`);
        if (!res) return;

        phonebookService.remove(id)
            .then(() => {
                const updatedPeople = people.filter(p => p.id !== id);
                setPeople(updatedPeople);
                notifyWith(`Deleted ${person.name}`);
            })
            .catch(error => {
                notifyWith(error.response.data.error, true)
            });
    }

    const notifyWith = (message, isError = false) => {
        setNotification({ message, isError })
        setTimeout(() => {
            setNotification({ message: null })
        }, 5000)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notification={notification} />

            <Filter filterValue={filterValue} setFilterValue={setFilterValue} />

            <PersonForm addNewPerson={addNewPerson}
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
            />

            <h2>Numbers</h2>

            <People people={filterPeople()} deletePerson={deletePerson} />
        </div>
    )
}

export default App