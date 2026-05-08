"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  const [isLogin, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) router.push("/notes");
  }, []);

  const auth = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://127.0.0.1:5000/api/auth/${isLogin ? 'login' : 'register'}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const d = await res.json();
    if (res.ok) { localStorage.setItem("token", d.token); router.push("/notes"); }
    else alert(d.message);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">{isLogin ? "Login" : "Register"}</h3>
        <form onSubmit={auth}>
          <input type="email" className="form-control mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
          <input type="password" className="form-control mb-3" placeholder="Password" onChange={e => setPwd(e.target.value)} required />
          <button className="btn btn-primary w-100" type="submit">Submit</button>
        </form>
        <button className="btn btn-link w-100 mt-2 text-decoration-none" onClick={() => setLogin(!isLogin)}>
          Switch to {isLogin ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}
