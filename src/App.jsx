import { useState } from 'react';
import UserData from './routes/Register';

import UserLogin from './routes/LoginPage';
function App() {
  const [page, setPage] = useState('register')
  const [UsergivenRating, setUsergivenRating] = useState({})

  const StoreList = [
    { name: "Sanvi Collection", city: "Wagholi" },
    { name: "Hotel Rayba", city: "Pimpari Chinchwad" },
    { name: "Sanskar Garments", city: "Wakad" },
    { name: "Yummy Tummy Cafe", city: "Shivajinagar" },
    { name: "Patel ShoeHouse", city: "Hinjewadi" },
    { name: "Gayatri Medical", city: "Narayan Peth" },
    { name: "ShreeKrishn Dosa center", city: "Pashan" },
    { name: "vedika Cosmetics Store", city: "Kasba Peth" },
    { name: "Paratha House", city: "Hadapsar" },
  ]

  return (
    <div>
      {page === 'register' && (
        <UserData onSuccess={() => setPage('login')} />
      )}

      {page === 'shops' && (
        <div>
          <h1 style={{ textAlign: "center" }}>Store Review App</h1>
          <p style={{ textAlign: "center" }}>Your feedback matters! Please rate our store.</p>
          <div style={{ display: "grid", gridTemplateColumns: "3fr 3fr 3fr", gap: "15px", justifyContent: "center" }}>
            {StoreList.map((store) => (
              <div key={store.name} style={{ width: "80%", background: "white", color: "black", padding: "25px", borderRadius: "24px", border: "4px solid #ddd", textAlign: "center" }}>
                <h3>{store.name}</h3>
                <p>{store.city}</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setUsergivenRating({ ...UsergivenRating, [store.name]: star })} style={{ fontSize: "24px", border: "none", background: "none", cursor: "pointer", color: "black" }}>
                      {star <= (UsergivenRating[store.name] || 0) ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
                <p>Your Feedback: {UsergivenRating[store.name] || "You have not rated yet"}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App;