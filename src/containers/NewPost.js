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
import { useAppContext } from "../libs/contextLib";

// const contentFilters = ["beginner", "intermediate", "advanced"];
// const options = [1, 2, 3, 4, 5];

export default function NewPost() {
  const file = useRef(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAppContext();
  const { register, handleSubmit, errors } = useForm();

  async function handleFormSubmit(data) {
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000
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

  if (isAuthenticated) {
    return (
      <Card bg="dark" className="p-5 NewPost">
        <Button
          className="font-weight-bold"
          variant="light"
          onClick={() => history.goBack()}
        >
          Back
        </Button>
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
                <h6 className="noto">
                  Make sure you enter a valid web address.
                </h6>
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
  } else return (
    <Card className="p-5 warningcard">
      <h1> Please Log In.</h1>
      <p className='bigemoji'> 😟 </p>
    </Card>
  );
}
