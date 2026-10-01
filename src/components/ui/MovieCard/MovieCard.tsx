import { Card,  Flex, Image,  Space, Tag } from 'antd';
import type { Movie } from "../../../types/movie"
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { Star } from 'lucide-react';
import "./MovieCard.css"
import MovieDeleteButton from './MovieDeleteButton';
import MovieDetailButton from './MovieDetailButton';
import MovieEditButton from './MovieEditButton';

const MovieCard = (props: Movie) => {
    return (
        <Card
        variant='borderless'
        styles={{
            root: {
                position: "relative",
                width: "100%",
                height: "auto",
                borderRadius: "1.5rem",
                boxShadow: "1.2px 2.4px 6.4px hsl(0deg 0% 0% / 0.40)",
                overflow: "hidden"
            },
            body: {
                padding: 0
            }
        }}
        >
            {/* Movie cover image */}
            <div className='movie-image'>
                <Image
                src={props.image}
                alt='Movie Image'
                width='100%'
                styles={{
                    image: {
                        objectFit: "cover",
                        aspectRatio: 7/10,
                    }
                }}
                />
            </div>

            {/* Rating tag */}
            <Tag 
            variant='solid'
            style={{
                position: "absolute",
                top: 15,
                left: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
                border: "1px solid rgba(255, 255, 255, 0.35)",
                borderRadius: "1rem",
                background: "#FAFBFC",
                color: "rgba(18, 24, 32, 0.72)",
                fontSize: "12px",
                fontWeight: 600,
                backdropFilter: "blur(8px)",
                lineHeight: 1,
                gap: "3px"
            }}
            >
                <Star size={14} color="#facc15" fill="#facc15" /> {props.rating}
            </Tag>

            {/* Genre tags */}
            <Space
            styles={{
                root: {
                    position: "absolute",
                    top: 15,
                    right: 20,
                }
            }}
            >
                {
                    props.genre &&
                    props.genre.slice(0,2).map((genre, key) => (
                        <Tag 
                        key={key}
                        variant='solid'
                        styles={{
                            root: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 1,
                                border: "1px solid rgba(255, 255, 255, 0.35)",
                                borderRadius: "1rem",
                                background: "#FAFBFC",
                                backdropFilter: "blur(8px)",
                                color: "rgba(18, 24, 32, 0.72)",
                                fontSize: "10px",
                                fontWeight: 600,
                            }
                        }}
                        >
                            {genre}
                        </Tag>
                    ))
                }
            </Space>

            {/* Title & Description */}
            <Flex 
            gap={8} 
            vertical
            style={{
                padding: "0 1.25rem 0 1.25rem"
            }}
            >
                <Title
                styles={{
                    root: {
                        position: "absolute",
                        left: 20,
                        bottom: 110,
                        zIndex: 1,
                        color: "#FAFBFC",
                        fontFamily: "Inter",
                        lineClamp: 2,
                    }
                }}
                level={5}
                >
                    {props.title}
                </Title>

                <Flex 
                justify='space-between'
                style={{
                    position: "absolute",
                    left: 20,
                    right: 20,
                    bottom: 50,
                }}
                >
                    <Paragraph
                    ellipsis={{
                        rows: 3
                    }}
                    styles={{
                        root: {
                            zIndex: 1,
                            color: "#FAFBFC",
                            opacity: "80%",
                            fontFamily: "Inter",
                            fontSize: "12px"
                        },
                    }}
                    >
                        {props.description}
                    </Paragraph>
                </Flex>

                {/* Author, Release year & Action button */}
                <Flex
                justify="space-between"
                align="center"
                style={{
                    position: "absolute",
                    left: 20,
                    right: 20,
                    bottom: 10,
                    zIndex: 1,
                }}
                >
                    <Paragraph
                    styles={{
                        root: {
                            color: "#FAFBFC",
                            opacity: "80%",
                            fontFamily: "Inter",
                            fontSize: "10px",
                        }
                    }}
                    >
                        directed by {props.director} | {props.release_year}
                    </Paragraph>

                    <Space>
                        <MovieDetailButton {...props} />
                        <MovieEditButton {...props} />
                        <MovieDeleteButton {...props} />
                    </Space>
                </Flex>
            </Flex>
        </Card>
    )
}

export default MovieCard