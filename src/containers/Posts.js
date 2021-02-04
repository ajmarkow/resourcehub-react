import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { useForm } from "react-hook-form";
import NewPost from "./NewPost";
import config from "../config";
import LoaderButton from "../components/LoaderButton";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

export default function Posts() {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [post, setPost] = useState(null);
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
          postBlurb,
          postKeywords,
          postLink,
          postRating,
          postLanguage,
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

    onLoad();
  }, [id]);

  function validateForm() {
    return post.length > 0;
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleFormSubmit(event) {
    let attachment;

    // event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);
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
  }

  return (
    <React.Fragment>
      <div className="posts">
        {post && (
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
                      value={post.postLanguage}
                      type="text"
                      onChange={(e) => setPost(e.target.value)}
                      ref={register({ required: true })}
                      name="postLanguage"
                    />
                  </Form.Group>
                  <Form.Group controlId="postKeywords">
                    <Form.Label className="labels">Any Keywords?</Form.Label>
                    <Form.Control
                      as="select"
                      multiple
                      name="postKeywords"
                      size="3"
                      ref={register}
                      value={post.postKeywords}
                      onChange={(e) => setPost(e.target.value)}
                    >
                      <option value="Tutorial">Tutorial</option>
                      <option value="Blog Post">Blog Post</option>
                      <option value="Youtube Video">Youtube Video</option>
                      <option value="Podcast">Podcast</option>
                      <option value="Documentation">Documentation</option>
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
        )}
      </div>
    </React.Fragment>
  );
}
