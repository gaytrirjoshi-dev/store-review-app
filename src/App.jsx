import { useState } from 'react';
import UserData from './routes/Register';
import UserLogin from './routes/LoginPage';

function App() {
  const [page, setPage] = useState('register')
  const [UsergivenRating, setUsergivenRating] = useState({})

  
  const [User, setUser] = useState(null);

  
  const [allRatings] = useState([
    { storename: "Hotel Rayba", username: "Vaishnavi", rating: 5 },
    { storename: "Sannskar Garments", username: "Maithili", rating: 4 },
    { storename: "Yummy Tummy Cafe", username: "Priya", rating: 3 },
    { storename: "Patel ShoeHouse", username: "Amit", rating: 2},
    { storename: "Sanvi Collection", username: "Sneha", rating: 5 },
  ]);
  

const StoreList = [
    { storename: "Sanvi Collection", city: "Wagholi" },
    { storename: "Hotel Rayba", city: "Pimpari Chinchwad" },
    { storename: "Sanskar Garments", city: "Wakad" },
    { storename: "Yummy Tummy Cafe", city: "Shivajinagar" },
    { storename: "Patel ShoeHouse", city: "Hinjewadi" },
    { storename: "Gayatri Medical", city: "Narayan Peth" },
    { storename: "ShreeKrishn Dosa center", city: "Pashan" },
    { storename: "vedika Cosmetics Store", city: "Kasba Peth" },
    { storename: "Paratha House", city: "Hadapsar" },
  ]

  
  const OwnerStoreRatings = User?.storename
    ? allRatings.filter(r => r.store.toLowerCase() === User.storename.toLowerCase())
    : [];
  const storeratingaverage =  OwnerStoreRatings.length > 0
    ? (OwnerStoreRatings.reduce((sum, r) => sum + r.rating, 0) / OwnerStoreRatings.length).toFixed(1)
    : "0.0";

  return (
    <div>
      {page === 'register' && (
        <UserData onSuccess={() => setPage('LoginPage')} />
      )}
      {page === 'LoginPage' && (
        <UserLogin
          
          onSuccess={(user) => {
            setUser(user);
            if (user && user.role === 'owner') {
              setPage('owner-dashboard');
            } else {
              setPage('stores');
            }
          }}
          onGoRegister={() => setPage('register')}
        />
      )}

      {page === 'stores' && (
        <div>
          <h1 style={{ textAlign: "center" }}>Store Review App</h1>
          <p style={{ textAlign: "center" }}>Your feedback matters! Please rate our store.</p>
          <div style={{ display: "grid", gridTemplateColumns: "3fr 3fr 3fr", gap: "15px", justifyContent: "center" }}>
            {StoreList.map((store) => (
              <div key={store.storename} style={{ width: "80%", background: "white", color: "black", padding: "25px", borderRadius: "24px", border: "4px solid #ddd", textAlign: "center" }}>
                <h3>{store.storename}</h3>
                <p>{store.city}</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setUsergivenRating({ ...UsergivenRating, [store.storename]: star })} style={{ fontSize: "24px", border: "none", background: "none", cursor: "pointer", color: "black" }}>
                      {star <= (UsergivenRating[store.storename] || 0) ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
                <p>Your Feedback: {UsergivenRating[store.storename] || "You have not rated yet"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      
      {page === 'owner-dashboard' && (
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", padding: "20px" }}>
          <p style={{ color: "#666" }}>Welcome, Store Owner 👋</p>
          <h1>{User?.storeName || "Owner Store"}</h1>
          <p>{User?.email}</p>

          <div style={{ background: "white", color: "black", padding: "30px", borderRadius: "24px", border: "4px solid #ddd", marginTop: "20px" }}>
            <h2 style={{ fontSize: "48px", margin: "0" }}>⭐ {storeratingaverage} / 5</h2>
            <p>Average Rating</p>
            <p>{OwnerStoreRatings.length} Users Rated your <Stores></Stores></p>
          </div>

          <div style={{ background: "white", color: "black", padding: "20px", borderRadius: "24px", border: "4px solid #ddd", marginTop: "20px", textAlign: "left" }}>
            <h3 style={{ textAlign: "center" }}>Who Rated You?</h3>
            {storeRatings.length === 0 ? (
              <p style={{ textAlign: "center" }}>No ratings yet for your store.</p>
            ) : (
              OwnerStoreRatings.map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #eee" }}>
                  <span>{r.user}</span>
                  <span>{"⭐".repeat(r.rating)} ({r.rating}/5)</span>
                </div>
              ))
            )}
          </div>

          <button onClick={() => setPage('LoginPage')} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>Logout</button>
        </div>
      )}
      
    </div>
  )
}

export default App;