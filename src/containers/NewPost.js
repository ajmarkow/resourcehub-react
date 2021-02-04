import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import config from "../config";
import "./NewPost.css";
import Card from "react-bootstrap/Card";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useForm } from "react-hook-form";
import { API } from "aws-amplify";

const contentFilters = ["beginner", "intermediate", "advanced"];
const options = [1, 2, 3, 4, 5];

export default function NewPost() {
  const file = useRef(null);
  const history = useHistory();
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [starRating, setStarRating] = useState(1);

  const { register, handleSubmit, errors } = useForm();

  async function handleFormSubmit(data) {
    console.log(data);
    setIsLoading(true);

    try {
      await createPost({
        postBlurb: data.postBlurb,
        postLink: data.postLink,
        postLanguage: data.postLanguage,
        postKeywords: data.postKeywords,
        postRating: data.postRating,
        attachment: data.attachment,
      });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createPost(post) {
    setIsLoading(false);
    const sentPost = API.post("posts", "/posts", {
      body: post,
    });
    console.log(sentPost);
    return sentPost;
  }

  // function validateForm() {
  //   return content.length > 0;
  // }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  function onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  // async function handleSubmit(event) {
  //   event.preventDefault();

  //   if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
  //     alert(
  //       `Please pick a file smaller than ${
  //         config.MAX_ATTACHMENT_SIZE / 1000000
  //       } MB.`
  //     );
  //     return;
  //   }

  //   setIsLoading(true);

  // }

  return (
    <Card bg="dark" style={{ width: "80%" }} className="p-5 NewPost">
      <div classname="NewPost">
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Form.Group controlId="PostBlurb">
            <Form.Label className="labels">Describe the Content</Form.Label>
            <Form.Control
              // value={content}
              as="textarea"
              // onChange={(e) => e.target.value}
              ref={register({ required: true })}
              name="postBlurb"
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
              // value={content}
              type="text"
              // onChange={(e) => e.target.value}
              ref={register({ required: true })}
              name="postLink"
            />
          </Form.Group>
          <Form.Group controlId="postLanguage">
            <Form.Label className="labels">
              What programming language?
            </Form.Label>
            <Form.Control
              // value={content}
              type="text"
              // onChange={(e) => e.target.value}
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
            >
              <option value="Tutorial">Tutorial</option>
              <option value="Blog Post">Blog Post</option>
              <option value="Youtube Video">Youtube Video</option>
              <option value="Podcast">Podcast</option>
              <option value="Documentation">Documentation</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="postRating">
            <Form.Label className="labels">Rate it, 1 to 5 Stars.</Form.Label>
            <br></br>
            <Form.Control
              as="select"
              id="rating"
              name="postRating"
              size="3"
              ref={register}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="Attachment">
            <Form.Label className="labels">Attach a related file</Form.Label>
            <Form.Control
              // onChange={handleFileChange}
              type="file"
              variant="secondary"
              ref={register}
              name="attachment"
            />
          </Form.Group>
          <LoaderButton
            block
            type="submit"
            size="lg"
            variant="primary"
            isLoading={isLoading}
            // disabled={!validateForm()}
          >
            Share it
          </LoaderButton>
        </Form>
      </div>
    </Card>
  );
}
