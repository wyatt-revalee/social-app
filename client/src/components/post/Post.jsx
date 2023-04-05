import "./post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useEffect, useState } from "react"
import axios from "axios"
import {format} from "timeago.js"
import {Link} from "react-router-dom"

export default function Post({post}) {
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [user, setUser] = useState({})
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
        const res = await axios.get(`/users?userId=${post.userId}`)
        setUser(res.data)
      }
    fetchUser()
  }, [post.userId])

  const likeHandler = ()=>{
    setLike(isLiked? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  return (
    <div className="post">
        <div className="postWrapper">
              <div className="postTop">
                  <div className="postTopLeft">
                    <Link to={`profile/${user.username}`} style={{ textDecoration: "none" }} >
                    <img className="postProfileImg" src={user.profilePicture || PF+"person/default.jpg"} alt="" />
                    </Link>
                      <span className="postUsername">{user.username}</span>
                      <span className="postDate">{format(post.createdAt)}</span>
                  </div>
                  <div className="postTopRight">
                    <MoreVertIcon/>
                  </div>
              </div>
              <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img src={PF+post.img} alt="" className="postImg" />
              </div>
              <div className="postBottom">
                  <div className="postBottomLeft">
                      <FavoriteIcon className="likeIcon" htmlColor="red" onClick={likeHandler} />
                      <ThumbUpAltIcon className="likeIcon" htmlColor="#3568f5" onClick={likeHandler} />
                      <span className="postLikeCounter">{like} people liked this</span>
                  </div>
                  <div className="postBottomRight">
                    <snan className="postCommentText">{post.comment} comments</snan>
                  </div>
              </div>
        </div>
    </div>
  )
}
