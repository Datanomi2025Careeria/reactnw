import '../App.css'
import React, {useState, useEffect} from 'react'

const Posts = () => {

// Komponentin tilan määritys
const [posts, setPosts] = useState([])
const [showPosts, setShowPosts] = useState(false)


useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/posts")
  .then(res => res.json()) //muutetaan json data javascriptiksi
  .then(oliot => setPosts(oliot))
},[]
)

  return (
    <>
        <h2 onClick={() => setShowPosts(!showPosts)}>Posts from typicode</h2>

        {
          showPosts && posts && posts.map(p =>

            <div className='posts' key={p.id}>

            <h4>{p.title}</h4>
            <h5>User ID: {p.userId}</h5>
            <p>{p.body}</p>

            
            </div>
            )
        }

    </>
  )
}

export default Posts
