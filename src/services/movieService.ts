import type { Movie } from "../types/movie"
import { api } from "../utils/axios"

export const createMovie = async (data: Movie): Promise<boolean> => {
    try {
        await api.post("/movies", data)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getMovies = async (): Promise<Movie[]> => {
    try {
        const { data } = await api.get<Movie[]>("/movies");

        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const updateMovie = async (id: number, data: Movie): Promise<boolean> => {
    try {
        await api.put(`/movies/${id}`, {
            ...data,
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const deleteMovie = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/movies/${id}`)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}