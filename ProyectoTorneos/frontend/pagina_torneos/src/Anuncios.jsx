import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Anuncios.css";

function Anuncios(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=IGQVJYOXFBVm9idTZAiWHp4bFdONVlqNThPNk1xazR1azVBbl9EeGVQUW95S2gtbkt5UU01bUtub1dZARjJ5OXQzbG5Vc2t0ZA2xCMGZAmcmU5SmFEUmx4X2VicUJ0S3JkUEktWU0yQVlXV2FRaXprZAXdwcAZDZD`
      )
      .then((res) => {
        const postsData = res.data.data;
        setPosts(postsData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="anuncios">
      <h2 className="anuncios-title">Anuncios U-Sports Instagram @u__sports</h2>
      <hr className="hr2"></hr>
      <div className="d-flex justify-content-around flex-wrap mr-5 ml-5 mb-5 mt-5">
        <div style={{height: "100%",width: "100%"}}>
          {posts.map((post) => (
            <div key={post.id} className="post">
              <img className="post-image" src={post.media_url} alt={post.caption} />
              <br></br>
              <p className="post-caption">{post.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Anuncios;

//IGQVJYOXFBVm9idTZAiWHp4bFdONVlqNThPNk1xazR1azVBbl9EeGVQUW95S2gtbkt5UU01bUtub1dZARjJ5OXQzbG5Vc2t0ZA2xCMGZAmcmU5SmFEUmx4X2VicUJ0S3JkUEktWU0yQVlXV2FRaXprZAXdwcAZDZD
