import { Button, Form, Input, InputNumber, message, Modal, Rate, Spin } from "antd"
import type { Movie } from "../../../types/movie"
import { Pencil } from "lucide-react"
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { updateMovie } from "../../../services/movieService";
import { LoadingOutlined } from "@ant-design/icons";

const MovieEditButton = (props: Movie) => {
    const [form] = useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const image = Form.useWatch("image", form)

    const handleSubmit = async () => {
        await form.validateFields()

        const genres = form.getFieldValue("genre")

        const payload: Movie = {
            image: form.getFieldValue("image"),
            title: form.getFieldValue("title"),
            description: form.getFieldValue("description"),
            director: form.getFieldValue("director"),
            rating: form.getFieldValue("rating") * 2,
            release_year: form.getFieldValue("release_year"),
            genre: genres.split(",").map((genre: string) => genre.trim()),
        }

        try {
            setIsSubmitting(true)
            if (!props.id) return message.error("Movie not found", 3);

            await updateMovie(props?.id, payload)
            setIsModalOpen(false)
            location.reload()
            return message.success("Movie successfully update", 3)
        } catch (error) {
            console.log(error)
            return message.error("Failed to update movie", 3)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
        <Button 
        shape='circle' 
        icon={<Pencil size={12} />} 
        size='small'
        onClick={() => setIsModalOpen(true)}
        />

        <Modal
        width={600}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        styles={{
            root: {
                overflow: "hidden",
                maxHeight: "800px",
            },
            body: {
                padding: "1rem",
                background: "#F7F6F1",
                overflow: "scroll",
                maxHeight: "600px",
                borderRadius: "0.8rem"
            }
        }}
        >
            <Form
            layout="vertical"
            form={form}
            initialValues={{
                ...props,
                rating: (props.rating ?? 0) / 2,
                genre: props.genre?.join(", ") ?? "",
            }}
            onFinish={handleSubmit}
            styles={{
                root: {
                    maxWidth: "1200px",
                },
                label: {
                    fontFamily: "inter",
                    fontWeight: "600",
                    fontSize: "1rem",
                    lineHeight: "0.5rem",
                }
            }}
            >
                <img 
                src={image} 
                alt="Movie Image Edit"
                style={{
                    maxWidth: "20%",
                    maxHeight: "30%",
                    borderRadius: "0.5rem"
                }}
                
                />

                <Form.Item 
                name="image"
                label="Movie Image"
                rules={[
                    {
                        required: true, message: "Please enter movie cover image"
                    }
                ]}
                >
                    <Input 
                    placeholder="https://image-host.com/image-example.png"
                    required
                    />
                </Form.Item>

                <Form.Item 
                name="director"
                label="Director"
                rules={[
                    {
                        required: true, message: "Please enter movie director  name"
                    },
                    {
                        max: 50, message: "Director name cannot be longer than 50 chars"
                    }
                ]}
                >
                    <Input 
                    placeholder="Brian Khrisna"
                    required
                    />
                </Form.Item>

                <Form.Item 
                name="title"
                label="Title"
                rules={[
                    {
                        required: true, message: "Please enter the movie title"
                    },
                    {
                        max: 100, message: "Movie title cannot be longer than 100 chars"
                    }
                ]}
                >
                    <Input 
                    placeholder="Seporsi Mie Ayam Sebelum mati"
                    required
                    />
                </Form.Item>

                <Form.Item 
                name="description"
                label="Description"
                rules={[
                    {
                        required: true, message: "Please enter the movie description"
                    },
                    {
                        max: 400, message: "Movie description cannot be longer than 400 chars"
                    }
                ]}
                >
                    <TextArea
                    placeholder="Dokumen ini menggambarkan perasaan kesepian dan depresi seorang pria bernama Ale yang merasa terasing di tengah keramaian kota. Ia merenungkan hidupnya yang monoton dan penuh kekecewaan, termasuk hubungan yang buruk dan pengkhianatan dari teman. Ale merayakan ulang tahunnya sendirian, mencerminkan keputusasaannya dan kerinduan akan cinta serta pengakuan dari orang lain."
                    maxLength={400}
                    showCount
                    required
                    styles={{
                        textarea: {
                            height: "100px"
                        }
                    }}
                    />
                </Form.Item>

                <Form.Item 
                name="rating"
                label="Rating"
                >
                    <Rate 
                    allowHalf
                    allowClear
                    />
                </Form.Item>

                <Form.Item
                name="release_year"
                label="Release Year"
                rules={[
                    {
                        required: true, message: "Please enter the movie release year"
                    }
                ]}
                >
                    <InputNumber 
                    required
                    />
                </Form.Item>

                <Form.Item
                name="genre"
                label="Genres"
                rules={[
                    {
                        required: true, message: "Please enter the movie genre"
                    }
                ]}
                >
                    <Input 
                    placeholder="Action, Adventure, Historical, Shounen..."
                    required
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={isSubmitting} block>
                        {
                            isSubmitting 
                            ? <Spin indicator={<LoadingOutlined spin />} />
                            : "Submit"
                        }
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
        </>
    )
}

export default MovieEditButton