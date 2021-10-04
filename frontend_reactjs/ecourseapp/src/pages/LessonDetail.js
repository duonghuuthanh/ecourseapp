import { useEffect, useState } from "react"
import { Badge, Col, Row, Spinner, Image, Form, Button } from "react-bootstrap"
import Moment from "react-moment"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import cookies from 'react-cookies'
import Rating from "react-rating"

export default function LessonDetail() {
    const [lesson, setLesson] = useState(null)
    const [comments, setComments] = useState([])
    const [commentContent, setCommentContent] = useState(null)
    const [rating, setRating] = useState(0)
    const [changed, setChanged] = useState(1)
    let { lessonId } = useParams()
    let user = useSelector(state => state.user.user)

    useEffect(() => {
        let loadLesson = async () => {
            try {
                let res = await Apis.get(endpoints["lesson-detail"](lessonId), {
                    headers: {
                        "Authorization": `Bearer ${cookies.load("access_token")}`
                    }
                })
                setLesson(res.data)
                setRating(res.data.rate)
            } catch (err) {
                console.error(err)
            }
        }

        let loadComments = async () => {
            try {
                let res = await Apis.get(endpoints['comments'](lessonId))
                setComments(res.data)
            } catch (err) {
                console.error(err)
            }
        }

        loadLesson()
        loadComments()
    }, [changed])

    const addComment = async (event) => {
        event.preventDefault()

        try {
            let res = await Apis.post(endpoints['add-comment'](lessonId), {
                "content": commentContent
            }, {
                headers: {
                    "Authorization": `Bearer ${cookies.load("access_token")}`
                }
            })

            console.info(res.data)
            comments.push(res.data)
            setComments(comments)
            setChanged(comments.length)
        } catch (err) {
            console.error(err)
        }
 
    }

    const saveRating = async (rate) => {
        if (window.confirm("Ban muon danh gia bai hoc nay?") == true) {
            try {
                let res = await Apis.post(endpoints['rating'](lessonId), {
                    "rating": rate
                }, {
                    headers: {
                        "Authorization": `Bearer ${cookies.load("access_token")}`
                    }
                })
                console.info(res.data)
            } catch (err) {
                console.error(err)
            }
        }
    }

    if (lesson === null)
        return <Spinner animation="border" />

    let comment = <em><Link to="/login">Dang nhap</Link> de binh luan</em>
    let r = ""
    if (user !== null && user !== undefined) {
        comment = <Form onSubmit={addComment}>
                    <Form.Group className="mb-3" controlId="commentContent">
                      <Form.Control as="textarea" 
                                    value={commentContent}
                                    onChange={(event) => setCommentContent(event.target.value)}
                                    placeholder="Nhap noi dung binh luan" rows={3} />
                    </Form.Group>
                    <Button type="submit" variant="info">Them binh luan</Button>
                  </Form>

        r = <Rating initialRating={rating} onClick={saveRating} />
    }
    return (
        <>
            <h1 className="text-center text-danger">CHI TIET BAI HOC</h1>
            <Row>
                <Col md={4} xs={12}>
                    <Image src={lesson.image} rounded fluid />      
                </Col>
                <Col md={8} xs={12}>
                    <h2>{lesson.subject}</h2>     
                    <p>Ngay tao: {lesson.created_date}</p>
                    <p>Ngay cap nhat: {lesson.updated_date}</p>
                    <p>
                        {lesson.tags.map(t => <Badge style={{backgroundColor: "blue",marginRight:"5px"}} bg="secondary">{t.name}</Badge>)}
                    </p>
                    <p>
                        {r}
                    </p>
                </Col>
            </Row>
            <hr />
            <div>
                {lesson.content}
            </div>
            <hr />
            {comment}
            <hr />
            {comments.map(c => <Row>
                                    <Col md={1} xs={3}>
                                        <Image src={c.creator.avatar} roundedCircle fluid />
                                        
                                    </Col>
                                    <Col md={11} xs={9}>
                                        <p><em>{c.content}</em></p>
                                        <p>Binh luan boi: {c.creator.username}</p>
                                        <p>Vao luc: <Moment fromNow>{c.created_date}</Moment></p>
                                    </Col>
                                </Row>)}
            
        </>
    )
}