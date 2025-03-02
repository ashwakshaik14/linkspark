import LOGO from "../assets/Frame.png";
import style from "../styles/Landing.module.css";
import analytics from "../assets/Analytics.png";
import rev from "../assets/div.png";
import copu from "../assets/copu.png";
import star from "../assets/star.png";
import avatar from "../assets/avatar.png";
import sq1 from "../assets/sq1.png";
import sq2 from "../assets/sq2.png";
import sq3 from "../assets/sq3.png";
import sq4 from "../assets/sq4.png";
import sq5 from "../assets/sq5.png";
import sq6 from "../assets/sq6.png";
import sq7 from "../assets/sq7.png";
import sq8 from "../assets/sq8.png";
import sq9 from "../assets/sq9.png";
import { BiLogoInstagramAlt, BiLogoTwitter } from "react-icons/bi";
import { FaYoutube, FaTiktok } from "react-icons/fa";
import { SiSparkpost } from "react-icons/si";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Landing() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <>
      <div className={style.Landing}>
        <nav className={style.Nav}>
          <img src={LOGO} alt="logo" />
          <button onClick={() => navigate("/register")}>Sign Up Free</button>
        </nav>
        <div className={style.get}>
          <div className={style.txt}>
            <h1>
              The easiest place to
              <br /> update and share your
              <br /> Connection
            </h1>
            <h3>
              Help your followers discover everything you’re sharing
              <br /> all over the internet, in one simple place. They’ll thank
              you
              <br /> for it!
            </h3>
            <button onClick={() => navigate("/register")}>
              {" "}
              get your free spark
            </button>
          </div>
          <div>
            <img src={analytics} alt="analytics" />
          </div>
        </div>
        <div className={style.pet}>
          <div>
            <img src={rev} alt="div" />
            <h3>
              Sell products and collect payments. It’s
              <br /> monetization made simple.
            </h3>
          </div>
          <div>
            <h1>
              Analyze your audience
              <br /> and keep your followers
              <br /> engaged
            </h1>
            <h4>
              Track your engagement over time, monitor revenue and learn
              <br /> what’s converting your audience. Make informed updates on
              the fly
              <br /> to keep them coming back.
            </h4>
          </div>
        </div>
        <div className={style.tet}>
          <div className={style.txt}>
            <h1>
              Share limitless content
              <br /> in limitless ways
            </h1>
            <h4>
              Connect your content in all its forms and help followers find more
              of what they’re looking for. Your TikToks, Tweets, YouTube videos,
              music, articles, recipes, podcasts and more… It all comes together
              in one powerful place
            </h4>
          </div>
          <div className={style.threepic}>

            <img src={copu} alt="tree" />
          </div>
        </div>
        <div className={style.met}>
          <div className={style.star_left}>
            <h1>
              Here&apos;s what our{" "}
              <span style={{ color: "#1DA35E" }}>customer</span>
              <br /> has to say
            </h1>
            <button>Read customer stories</button>
          </div>
          <div className={style.star}>
            <div>
              <img src={star} alt="star" />
            </div>

            <h5>
              [short description goes in here] lorem
              <br /> ipsum is a placeholder text to
              <br /> demonstrate.
            </h5>
          </div>
        </div>
        <div className={style.testimonials_container}>
          <div
            className={style.testimonial_card}
            style={{ backgroundColor: "#DEDEDE" }}
          >
            <h2>Amazing tool! Saved me months</h2>
            <p>
              This is a placeholder for your testimonials and what your client
              has to say, put them here and make sure it’s 100% true and
              meaningful.
            </p>
            <div className={style.testimonial_user}>
              <img src={avatar} alt="User Avatar" />
              <div>
                <h4>John Master</h4>
                <p>Director, Spark.com</p>
              </div>
            </div>
          </div>

          <div className={style.testimonial_card}>
            <h2>Amazing tool! Saved me months</h2>
            <p>
              This is a placeholder for your testimonials and what your client
              has to say, put them here and make sure it’s 100% true and
              meaningful.
            </p>
            <div className={style.testimonial_user}>
              <img src={avatar} alt="User Avatar" />
              <div>
                <h4>John Master</h4>
                <p>Director, Spark.com</p>
              </div>
            </div>
          </div>

          <div className={style.testimonial_card}>
            <h2>Amazing tool! Saved me months</h2>
            <p>
              This is a placeholder for your testimonials and what your client
              has to say, put them here and make sure it’s 100% true and
              meaningful.
            </p>
            <div className={style.testimonial_user}>
              <img src={avatar} alt="User Avatar" />
              <div>
                <h4>John Master</h4>
                <p>Director, Spark.com</p>
              </div>
            </div>
          </div>

          <div
            className={style.testimonial_card}
            style={{ backgroundColor: "#DEDEDE" }}
          >
            <h2>Amazing tool! Saved me months</h2>
            <p>
              This is a placeholder for your testimonials and what your client
              has to say, put them here and make sure it’s 100% true and
              meaningful.
            </p>
            <div className={style.testimonial_user}>
              <img src={avatar} alt="User Avatar" />
              <div>
                <h4>John Master</h4>
                <p>Director, Spark.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.apps}>
          <h1>All Link Apps and Integrations</h1>
          <div className={style.apps_details}>
            <div className={style.block}>
              <div>
                <img src={sq1} alt="sq1" />
              </div>
              <div>
                <h1>Audio mark</h1>
                <p>Add an Audiomack player to your Linktree</p>
              </div>
            </div>
            <div className={style.block}>
              <div>
                <img src={sq2} alt="sq1" />
              </div>
              <div>
                <h1>Bandsintown</h1>
                <p>Drive ticket sales by listing your events</p>
              </div>
            </div>
            <div className={style.block}>
              <div>
                <img src={sq3} alt="sq1" />
              </div>
              <div>
                <h1>Bonfire</h1>
                <p>Display and sell your custom merch</p>
              </div>
            </div>
            <div className={style.block}>
              <div>
                <img src={sq4} alt="sq1" />
              </div>
              <div>
                <h1>Books</h1>
                <p>Promote books on your Linktree</p>
              </div>
            </div>
            <div className={style.block}>
              <div>
                <img src={sq5} alt="sq1" />
              </div>
              <div>
                <h1>Buy me a gift</h1>
                <p>Let visitors support you with a small gift</p>
              </div>
            </div>
            <div className={style.block}>
              <div>
                <img src={sq6} alt="sq1" />
              </div>
              <div>
                <h1>Cameo</h1>
                <p>Make impossible fan connections possible</p>
              </div>
            </div>
            <div className={style.block}>
              <div>
                <img src={sq7} alt="sq1" />
              </div>
              <div>
                <h1>Clubhouse</h1>
                <p>Let your community in on the conversation</p>
              </div>
            </div>
            <div className={style.block}>
              <div>
                <img src={sq8} alt="sq1" />
              </div>
              <div>
                <h1>Community</h1>
                <p>Build an SMS subscriber list</p>
              </div>
            </div>
            <div className={style.block}>
              <div>
                <img src={sq9} alt="sq1" />
              </div>
              <div>
                <h1>Contact Details</h1>
                <p>Easily share downloadable contact details</p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.footer}>
          <div className={style.footerContent}>
            <div className={style.authButtons}>
              <button
                className={style.loginButton}
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
              <button
                className={style.signupButton}
                onClick={() => navigate("/register")}
              >
                Sign up free
              </button>
            </div>
            <div className={style.container}>
              <div className={style.linksGrid}>
                <div>
                  <p className={style.sectionTitle}>About Spark</p>
                  <ul>
                    <li>Blog</li>
                    <li>Press</li>
                    <li>Social Good</li>
                    <li>Contact</li>
                  </ul>
                </div>
                <div>
                  <p className={style.sectionTitle}>Careers</p>
                  <ul>
                    <li>Getting Started</li>
                    <li>Features and How-Tos</li>
                    <li>FAQs</li>
                    <li>Report a Violation</li>
                  </ul>
                </div>
                <div>
                  <p className={style.sectionTitle}>Legal</p>
                  <ul>
                    <li>Terms and Conditions</li>
                    <li>Privacy Policy</li>
                    <li>Cookie Notice</li>
                    <li>Trust Center</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={style.acknowledgment}>
            <p>
              We acknowledge the Traditional Custodians of the land on which our
              office stands, The Wurundjeri
              <br /> people of the Kulin Nation, and pay our respects to Elders
              past, present and emerging.
            </p>
            <div className={style.socialIcons}>
              <BiLogoTwitter />
              <BiLogoInstagramAlt />
              <FaYoutube />
              <FaTiktok />
              <SiSparkpost />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
