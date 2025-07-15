import React from "react";
import HeadingText from "../../UI/HeadingText";

const QnaSection = () => {
  return (
    <div className="space-y-4">
      <HeadingText>Skill Spark Help Center</HeadingText>
      {/* Q1 */}
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title font-semibold">
          How do I create an account?
        </div>
        <div className="collapse-content">
          Click the "Sign Up" button in the top right corner and follow the
          registration process.
        </div>
      </div>

      {/* Q2 */}
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          I forgot my password. What should I do?
        </div>
        <div className="collapse-content">
          Click on "Forgot Password" on the login page and follow the
          instructions sent to your email.
        </div>
      </div>

      {/* Q3 */}
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          What is Skill Spark and who is it for?
        </div>
        <div className="collapse-content">
          Skill Spark is an online learning platform for students, teachers, and
          admins. It offers class management, enrollment, and feedback in a
          modern, interactive way.
        </div>
      </div>

      {/* Q4 */}
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          How do I become a teacher on Skill Spark?
        </div>
        <div className="collapse-content">
          Apply from the “Become a Teacher” section. After admin approval, your
          role will change to "teacher" and you can start creating classes.
        </div>
      </div>

      {/* Q5 */}
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          How does class enrollment and payment work?
        </div>
        <div className="collapse-content">
          Students can securely pay using Stripe and instantly gain access to
          the class content. The system automatically updates total enrollment.
        </div>
      </div>

      {/* Q6 */}
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          How are classes selected for highlights?
        </div>
        <div className="collapse-content">
          Classes with higher student enrollments are auto-selected and
          displayed in the "Highlight Section" of the homepage.
        </div>
      </div>

      {/* Q7 */}
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          Can I leave feedback after a class?
        </div>
        <div className="collapse-content">
          Yes, students can leave feedback after class completion. The feedback
          appears in the "Student Feedback" carousel.
        </div>
      </div>

      {/* Q8 */}
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          What statistics does Skill Spark track?
        </div>
        <div className="collapse-content">
          The platform shows total users, approved classes, and student
          enrollment numbers in the "Platform Statistics" section.
        </div>
      </div>
    </div>
  );
};

export default QnaSection;
