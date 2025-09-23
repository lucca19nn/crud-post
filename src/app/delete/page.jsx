"use client";
import { useState } from "react";
import axios from "axios";

export default function DeletePage() {
    const [commentId, setCommentId] = useState("");
    const [comment, setComment] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false); // Adicionado estado para loading

    const buscarComentario = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
            setComment(response.data);
            setError(null);
            setSuccess(null);
        } catch (error) {
            setError("Comentário não encontrado.");
            setComment(null);
            setSuccess(null);
        } finally {
            setLoading(false);
        }
    };

    const deletarComentario = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
            setSuccess("Comentário deletado com sucesso.");
            setComment(null);
            setCommentId("");
        } catch (error) {
            setError("Erro ao deletar o comentário.");
            setSuccess(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Deletar Comentário</h1>
            <input
                type="text"
                placeholder="ID do comentário"
                value={commentId}
                onChange={(e) => setCommentId(e.target.value)}
            />
            <button onClick={buscarComentario} disabled={!commentId || loading}>
                {loading ? "Buscando..." : "Buscar Comentário"}
            </button>
            {comment && (
                <div>
                    <p><strong>Comentário Encontrado:</strong> {comment.id}</p>
                    <p> Nome: {comment.name}</p>
                    <p> Email: {comment.email}</p>
                    <p> Comentário: {comment.body}</p>
                    <button onClick={deletarComentario} disabled={loading}>
                        {loading ? "Deletando..." : "Deletar Comentário"}
                    </button>
                </div>
            )}
            {error && <p style={{ color: "red" }}>Erro na operação deletar</p>}
            {success && <p style={{ color: "green" }}>Comentário deletado com sucesso!</p>}
        </div>
    );
}