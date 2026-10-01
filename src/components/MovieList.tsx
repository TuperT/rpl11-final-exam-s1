import { Col, Empty, Flex, Input, Row, Select, Typography, message } from "antd"
import { Content } from "antd/es/layout/layout"
import { useEffect, useMemo, useState } from "react"
import type { Movie } from "../types/movie"
import { getMovies } from "../services/movieService"
import MovieCard from "./ui/MovieCard/MovieCard"
import MovieCardSkeleton from "./ui/MovieCard/MovieCardSkeleton"
import MovieFormButton from "./ui/MovieCard/MovieFormButton"

const { Title } = Typography

const MovieList = () => {
    const [movieData, setMovieData] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [genre, setGenre] = useState<string | undefined>(undefined)

    const getAllMovies = async () => {
        try {
            setIsLoading(true)
            const moviesData = await getMovies()
            setMovieData(moviesData)
        } catch (error) {
            console.log(error)
            message.error("Failed to fetch movies data", 3)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAllMovies()
    }, [])

    const genres = useMemo(() => {
        const set = new Set<string>()

        movieData.forEach((movie) => {
            movie.genre?.forEach((genre) => set.add(String(genre)))
        })

        return Array.from(set).sort()
    }, [movieData])

    const filteredMovies = useMemo(() => {
        const query = search.trim().toLowerCase()

        return movieData.filter((movie) => {
            const matchGenre = !genre || movie.genre?.map(String).includes(genre)

            if (!matchGenre) return false
            if (!query) return true

            return (
                movie.title?.toLowerCase().includes(query) ||
                movie.director?.toLowerCase().includes(query)
            )
        })
    }, [movieData, search, genre])

    return (
        <Content style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
            <Flex vertical gap={16}>
                <Flex justify="space-between" align="center" wrap gap={12}>
                    <Title level={3} style={{ margin: 0 }}>
                        Movies
                    </Title>

                    <Flex gap={12} wrap>
                        <Input.Search
                        placeholder="Search title or director"
                        allowClear
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onSearch={setSearch}
                        style={{ width: 280 }}
                        />
                        
                        <Select
                        placeholder="All genres"
                        allowClear
                        value={genre}
                        onChange={setGenre}
                        options={genres.map((g) => ({ label: g, value: g }))}
                        style={{ width: 180 }}
                        />

                        <MovieFormButton />
                    </Flex>
                </Flex>

                <Row gutter={[24, 24]}>
                    {isLoading ? (
                        Array.from({ length: 8 }, (_, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                <MovieCardSkeleton />
                            </Col>
                        ))
                    ) : filteredMovies.length > 0 ? (
                        filteredMovies.map((movie) => (
                            <Col key={movie.id ?? movie.title} xs={24} sm={12} md={8} lg={6}>
                                <MovieCard {...movie} />
                            </Col>
                        ))
                    ) : (
                        <Col span={24}>
                            <Empty
                            description="No movies found"
                            style={{ margin: "48px auto" }}
                            />
                        </Col>
                    )}
                </Row>
            </Flex>
        </Content>
    )
}

export default MovieList