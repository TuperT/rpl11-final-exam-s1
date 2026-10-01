import { Button, Divider, Flex, Grid, Image, Modal, Rate, Space, Tag } from "antd"
import type { Movie } from "../../../types/movie"
import { useState } from "react";
import { BookOpenText, Calendar, Clapperboard, Star } from "lucide-react";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

const MovieDetailButton = (props: Movie) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const screens = Grid.useBreakpoint();
    const isMobile = !screens.md;

    return (
        <>
        <Button 
        shape='circle' 
        icon={<BookOpenText size={12} />} 
        size='small'
        onClick={() => setIsModalOpen(true)}
        />

        <Modal
        width={800}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        styles={{
            root: {
                overflow: "hidden",
                maxHeight: "800px",
            },
            body: {
                padding: 0,
                background: "#F7F6F1",
                overflow: "scroll",
                maxHeight: "600px",
                borderRadius: "0.8rem"
            }
        }}
        >
            <Flex
            gap={16}
            vertical={isMobile}
            align={isMobile ? "center" : ""}
            style={{
                padding: isMobile ? "1rem" : ""
            }}
            >
                <Image
                src={props.image}
                alt="Movie Image"
                styles={{
                    image: {
                        width: "auto",
                        maxHeight: "500px"
                    }
                }}
                />

                {/* Title */}
                <Flex
                style={{
                    flex: 1,
                    minWidth: 0,
                    padding: "0 1rem 0 0"
                }}
                vertical
                >
                    <Title
                    styles={{
                        root: {
                            color: "rgba(18, 24, 32, 0.72)",
                            fontFamily: "Inter",
                            fontWeight: "700",
                        },
                    }}
                    level={3}
                    >
                        {props.title}
                    </Title>

                    {/* Director & Rating stars */}
                    <Flex align="center" gap={16}>
                        <Flex align="center" gap={8}>
                            <Clapperboard size={16} />
                            <span style={{ 
                                color: "rgba(18, 24, 32, 0.72)", 
                                fontFamily: "Inter" 
                            }}>
                                Directed by {props.director}
                            </span>
                        </Flex>

                        <Flex align="center" gap={8}>
                            <Calendar size={16} />
                            <span style={{ 
                                color: "rgba(18, 24, 32, 0.72)", 
                                fontFamily: "Inter" }}
                            >
                                {props.release_year}
                            </span>
                        </Flex>
                    </Flex>

                    <Flex align="center" gap={8}>
                        <Star size={16} />
                        <span
                        style={{ 
                            color: "rgba(18, 24, 32, 0.72)", 
                            fontFamily: "Inter",
                            fontWeight: "600"
                        }}>
                            {props.rating}/10
                        </span>

                        <span>
                            <Rate disabled value={props.rating} />
                        </span>
                    </Flex>

                    <Divider size="small" />

                    {/* Synopsis */}
                    <Flex vertical>
                        <Title 
                        level={5}
                        styles={{
                            root: {
                                opacity: "80%",
                                margin: 0
                            }
                        }}
                        >
                            Description
                        </Title>

                        <Paragraph
                        styles={{
                            root: {
                                color: "rgba(18, 24, 32, 0.72)",
                                fontFamily: "Inter",
                                opacity: "80%",
                            }
                        }}
                        >
                            {props.description}
                        </Paragraph>
                    </Flex>

                    {/* Genre tags */}
                    <Flex vertical>
                        <Title 
                        level={5}
                        styles={{
                            root: {
                                opacity: "80%",
                                margin: 0
                            }
                        }}
                        >
                            Genres
                        </Title>

                        <Space>
                            {
                                props.genre && 
                                props.genre.map((genre, key) => (
                                    <Tag
                                    key={key}
                                    variant="outlined"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        zIndex: 1,
                                        borderRadius: "1rem",
                                        fontSize: "10px",
                                        fontWeight: 600,
                                        backgroundColor: "#FAFBFC"
                                    }}
                                    >
                                        {genre}
                                    </Tag>
                                ))
                            }
                        </Space>
                    </Flex>
                </Flex>
            </Flex>
        </Modal>
        </>
    )
}

export default MovieDetailButton
