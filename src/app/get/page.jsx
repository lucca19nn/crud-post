"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Este componente busca e exibe uma lista de comentários de uma API pública.
// https://jsonplaceholder.typicode.com/comments

export default function Get() {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(false);
    const router = useRouter();
    const buscarComments = async () => {
        setLoading(true);
        setError(false); 

        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
            setComments(response.data);
        } catch (error) {
            setError(true);
            console.error("❌ Erro ao buscar comentários:", error);
        } finally {
            setLoading(false);
        }
    };

    const navegarParaComentario = (commentId) => {
        router.push(`/get/${commentId}`);
    };

    useEffect(() => {
        buscarComments();
    }, []); 
    return (
        <div>
            <h1>Lista de Comentários</h1>
            {loading && <p>Carregando...</p>}
            {error && <p>❌ Ocorreu um erro ao buscar os comentários.</p>}
            {!loading && !error && (
                <>
                    <h2>Comentários ({comments.length})</h2>
                    <ul>
                        {comments.map((comment) => (
                            <li
                                key={comment.id}
                                onClick={() => navegarParaComentario(comment.id)}
                                style={{ 
                                    cursor: "pointer", 
                                    margin: "16px 0", 
                                    padding: "8px", 
                                    border: "1px solid #ccc",
                                    borderRadius: "4px"
                                }}
                            >
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
                </>
            )}
        </div>
    );
}