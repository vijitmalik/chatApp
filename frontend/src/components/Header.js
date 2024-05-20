
const Header = ({ setShowModal }) => {

    return (
        <header className="app-header">
            <div>The Chat Room</div>
            <button onClick={() => setShowModal(true)}>Add Record</button>
            <button>Show Chat Box</button>
        </header>
    )

}

export default Header;
