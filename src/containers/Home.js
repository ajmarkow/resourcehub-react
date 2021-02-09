import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { BsFileEarmarkPlus } from "react-icons/bs";
import StarRatingComponent from "react-star-rating-component";
import YouTube from "react-youtube";
import SpotifyPlayer from "react-spotify-player";
import { TwitterTweetEmbed } from "react-twitter-embed";

export default function Home() {
  function getTweetId(arg) {
    let tweetId = arg.split("/")[5];
    return tweetId;
  }
  
  function extractVideoID(url) {
      let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      console.log(url);
      let match = url.match(regExp);
      if (match && match[7].length === 11) {
        return match[7];
      } else {
      }
  }


  const playerSize = {
    width: "70%",
  };

  // const file = useRef(null);
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

  // function loadAllPosts() {
  //   return API.get("posts", "/posts/all");
  // }

  // function formatFilename(str) {
  //   return str.replace(/^\w+-/, "");
  // }

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
                <span className="feed-text">
                  Language: {postLanguage}
                  <br></br>
                  Tags:  {postKeywords.length > 0 ? postKeywords.join(", "):"No tags 😢"}
                  <br></br>
                  Rating:
                  <br />
                  <StarRatingComponent
                    name={postId}
                    editing={false}
                    renderStarIcon={() => <span>⭐</span>}
                    starCount={parseInt(postRating)}
                  />
                  {postLink.includes("youtube.com") && (
                    <em>
                      <YouTube videoId={extractVideoID(postLink)}></YouTube>
                    </em>
                  )}
                  {postLink.includes("open.spotify.com") && (
                    <React.Fragment>
                      <br></br>
                      <SpotifyPlayer
                        view="list"
                        className="no-overflow"
                        theme="white"
                        scrolling="no"
                        // view ='coverart'
                        size={playerSize}
                        uri={postLink}
                      ></SpotifyPlayer>
                    </React.Fragment>
                  )}
                  {postLink.includes("twitter.com") && (
                    <TwitterTweetEmbed
                      tweetId={getTweetId(postLink)}
                    ></TwitterTweetEmbed>
                  )}
                  {/* <p>Attachment: <a target="_blank" rel="noopener noreferrer" href={posts.attachment}>{(attachment === 'null') ? "No File Uploaded":formatFilename(attachment)}</a></p> */}
                </span>
                <br />
                <p>
                  Posted at:{" "}
                  {new Date(createdAt).toLocaleString([], {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
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
      <div className="posts pb-5 mt-4 mb-3">
        <ListGroup>{!isLoading && renderPostsList(posts)}</ListGroup>
      </div>
    );
  }
  return (
    <div className="Home">
      <div className="lander">
        <h1 className="font-weight-bold pb-3 mt-4 mb-3">Your Posts</h1>
        <div className="d-block justify-content-center">
          {isAuthenticated ? renderPosts() : renderLander()}
        </div>
      </div>
    </div>
  );
}
