import { useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import { useParams } from "react-router"
import Apis, { endpoints } from "../configs/Apis"
import ECourseCard from "../layouts/ECourseCard"

export default function Lesson() {
    const [lessons, setLessons] = useState([])
    const { courseId } = useParams()

    useEffect(() => {
        let loadLesson = async () => {
            try {
                let res = await Apis.get(endpoints['lessons'](courseId))
                setLessons(res.data)
            } catch (err) {
                console.error(err)
            }
        }

        loadLesson()
    }, [])

    return (
        <>
        <h1 className="text-center text-danger">DANH MUC BAI HOC CUA KHOA HOC</h1>

        <Row>
            {lessons.map(l => <ECourseCard obj={l} type="lesson" />)}
        </Row>
        </>
    )
}