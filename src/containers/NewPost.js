import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import config from "../config";
import "./NewPost.css";
import Card from "react-bootstrap/Card";
import "react-dropdown/style.css";
import { useForm } from "react-hook-form";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";

// const contentFilters = ["beginner", "intermediate", "advanced"];
// const options = [1, 2, 3, 4, 5];

export default function NewPost() {
  const file = useRef(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  async function handleFormSubmit(data) {
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
      const attachment = file.current ? await s3Upload(file.current) : null;
      await createPost({
        postBlurb: data.postBlurb,
        postLink: data.postLink,
        postLanguage: data.postLanguage,
        postKeywords: data.postKeywords,
        postRating: data.postRating,
        attachment: `${attachment}`,
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

  return (
    <Card bg="dark" className="p-5 NewPost">
      <Button className='font-weight-bold' variant='light' onClick={() => history.goBack()}>Back</Button>
      {/* <h4>Create a New Post</h4> */}
      <br></br>
      <div className="NewPost">
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Form.Group controlId="PostBlurb">
            <Form.Label className="labels">Describe the Content</Form.Label>
            <Form.Control
              // value={content}
              as="textarea"
              onChange={(e) => e.target.value}
              ref={register({ required: true })}
              name="postBlurb"
            />
            {errors.postBlurb && errors.postBlurb.type === "required" && (
              <span className="noto" role="alert">
                <h6>A description is required.</h6>
              </span>
            )}
            {errors.postLink && (
              <h6 className="noto">Make sure you enter a valid web address.</h6>
            )}
          </Form.Group>
          <Form.Group controlId="PostLink">
            <Form.Label className="labels">Post Link</Form.Label>
            <Form.Control
              // value={content}
              type="text"
              onChange={(e) => e.target.value}
              ref={register({
                required: true,
                pattern: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i,
              })}
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
              onChange={(e) => e.target.value}
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
              onChange={handleFileChange}
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
