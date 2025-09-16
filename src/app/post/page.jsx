"use client";
import { useState } from "react";
import axios from "axios";

export default function Post() {
    const [loading, setLoading] = useState(false);
    const [addedComment, setAddedComment] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        body: "",
    });
    const [error, setError] = useState(false);

    const criarNovoComment = async () => {
        setLoading(true);
        setError(false);

        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/comments", {
                name: form.name.trim(),
                email: form.email.trim(),
                body: form.body.trim(),
            });

            setAddedComment([response.data, ...addedComment]);
            setForm({ name: "", email: "", body: "" });
        } catch (error) {
            setError(true);
            console.error("❌ Erro ao criar comentário:", error);
        } finally {
            setLoading(false);
        }
    };

    /*
    
// Se form = { name: "João", email: "joao@email.com", body: "" }

setForm({ ...form, [name]: value });

// É o mesmo que escrever:
setForm({ 
    name: "João",           // ← copiado de ...form
    email: "joao@email.com", // ← copiado de ...form  
    body: "",               // ← copiado de ...form
    [name]: value           // ← novo valor (sobrescreve se já existir)
});
    */

    const atualizarForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div>
            <h1>Criar Comentário</h1>

            <div>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={atualizarForm}
                    placeholder="Nome"
                    required
                />
                <br />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={atualizarForm}
                    placeholder="Email"
                />
                <br />
                <textarea
                    name="body"
                    value={form.body}
                    onChange={atualizarForm}
                    placeholder="Comentário"
                    rows="3"
                />
                <br />
                <button onClick={criarNovoComment} disabled={!form.name.trim() || loading}>
                    {loading ? "Criando..." : "Criar Comentário"}
                </button>
            </div>

            {error && <p style={{ color: "red" }}>❌ Erro ao criar comentário</p>}

            <h2>Comentários Criados ({addedComment.length})</h2>
            <ul>
                {addedComment.map((comment) => (
                    <li key={comment.id}>
                        <hr />
                        <p>
                            <strong>ID:</strong> {comment.id}
                        </p>
                        <p>
                            <strong>Nome:</strong> {comment.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {comment.email}
                        </p>
                        <p>
                            <strong>Comentário:</strong> {comment.body}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}


