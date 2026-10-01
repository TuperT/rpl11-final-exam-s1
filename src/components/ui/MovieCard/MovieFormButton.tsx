import { Button, Form, Input, InputNumber, message, Modal, Rate, Spin } from "antd"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { useState } from "react"
import { useForm } from "antd/es/form/Form"
import TextArea from "antd/es/input/TextArea"
import type { Movie } from "../../../types/movie"
import { createMovie } from "../../../services/movieService"

const MovieFormButton = () => {
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

            await createMovie(payload)
            setIsModalOpen(false)
            location.reload()
            return message.success("Movie successfully created", 3)
        } catch (error) {
            message.error("Failed to create movie", 3)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
        <Button 
        type="primary" 
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
        >
            Add Movies
        </Button>

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

export default MovieFormButton