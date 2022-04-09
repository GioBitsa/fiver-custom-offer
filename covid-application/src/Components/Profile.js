import React from "react";


function Profile() {
    // const { auth } = useAuth();
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const user_Identity = JSON.parse(localStorage.getItem("user_info")).user_identity;
    
    const handleSignout = async (e) => {
      localStorage.clear("user");
      localStorage.clear("userStatus");
      loggedInUser = null;
    };
  
    return (
      <div className="HomePage">
        <div>
          <h1>Hello {loggedInUser.first_name} </h1>
        </div>
        <br />
        <div>
          <a href="/login" onClick={handleSignout}>
            Sign out
          </a>
        </div>
      </div>
    );
  };

  export default Profile;