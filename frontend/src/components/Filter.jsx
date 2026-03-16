
const Filter = ({filterValue, setFilterValue}) => {

    return (
        <div>
            <p>filter shown with</p>
            <input value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />
        </div>
    )
}

export default Filter