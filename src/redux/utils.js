export const formattedDate = postDetail.created_at
    ? new Date(postDetail.created_at).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
    : "Fecha no disponible"