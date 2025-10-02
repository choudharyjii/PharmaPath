
//  import React, { useState, useEffect } from "react";
// import { TextField, Button, Fade } from "@mui/material";
// import "./Login.css";

// export default function Login({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     setShowForm(true);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (email === "admin@medical.com" && password === "1234") {
//       onLogin();
//     } else {
//       alert("Invalid Credentials");
//     }
//   };

//   return (
//     <div className="login-page">
//       <Fade in={showForm} timeout={600}>
//         <div className="login-container">
//           <form className="login-form" onSubmit={handleSubmit}>
//             <h2 className="login-title">Login</h2>

//             <TextField
//               label="Email"
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               fullWidth
//               margin="normal"
//               required
//             />

//             <TextField
//               label="Password"
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               fullWidth
//               margin="normal"
//               required
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{
//                 marginTop: "20px",
//                 padding: "12px",
//                 fontSize: "16px",
//                 backgroundColor: "#8e44ad",
//                 "&:hover": { backgroundColor: "#9b59b6" },
//               }}
//             >
//               Login
//             </Button>
//           </form>
//         </div>
//       </Fade>
//     </div>
//   );
// }


 import React, { useState, useEffect } from "react";
import { TextField, Button, Fade } from "@mui/material";
import "./Login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setShowForm(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Accept any email & password
    onLogin();
  };

  return (
    <div className="login-page">
      <Fade in={showForm} timeout={600}>
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Login</h2>

            <TextField
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: "20px",
                padding: "12px",
                fontSize: "16px",
                backgroundColor: "#8e44ad",
                "&:hover": { backgroundColor: "#9b59b6" },
              }}
            >
              Login
            </Button>
          </form>
        </div>
      </Fade>
    </div>
  );
}
