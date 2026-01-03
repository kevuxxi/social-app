import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:5173/api";

const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
        if (config.headers && typeof config.headers === "object") {
            delete config.headers["Content-Type"];
            delete config.headers["content-type"];
        }
    }

    return config;
});


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const customError = {
            message: "Error inesperado. Intenta nuevamente.",
            status: error.response?.status ?? 500,
            url: error.config?.url,
        };

        if (error.response) {
            const backendMessage = error.response.data?.message || error.response.data?.error || error.response.data?.msg;
            switch (error.response.status) {
                case 400:
                    customError.message = backendMessage || "Solicitud incorrecta (400).";
                    break;
                case 401:
                    customError.message = backendMessage || "No autorizado (401). Inicia sesiA3n nuevamente.";
                    break;
                case 403:
                    customError.message = backendMessage || "Acceso denegado (403).";
                    break;
                case 404:
                    customError.message = backendMessage || "Recurso no encontrado (404).";
                    break;
                case 409:
                    customError.message = backendMessage || "Conflicto (409).";
                    break;
                case 500:
                    customError.message = backendMessage || "Error interno del servidor (500).";
                    break;
                default:
                    customError.message = backendMessage || customError.message;
            }
        }

        console.error(`[API ERROR]: ${customError.status} - ${customError.url}`);
        console.error(customError);

        return Promise.reject(customError);
    }
);

export default axiosInstance;
