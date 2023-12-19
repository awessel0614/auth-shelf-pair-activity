import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);
  const [newItemDescription, setNewItemDescription] = useState("")
  const [newItemURL, setNewItemURL] = useState("")

  
  const addItem = (event) => {
    event.preventDefault();
    let newItem = {
      description: newItemDescription,
      image_url: newItemURL
    }
    axios.post('/api/shelf', newItem)
      .then((response) => {
        console.log('Item successfully added!', newItem)
        setNewItemDescription("");
        setNewItemURL("");
        fetchShelf();
      }).catch((error) => {
        console.error('Error in POST to /api/shelf', error);
        alert("Something has gone wrong!");
      })
  }


  const deleteItem = (event, id) => {
    event.preventDefault();
    axios.delete(`/api/shelf/${id}`)
      .then((response) => {
        fetchShelf();
      }).catch((error) => {
        console.error(error);
        alert('Something went wrong!');
      })
  }


  const fetchShelf = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }
  useEffect(() => {
    fetchShelf();
  }, []);


  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
                    <div className="gallery">
                        <img src={item.image_url} alt={item.description} />
                        <br />
                        <div className="desc">{item.description}</div>
                        <div style={{textAlign: 'center', padding: '5px'}}>
                          <button style={{cursor: 'pointer'}} onClick={event => deleteItem(event, item.id)}>Delete</button>
                        </div>
                    </div>
                 </div>
        })
      }

      <form onSubmit={ addItem }>
        <p>Add something to the shelf!</p>
        <input 
          value = {newItemDescription} 
          onChange={event => setNewItemDescription(event.target.value)}
          placeholder="Description of photo"
          type="text"
          />
          <br></br>
        <input
          value = {newItemURL}
          onChange = {event => setNewItemURL(event.target.value)}
          placeholder="Enter URL here"
          type="text"
        />
        <br></br>
        <button type='submit'>Submit</button>  
      </form>

      <div className="clearfix"></div>
    </div>
  );
}

export default ShelfPage;
