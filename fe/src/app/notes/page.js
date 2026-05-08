"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Notes() {
    const router = useRouter();
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [id, setId] = useState("");

    const load = () => {
        fetch("http://127.0.0.1:5000/api/notes", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then(r => r.json())
            .then(d => setNotes(d.notes || []));
    };

    useEffect(() => {
        if (!localStorage.getItem("token")) router.push("/"); else load();
    }, []);

    const save = async (e) => {
        e.preventDefault();
        await fetch(`http://127.0.0.1:5000/api/notes${id ? '/' + id : ''}`, {
            method: id ? "PUT" : "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, content })
        });
        setTitle(""); setContent(""); setId(""); load();
    };

    const del = async (noteId) => {
        await fetch(`http://127.0.0.1:5000/api/notes/${noteId}`, {
            method: "DELETE", headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        load();
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                <h2>My Notes App</h2>
                <button className="btn btn-outline-danger" onClick={() => { localStorage.clear(); router.push("/"); }}>
                    Logout
                </button>
            </div>
            <div className="card shadow-sm mb-4 border-0 bg-white">
                <div className="card-body">
                    <form onSubmit={save} className="d-flex flex-column flex-md-row gap-2">
                        <input className="form-control" placeholder="Note Title" value={title} onChange={e => setTitle(e.target.value)} required />
                        <input className="form-control" placeholder="Note Content" value={content} onChange={e => setContent(e.target.value)} required />
                        <button className="btn btn-success px-4" type="submit">{id ? "Update" : "Save Note"}</button>
                        {id && <button className="btn btn-secondary" type="button" onClick={() => { setId(""); setTitle(""); setContent(""); }}>Cancel</button>}
                    </form>
                </div>
            </div>
            <div className="row">
                {notes.length === 0 ? <p className="text-muted text-center mt-3">No notes yet. Create one above!</p> : null}

                {notes.map(n => (
                    <div key={n._id} className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100 border-0 bg-white">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-bold text-primary">{n.title}</h5>
                                <p className="card-text text-secondary flex-grow-1">{n.content}</p>
                                <div className="mt-3">
                                    <button className="btn btn-sm btn-outline-primary me-2 px-3" onClick={() => { setTitle(n.title); setContent(n.content); setId(n._id); }}>Edit</button>
                                    <button className="btn btn-sm btn-outline-danger px-3" onClick={() => del(n._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
