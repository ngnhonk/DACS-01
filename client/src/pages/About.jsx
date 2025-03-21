import React from "react";
import "../styles/pages/About.css";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="about-page">
      <div className="section-one">
        <div className="container-md">
          <div className="inner-content">
            <h4>Tech Community</h4>
            <h2>KNOWLEDGE IS POWER!</h2>
            <p>
              Join our thriving community, share knowledge, and grow together.
              Be successful!
            </p>
            <div className="button-block">
              <button>
                <Link to="/posts">Join Now</Link>
              </button>
              <button><Link to="/chat">Chat Now</Link></button>
              <button><Link to="#contactUs">Contact</Link></button>
            </div>
          </div>
        </div>
      </div>

      <div className="section-two">
        <div className="container-md">
          <div className="inner-content">
            <h2>Varied Categories</h2>
            <div className="row">
              <div className="col-md-2">
                <div className="category">
                  <i className="fa-solid fa-laptop"></i>Electronics
                </div>
              </div>
              <div className="col-md-2">
                <div className="category">
                  <i className="fa-solid fa-code"></i>Development
                </div>
              </div>
              <div className="col-md-2">
                <div className="category">
                  <i className="fa-regular fa-heart"></i>Life
                </div>
              </div>
              <div className="col-md-2">
                <div className="category">
                  <i className="fa-regular fa-calendar-days"></i>Event
                </div>
              </div>
              <div className="col-md-2">
                <div className="category">
                  <i className="fa-solid fa-book"></i>Knowledge
                </div>
              </div>
              <div className="col-md-2">
                <div className="category" style={{ color: "blue" }}>
                  <i className="fa-solid fa-plus"> 60</i>Categories
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-three">
        <div className="container-md">
          <div className="inner-content">
            <h2>Our Goal</h2>
            <p>
              Our Goal At our core, we strive to build a strong and thriving
              community where people come together to grow and support one
              another. Our platform is a safe space for sharing valuable
              knowledge, fostering meaningful discussions, and exchanging
              insights that enrich our lives. We are committed to answering
              questions, offering guidance, and providing support for various
              challenges in life. Our mission is to bring immense value to our
              members, ensuring that everyone finds inspiration, learning
              opportunities, and connections that matter. Beyond conversations,
              we aim to create impactful events that celebrate culture, life,
              and the spirit of togetherness. Join us in shaping a community
              that empowers, educates, and uplifts!
            </p>

            <div className="flex-ul">
              <ul>
                <li>
                  <i className="fa-regular fa-circle-check"></i>Building a Strong
                  and Thriving Community
                </li>
                <li>
                  <i className="fa-regular fa-circle-check"></i>A Safe Space for
                  Sharing Valuable Knowledge
                </li>
              </ul>
              <ul>
                <li>
                  <i className="fa-regular fa-circle-check"></i>Providing Answers,
                  Guidance, and Life Support
                </li>
                <li>
                  <i className="fa-regular fa-circle-check"></i>Bringing Great Value
                  to Our Community Members
                </li>
              </ul>
              <ul>
                <li>
                  <i className="fa-regular fa-circle-check"></i>Creating Meaningful
                  Cultural and Life Events for Everyone.
                </li>
                <li>
                  <i className="fa-regular fa-circle-check"></i>Listening to Users'
                  Feedback and Willing to Make Changes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="section-four">
        <div className="container-md">
          <div className="inner-content">
            <div className="row">
              <div className="col-md-7">
                <div className="text-content">
                  Ask questions to the community, share your story, answer
                  questions. Feel free and be yourself. Have fun!
                </div>
              </div>
              <div className="col-md-5">
                <ul>
                  <li>
                    <button>
                    <Link to="/posts">Join Now</Link>
                    </button>
                  </li>
                  <li>
                    <button>
                    <Link to="/posts">Join Now</Link>
                    </button>
                  </li>
                  <li>
                    <button>
                    <Link to="/posts">Join Now</Link>
                    </button>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-five" id="contactUs">
        <div className="container-md">
          <div className="inner-content">
            <h2>Help us improve!</h2>
            <form>
              <div className="input-group">
                <input type="text" placeholder="Your name" required />
                <input type="email" placeholder="Email address" required />
                <input type="text" placeholder="Problem" required />
              </div>
              <textarea placeholder="Problem Details" required></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>

      {/*-----*/}
    </div>
  );
}

export default AboutPage;
