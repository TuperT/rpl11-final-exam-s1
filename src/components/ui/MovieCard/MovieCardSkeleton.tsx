import { Card, Flex, Skeleton, Space } from 'antd';

const MovieCardSkeleton = () => {
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
            <div
            style={{
                width: "100%",
                aspectRatio: 7 / 10,
                display: "flex",
            }}
            >
                <Skeleton.Node
                active
                style={{ width: "100%", height: "100%", minHeight: 429, borderRadius: 0 }}
                >
                    {/* empty child hides the default icon */}
                    <span />
                </Skeleton.Node>
            </div>

            {/* Rating tag */}
            <Skeleton.Button
            active
            shape='round'
            size='small'
            style={{
                position: "absolute",
                top: 15,
                left: 20,
                width: 48,
                minWidth: 48,
                zIndex: 1,
            }}
            />

            {/* Genre tags */}
            <Space
            size={6}
            style={{
                position: "absolute",
                top: 15,
                right: 20,
                zIndex: 1,
            }}
            >
                {[0, 1].map((key) => (
                    <Skeleton.Button
                    key={key}
                    active
                    shape='round'
                    size='small'
                    style={{ width: 48, minWidth: 48 }}
                    />
                ))}
            </Space>

            {/* Title & Description */}
            <Flex
            gap={8}
            vertical
            style={{
                padding: "0 1.25rem 0 1.25rem"
            }}
            >
                {/* Title */}
                <div
                style={{
                    position: "absolute",
                    left: 20,
                    bottom: 110,
                    zIndex: 1,
                }}
                >
                    <Skeleton.Input active size='small' style={{ width: 160 }} />
                </div>

                <div
                style={{
                    position: "absolute",
                    left: 20,
                    right: 20,
                    bottom: 50,
                    zIndex: 1,
                }}
                >
                    <Skeleton
                    active
                    title={false}
                    paragraph={{ rows: 3, width: ["100%", "100%", "60%"] }}
                    />
                </div>

                {/* Director, release year & action buttons */}
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
                    <Skeleton.Input active size='small' style={{ width: 110, minWidth: 110 }} />

                    <Space size={6}>
                        {[0, 1, 2].map((key) => (
                            <Skeleton.Avatar
                            key={key}
                            active
                            shape='circle'
                            size='small'
                            />
                        ))}
                    </Space>
                </Flex>
            </Flex>
        </Card>
    )
}

export default MovieCardSkeleton