import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/components/GuideBook.css";

const GuideBook = () => {
  const contentMap = {
    Account: (
      <div>
        <div>
          <h3>Registering an Account</h3>
          <p>
            <strong>Access:</strong> Go to{" "}
            <a href="/register">localhost:5173/register</a>
          </p>
          <p>
            <strong>Fields:</strong>
          </p>
          <ul>
            <li>
              <strong>Username:</strong> Must be unique, at least 3 characters.
            </li>
            <li>
              <strong>Email:</strong> Must be a valid email format (e.g.,
              example@email.com).
            </li>
            <li>
              <strong>Password:</strong> Minimum 8 characters, including letters
              and numbers.
            </li>
            <li>
              <strong>Confirm Password:</strong> Must match the password.
            </li>
          </ul>
        </div>
        <div>
          <h3>Logging In</h3>
          <p>
            <strong>Access:</strong> Go to{" "}
            <a href="/login">localhost:5173/register/login</a>
          </p>
          <p>
            <strong>Fields:</strong>
          </p>
          <ul>
            <li>
              <strong>Username or Email:</strong> Must match your registered
              username or email.
            </li>
            <li>
              <strong>Password:</strong> Must match your registered password.
            </li>
          </ul>
        </div>
        <div>
          <h3>Forgot your password?</h3>
          <p>Contact admin or moderator to get your account back!</p>
        </div>
        <div>
          <h3>Change your email or password?</h3>
          <p>
            <strong>Access:</strong> Go to{" "}
            <a href="/dashboard">localhost:5173/dashboard</a>
          </p>
        </div>
      </div>
    ),
    Rules: (
      <div>
        <h2>Community Rules for Posting and Interaction</h2>
        <ol>
          <li>
            <strong>Posting Rules</strong>
            <ul>
              <li>
                Content must be original or properly credited to the source.
              </li>
              <li>
                Posts must not contain hate speech, violence, or explicit
                material (e.g., nudity, gore).
              </li>
              <li>No spam or repetitive advertising is allowed.</li>
              <li>
                Keep posts relevant and respectful to the community’s purpose.
              </li>
            </ul>
          </li>
          <li>
            <strong>Commenting Rules</strong>
            <ul>
              <li>
                Comments should be constructive and polite, even when
                disagreeing.
              </li>
              <li>
                No personal attacks, insults, or harassment of other users.
              </li>
              <li>
                Avoid off-topic or repetitive comments that disrupt discussions.
              </li>
            </ul>
          </li>
          <li>
            <strong>General Interaction Rules</strong>
            <ul>
              <li>
                Treat all members with respect, regardless of differences in
                opinion, background, or identity.
              </li>
              <li>
                Do not share private information (e.g., personal addresses,
                phone numbers) of yourself or others.
              </li>
              <li>
                Report violations instead of engaging in arguments or
                retaliation.
              </li>
            </ul>
          </li>
          <li>
            <strong>Content Standards</strong>
            <ul>
              <li>
                Use appropriate language; profanity is discouraged unless
                contextually justified.
              </li>
              <li>
                Misinformation or fake news must be avoided—verify facts before
                sharing.
              </li>
              <li>
                All uploads (images, links, etc.) must comply with copyright
                laws and community values.
              </li>
            </ul>
          </li>
          <li>
            <strong>Consequences</strong>
            <ul>
              <li>
                Violations may result in content removal, temporary suspension,
                or permanent bans, depending on severity.
              </li>
            </ul>
          </li>
        </ol>
      </div>
    ),
    "Privacy Policy and Terms": (
      <div>
        {/* Privacy Policy */}
        <h2>Privacy Policy</h2>
        <ol>
          <li>
            <strong>Information We Collect</strong>
            <ul>
              <li>
                Personal details (e.g., username, email) provided during
                registration.
              </li>
              <li>
                Content you create (e.g., posts, comments, uploaded files).
              </li>
              <li>
                Usage data (e.g., login times, IP address) for security and
                analytics.
              </li>
            </ul>
          </li>
          <li>
            <strong>How We Use Your Information</strong>
            <ul>
              <li>
                To manage your account and enable features like posting and
                commenting.
              </li>
              <li>To enhance our services and maintain a safe community.</li>
              <li>
                To notify you about updates or announcements (if you opt in).
              </li>
            </ul>
          </li>
          <li>
            <strong>Data Sharing</strong>
            <ul>
              <li>
                We do not sell or share your personal data with third parties,
                except:
              </li>
              <ul>
                <li>When legally required or to protect the community.</li>
                <li>
                  With trusted service providers under confidentiality
                  agreements.
                </li>
              </ul>
            </ul>
          </li>
          <li>
            <strong>Your Rights</strong>
            <ul>
              <li>
                You may request access, correction, or deletion of your data.
              </li>
              <li>You can opt out of non-essential communications anytime.</li>
            </ul>
          </li>
          <li>
            <strong>Security</strong>
            <ul>
              <li>
                We use encryption and secure servers to protect your data.
              </li>
              <li>
                No system is fully secure; use strong passwords and report
                issues.
              </li>
            </ul>
          </li>
          <li>
            <strong>Updates</strong>
            <ul>
              <li>
                Policy changes will be announced via email or community updates.
              </li>
            </ul>
          </li>
        </ol>

        {/* Terms of Service */}
        <h2>Terms of Service</h2>
        <ol>
          <li>
            <strong>Acceptance of Terms</strong>
            <ul>
              <li>
                By using our service, you agree to these Terms and our Privacy
                Policy.
              </li>
              <li>You must be at least 13 years old to use this platform.</li>
            </ul>
          </li>
          <li>
            <strong>Account Responsibilities</strong>
            <ul>
              <li>Keep your login credentials secure and do not share them.</li>
              <li>You are responsible for all activity under your account.</li>
            </ul>
          </li>
          <li>
            <strong>Content Ownership and Usage</strong>
            <ul>
              <li>
                You retain ownership of your content but grant us a license to
                display and distribute it.
              </li>
              <li>
                We may remove content that violates our Rules or these Terms.
              </li>
            </ul>
          </li>
          <li>
            <strong>Prohibited Actions</strong>
            <ul>
              <li>
                Do not use the service for illegal activities or to harm others.
              </li>
              <li>
                No hacking, scraping, or disrupting the platform’s
                functionality.
              </li>
            </ul>
          </li>
          <li>
            <strong>Termination</strong>
            <ul>
              <li>
                We may suspend or terminate your account for violations of these
                Terms.
              </li>
              <li>
                You can delete your account at any time via account settings.
              </li>
            </ul>
          </li>
          <li>
            <strong>Limitation of Liability</strong>
            <ul>
              <li>Our service is provided “as is” with no warranties.</li>
              <li>
                We are not liable for damages caused by your use of the
                platform.
              </li>
            </ul>
          </li>
          <li>
            <strong>Changes to Terms</strong>
            <ul>
              <li>
                We may update these Terms; continued use implies acceptance of
                changes.
              </li>
            </ul>
          </li>
        </ol>
      </div>
    ),
    "Fines and Appeals": (
      <div>
        <h2>Fines and Appeals</h2>
        <ol>
          <li>
            <strong>Fines</strong>
            <ul>
              <li>
                Violations of our Rules or Terms may result in penalties, such
                as:
              </li>
              <ul>
                <li>
                  Temporary suspension of posting or commenting privileges.
                </li>
                <li>Account restrictions for repeated offenses.</li>
                <li>Permanent bans for severe or intentional breaches.</li>
              </ul>
              <li>
                Fines are applied based on the severity and frequency of the
                violation.
              </li>
            </ul>
          </li>
          <li>
            <strong>Appeals</strong>
            <ul>
              <li>
                If you believe a penalty was applied unfairly, you may submit an
                appeal.
              </li>
              <li>
                To appeal, visit{" "}
                <a href="http://localhost:3000/appeals">
                  localhost:3000/appeals
                </a>{" "}
                and provide:
              </li>
              <ul>
                <li>Your account details (username or email).</li>
                <li>A brief explanation of your case.</li>
              </ul>
              <li>
                Appeals will be reviewed within 7 days, and decisions are final.
              </li>
            </ul>
          </li>
        </ol>
      </div>
    ),
    Report: (
      <div>
        <h2>Report</h2>
        <ol>
          <li>
            <strong>Reporting Violations</strong>
            <ul>
              <li>
                If you encounter content or behavior that violates our Rules
                (e.g., hate speech, spam, harassment), please report it.
              </li>
              <li>
                Use the "Report" button near the post, comment, or user profile,
                or submit details manually if needed.
              </li>
            </ul>
          </li>
          <li>
            <strong>What to Include</strong>
            <ul>
              <li>
                A brief description of the issue (e.g., “Offensive comment”).
              </li>
              <li>
                Relevant evidence, such as screenshots or links to the content.
              </li>
            </ul>
          </li>
          <li>
            <strong>Handling Reports</strong>
            <ul>
              <li>
                Reports are reviewed by our moderation team within 48 hours.
              </li>
              <li>
                Actions (e.g., content removal, user penalties) will be taken if
                the violation is confirmed.
              </li>
              <li>
                You may not receive individual updates, but we ensure all
                reports are addressed.
              </li>
            </ul>
          </li>
          <li>
            <strong>False Reporting</strong>
            <ul>
              <li>
                Submitting false or abusive reports may lead to penalties on
                your account.
              </li>
            </ul>
          </li>
        </ol>
        <h3>
          Thank you for reporting and helping to keep our community strong!
        </h3>
      </div>
    ),
    Improve: (
      <div>
        <h2>We Value Your Feedback</h2>
        <p>
          We’re committed to making our community better every day, and your
          input is essential! Please share your thoughts, suggestions, or ideas
          on how we can improve. Whether it’s about features, rules, or anything
          else, we’d love to hear from you. Submit your feedback at{" "}
          <Link to="/about#contactUs">Here</Link>. Thank you for helping us
          grow stronger together!
        </p>
      </div>
    ),
  };

  const [selectedContent, setSelectedContent] = useState(contentMap["Account"]);

  const titles = [
    "Account",
    "Rules",
    "Privacy Policy and Terms",
    "Fines and Appeals",
    "Report",
    "Improve",
  ];

  const handleTitleClick = (title) => {
    setSelectedContent(contentMap[title]);
  };

  return (
    <div className="guidebook">
      <div className="container-md">
        <div className="row">
          <div className="col-lg-9 border-line">
            <div className="content">{selectedContent}</div>
          </div>
          <div className="col-lg-3">
            <ul className="title-list">
              {titles.map((title, index) => (
                <li key={index}>
                  <button
                    className="title-button"
                    onClick={() => handleTitleClick(title)}
                  >
                    {title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideBook;
