import React, { useRef, useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { BsFileEarmarkPlus } from "react-icons/bs";
import StarRatingComponent from "react-star-rating-component";
import { s3Upload } from"../libs/awsLib";

export default function Home() {
  const file = useRef(null);
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        // try {
        //   const posts = await loadAllPosts();
        //   setAllPosts(posts);
        // } catch (e) {
        //   onError(e);
        // }
        return;
      }
      try {
        const posts = await loadPosts();
        
        if (posts.attachment) {
          posts.attachment = await Storage.vault.get(posts.attachment);
        }
        
        setPosts(posts);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [isAuthenticated]);

  function loadPosts() {
    return API.get("posts", "/posts");
  }

  function loadAllPosts() {
    return API.get("posts", "/posts/all");
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  function renderPostsList(posts) {
    return (
      <div>
        <LinkContainer to="/posts/new">
          <ListGroup.Item action className="py-1 text-nowrap text-truncate">
            <BsFileEarmarkPlus size={17} />
            <span className="ml-2 font-weight-bold">Create new post</span>
          </ListGroup.Item>
        </LinkContainer>
        {posts.map(
          ({
            postId,
            postBlurb,
            postLink,
            postKeywords,
            postLanguage,
            postRating,
            attachment,
            createdAt,
          }) => (
            <LinkContainer key={postId} to={`/posts/${postId}`}>
              <ListGroup.Item action>
                <span className="font-weight-bold">
                  {postBlurb.trim().split("\n")[0]}
                  <br></br>
                  <a href={postLink} target="_blank" rel="noopener noreferrer">
                    {postLink.trim().split("\n")[0]}
                  </a>
                  <br></br>
                </span>
                <span className="text-muted">
                  Language: {postLanguage}
                  <br></br>
                  Tags: {postKeywords}
                  <br></br>
                  Rating:
                  <br />
                  <StarRatingComponent
                    name={postId}
                    editing={false}
                    renderStarIcon={() => <span>⭐</span>}
                    starCount={postRating}
                  />
                  <p>Attachment: <a target="_blank" rel="noopener noreferrer" href={posts.attachment}>{formatFilename(attachment)}</a></p>
                </span>
                <br />
                <p class='tiny'>Posted at {createdAt.toString()}</p>
              </ListGroup.Item>
            </LinkContainer>
          )
        )}
      </div>
    );
  }

  function renderLander() {
    console.log(allPosts);
    return (
      <div className="lander">
        <h1>Resource Hub</h1>
        <p className="text-muted">
          A place to share helpful information for developers.
        </p>
      </div>
    );
  }

  function renderPosts() {
    return (
      <div className="posts">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Posts</h2>
        <ListGroup>{!isLoading && renderPostsList(posts)}</ListGroup>
      </div>
    );
  }
  return (
    <div className="Home">
      <div className="lander">
        <h1>Homepage</h1>
        <div className="d-block justify-content-center">
          {isAuthenticated ? renderPosts() : renderLander()}
        </div>
      </div>
    </div>
  );
}
