import './post.css'
export default function Post() {
  return (
    <div className='post'>
        <img className='postImg' src='nature3.jpg' alt=''></img>

        <div className="postInfo">
            <div className="postCats">
                <span className="postCat">Music</span>
                <span className="postCat">Life</span>
            </div>
            <span className="postTitle">Lorem ipsum dolor</span>
            <hr/> {/* to have 1 line space in between. */}
            <span className='postDate'>1 hour ago</span>
        </div>
        <p className='postDesc'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas repudiandae harum veniam accusantium obcaecati exercitationem beatae, similique natus, eius accusamus nesciunt nihil. Nobis labore maxime harum, pariatur sit non voluptatem incidunt in alias assumenda voluptatum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit praesentium dolores exercitationem totam asperiores esse corporis perspiciatis aut dolorem. Soluta quo facere laboriosam, sapiente harum cum eum sint dolor, aperiam consectetur quia dolorum aliquid laborum ad debitis perspiciatis! Vero, possimus odio at consequuntur maxime impedit unde iusto, rerum placeat beatae molestiae fugiat laborum soluta cum, ea odit!</p>
    </div>
  )
}
