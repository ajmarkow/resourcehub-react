import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import config from "../config";
import "./NewPost.css";
import Card from "react-bootstrap/Card";
import StarRatingComponent from "react-star-rating-component";
import { useForm } from "react-hook-form";

const contentFilters = ["beginner", "intermediate", "advanced"];

export default function NewPost() {
  const file = useRef(null);
  const history = useHistory();
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  // const handleSettingContent = (data) => console.log(data);
  const onSubmit = (data) => console.log(data);

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  function handleSettingContent(event) {
    setContent([...content, event.target.value]);
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="PostBlurb">
            <Form.Label className="labels">Describe the Content</Form.Label>
            <Form.Control
              // value={content}
              as="textarea"
              onChange={(e) => e.target.value}
              ref={register}
              name="blurb"
            />
          </Form.Group>
          <Form.Group controlId="PostLink">
            <Form.Label className="labels">Post Link</Form.Label>
            <Form.Control
              // value={content}
              type="text"
              onChange={handleSettingContent}
              ref={register}
              name="link"
            />
          </Form.Group>
          <Form.Group controlId="PostLanguage">
            <Form.Label className="labels">
              What programming language?
            </Form.Label>
            <Form.Control
              // value={content}
              type="text"
              onChange={handleSettingContent}
              ref={register}
              name="labels"
            />
          </Form.Group>
          <Form.Group controlId="postKeywords">
            <Form.Label className="labels">Any Keywords?</Form.Label>
            {contentFilters.map((level, index) => {
              return (
                <Form.Label
                  key={index}
                  control={
                    <Form.Check
                      checked="false"
                      type="checkbox"
                      onChange={handleSettingContent}
                      name={level}
                      ref={register}
                    />
                  }
                  label={level}
                />
              );
            })}
          </Form.Group>
          <Form.Group controlId="postRating">
            <Form.Label className="labels">Rate it, 1 to 5 Stars.</Form.Label>
            <br></br>
            <StarRatingComponent
              name="rating"
              editing={true}
              renderStarIcon={() => <span>⭐</span>}
              starCount={5}
              value={1}
            />
          </Form.Group>
          <Form.Group controlId="Attachment">
            <Form.Label className="labels">Attach a related file</Form.Label>
            <Form.Control
              onChange={handleFileChange}
              type="file"
              variant="secondary"
              ref={register}
              name="file"
            />
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
  );
}
