import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <p>Continiously working to ameliorate the application as well as adding more features, such as ability to lock the chat and expiration on chat links.</p>
      <br/>
     
    </div>
  );
}

export default InfoPage;
