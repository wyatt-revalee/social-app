import Share from "../share/Share"
import Post from "../post/Post"
import "./feed.css"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Feed() {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        const fetchPosts = async () => {
            try{
                const res = await axios.get("posts/timeline/6424ac539296707d419621f0")
                console.log(res)
            } catch(err) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            }
        }
        fetchPosts()
    },[])

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                {/* {Posts.map(p=>(
                    <Post key={p.id} post={p}/>
                ))} */}
            </div>
        </div>
    )
}