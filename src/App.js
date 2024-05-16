import React, { useState } from 'react';
import './App.css';
function App() {
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track the index of the item being edited
  const [editText, setEditText] = useState(''); // Track the edited text

  // Function to handle changes in the textarea
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  // Function to handle saving an item
  const handleAddItem = () => {
    if (message.trim() !== '') {
      setItems([...items, { text: message, completed: false }]);
      setMessage('');
    }
  };

  // Function to handle removing an item
  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  // Function to handle completing an item
  const handleCompleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems[index].completed = true;
    setItems(updatedItems);
    setCompletedItems([...completedItems, updatedItems[index]]);
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  // Function to handle updating an item
  const handleUpdateItem = (index) => {
    setEditIndex(index); // Set the index of the item being edited
    setEditText(items[index].text); // Set the text of the item being edited
  };

  // Function to handle saving the updated item
  const handleSaveUpdateItem = (index) => {
    const updatedItems = [...items];
    updatedItems[index].text = editText;
    setItems(updatedItems);
    setEditIndex(null); // Reset the edit index
    setEditText(''); // Reset the edit text
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className='col mt-4'>TO DO LIST</h1>
        <textarea
          className='col mt-2'
          id="textbox"
          rows="1"
          cols="40"
          placeholder="Write your item here..."
          value={message}
          onChange={handleChange}
        /><br/><br/>
        <button className='col mx-4 black-box' onClick={handleAddItem}>Add item</button>
        <div className="col mt-4">
          {items.map((item, index) => (
            <div key={index} className={`item-box ${item.completed ? 'completed' : ''}`}>
              <span>{index + 1}. </span> {/* Display the item number */}
              {editIndex === index ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.text}</span>
              )}
              <button className="mx-2 black-box" onClick={() => handleRemoveItem(index)}>❌</button>
              {!item.completed && <button className="mx-2 black-box" onClick={() => handleCompleteItem(index)}>✔️</button>}
              {!item.completed && (
                editIndex === index ? (
                  <button className="mx-2 black-box" onClick={() => handleSaveUpdateItem(index)}>✏️</button>
                ) : (
                  <button className="mx-2 black-box" onClick={() => handleUpdateItem(index)}>✏️</button>
                )
              )}
            </div>
          ))}
        </div>
        <div className="col mt-4">
          {completedItems.map((item, index) => (
            <div key={index} className="item-box completed">
              <span style={{ textDecoration: 'line-through' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
