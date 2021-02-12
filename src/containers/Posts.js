import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { useForm } from "react-hook-form";
import config from "../config";
import LoaderButton from "../components/LoaderButton";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { s3Upload } from "../libs/awsLib";

export default function Posts() {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  
  useEffect(() => {
    function loadPost() {
      return API.get("posts", `/posts/${id}`);
    }

    async function onLoad() {
      try {
        const post = await loadPost();
        console.log(post);
        const {
          attachment,
        } = post;

        if (attachment) {
          post.attachmentURL = await Storage.vault.get(attachment);
        }
        
        setPost(post);
      } catch (e) {
        onError(e);
      }
    }
    console.log(post);
    onLoad();
  }, [id]);


  function validateForm() {
    return post.length > 0;
  }

  function savePost(post) {
    return API.put("posts", `/posts/${id}`, {
      body: post
    });
  }
  function formatFilename(str) {
    if (str != null) {
      return str.replace(/^\w+-/, "");
  }
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleFormSubmit(data, event) {
    let attachment;
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);
    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }
      await savePost({
        postBlurb: data.postBlurb,
        postLink: data.postLink,
        postLanguage: data.postLanguage,
        postKeywords: data.postKeywords,
        postRating: data.postRating,
        attachment: attachment || post.attachment,
      });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function deletePost() {
    return API.del("posts", `/posts/${id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deletePost();
      history.push("/");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }

  return (
    <React.Fragment>
      <div className="posts">
        (
        <div>
          <Card bg="dark" style={{ width: "80%" }} className="p-5 NewPost">
            <div className="NewPost">
              <Form onSubmit={handleSubmit(handleFormSubmit)}>
                <Form.Group controlId="PostBlurb">
                  <Form.Label className="labels">
                    Describe the Content
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    onChange={(e) => setPost(e.target.value)}
                    ref={register({ required: true })}
                    name="postBlurb"
                    value={post.postBlurb}
                  />
                  {errors.blurb && errors.blurb.type === "required" && (
                    <span className="noto" role="alert">
                      This is required
                    </span>
                  )}
                </Form.Group>
                <Form.Group controlId="PostLink">
                  <Form.Label className="labels">Post Link</Form.Label>
                  <Form.Control
                    value={post.postLink}
                    type="text"
                    onChange={(e) => setPost(e.target.value)}
                    ref={register({ required: true })}
                    name="postLink"
                  />
                </Form.Group>
                <Form.Group controlId="postLanguage">
                  <Form.Label className="labels">
                    What programming language?
                  </Form.Label>
                  <Form.Control
                    as="select"
                    id="postLanguage"
                    name="postLanguage"
                    size="3"
                    ref={register}
                  >
                    <option value="JavaScript">JavaScript</option>
                    <option value="HTML/CSS">HTML/CSS</option>
                    <option value="SQL">SQL</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="Shell Scripting">Shell Scripting</option>
                    <option value="C#">C#</option>
                    <option value="PHP">PHP</option>
                    <option value="C++">C++</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="C">C</option>
                    <option value="Ruby">Ruby</option>
                    <option value="Go">Go</option>
                    <option value="Assembly">Assembly</option>
                    <option value="Swift">Swift</option>
                    <option value="Kotlin">Kotlin</option>
                    <option value="Dart">Dart</option>
                    <option value="Objective-C">Objective-C</option>
                    <option value="Scala">Scala</option>
                    <option value="Rust">Rust</option>
                    <option value="Elixir">Elixir</option>
                    <option value="Clojure">Clojure</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="postKeywords">
                  <Form.Label className="labels">
                    Any Keywords? (Multiple Choice)
                  </Form.Label>
                  <Form.Control
                    as="select"
                    multiple
                    id="postKeywords"
                    name="postKeywords"
                    size="3"
                    ref={register}
                  >
                    <option value="Blog Post">Blog Post</option>
                    <option value="Podcast">Podcast</option>
                    <option value="Serverless">Serverless</option>
                    <option value="YouTube Video">YouTube Video</option>
                    <option value="Beginners">Beginners</option>
                    <option value="React">React</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Node">Node</option>
                    <option value="Career Advice">Career Advice</option>
                    <option value="GitHub">GitHub</option>
                    <option value="iOS Development">iOS Development</option>
                    <option value="Open Source">Open Source</option>
                    <option value="Testing">Testing</option>
                    <option value="Angular">Angular</option>
                    <option value="Vue">Vue</option>
                    <option value="Databases">Databases</option>
                    <option value="AWS">AWS</option>
                    <option value="Cloud">Cloud</option>
                    <option value="VS Code">VS Code</option>
                    <option value="Design">Design</option>
                    <option value="UI + UX">UI + UX</option>
                    <option value="Women in Tech">Women in Tech</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Firebase">Firebase</option>
                    <option value="Gatsby">Gatsby</option>
                    <option value="Next.js">Next.js</option>
                    <option value="APIs">APIs</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Game Development">Game Development</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="postRating">
                  <Form.Label className="labels">
                    Rate it, 1 to 5 Stars.
                  </Form.Label>
                  <br></br>
                  <Form.Control
                    as="select"
                    id="rating"
                    name="postRating"
                    size="3"
                    ref={register}
                    value={post.postRating}
                    onChange={(e) => setPost(e.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="file">
                  <Form.Label>Attachment</Form.Label>
                  {post.attachment && (
                    <p>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={post.attachmentURL}
                      >
                        {formatFilename(post.attachment)}
                      </a>
                    </p>
                  )}
                  <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
                <LoaderButton
                  block
                  type="submit"
                  size="lg"
                  variant="primary"
                  isLoading={isLoading}
                  disabled={!validateForm()}
                >
                  Share it
                </LoaderButton>
              </Form>
            </div>
          </Card>
          <LoaderButton
            size="lg"
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </div>
        )
      </div>
    </React.Fragment>
  );
}
