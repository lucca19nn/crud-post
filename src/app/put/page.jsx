"use client";
import { useState } from "react";
import axios from "axios";

export default function Update() {
    // -> CORRIGIDO: Padronizado para "commentId" (camelCase)
    const [commentId, setCommentId] = useState("");
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const buscarComentario = async () => {
        setLoading(true);
        setError(false); // -> MELHORIA: Reseta o estado de erro
        setSuccess(false); // -> MELHORIA: Reseta o estado de sucesso
        setForm({}); // -> MELHORIA: Limpa o formulário anterior
        try {
            // -> CORRIGIDO: "https" e uso da variável "commentId" correta
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
            // -> CORRIGIDO: Era "setForm9"
            setForm({ name: data.name, email: data.email, body: data.body });
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const editarComentario = async () => {
        setLoading(true); // -> CORRIGIDO: Faltava ativar o loading
        setError(false);
        setSuccess(false);
        try {
            // -> CORRIGIDO: "https" e uso da variável "commentId" correta
            await axios.put(`https://jsonplaceholder.typicode.com/comments/${commentId}`, form);
            setSuccess(true);
            setForm({}); // -> MELHORIA: Limpa o formulário após o sucesso
            setCommentId(""); // -> MELHORIA: Limpa o ID após o sucesso
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Editar Comentário</h1>

            <div>
                <input
                    type="number"
                    // -> CORRIGIDO: Variável "commentId"
                    value={commentId}
                    onChange={(e) => setCommentId(e.target.value)}
                    placeholder="ID do comentário"
                    disabled={loading} // -> MELHORIA: Desabilitar enquanto carrega
                />
                {/* -> CORRIGIDO: "disabled" e variável "commentId" */}
                <button onClick={buscarComentario} disabled={loading || !commentId}>
                    {loading ? "Carregando..." : "Buscar"}
                </button>
            </div>

            {/* Apenas mostra o form se tiver um nome (após busca bem-sucedida) */}
            {form.name && (
                <div>
                    <h2>Editar detalhes do comentário</h2>

                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Digite aqui o nome"
                    />
                    <br />
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Digite aqui o email"
                    />
                    <br />
                    <textarea
                        value={form.body}
                        onChange={(e) => setForm({ ...form, body: e.target.value })}
                        placeholder="Digite aqui o comentário"
                        rows="3"
                    />
                    <br />
                    <button onClick={editarComentario} disabled={loading}>
                        {loading ? "Salvando..." : "Salvar Alterações"}
                    </button>
                </div>
            )}

            {error && <p style={{ color: 'red' }}>Ocorreu um erro. Verifique o ID e tente novamente.</p>}
            {success && <p style={{ color: 'green' }}>Comentário editado com sucesso!</p>}
        </div>
    );
}