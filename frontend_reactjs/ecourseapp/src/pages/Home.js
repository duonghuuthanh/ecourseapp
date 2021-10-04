import { useEffect, useState } from "react"
import { Button, ButtonGroup, Row } from "react-bootstrap"
import { useLocation } from "react-router"
import Apis, { endpoints } from "../configs/Apis"
import ECourseCard from '../layouts/ECourseCard'

export default function Home() {
    const [courses, setCourses] = useState([])
    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(false)
    const [page, setPage] = useState(1)
    const location = useLocation()

    useEffect(() => {
        let loadCourses = async () => {
            let query = location.search 
            if (query === "")
                query = `?page=${page}`
            else
                query += `&page=${page}`
           try {
                let res = await Apis.get(`${endpoints['courses']}${query}`)
                setCourses(res.data.results)

                setNext(res.data.next !== null)
                setPrev(res.data.previous !== null)
            } catch (err) {
                console.error(err)
            }   
        }

        loadCourses()
    }, [location.search, page])

    const paging = (inc) => {
        setPage(page + inc)
    }

    return (
        <>
            <h1 class="text-center text-danger">DANH MUC KHOA HOC</h1>

            <ButtonGroup>
                <Button variant="info" onClick={() => paging(-1)} disabled={!prev}>&lt;&lt;</Button>
                <Button variant="info" onClick={() => paging(1)} disabled={!next}>&gt;&gt;</Button>
            </ButtonGroup>

            <Row>
                {courses.map(c => <ECourseCard obj={c} />)}
            </Row>
        </>
    )
}