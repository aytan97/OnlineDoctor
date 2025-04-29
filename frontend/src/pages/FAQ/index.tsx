import AccordionFAQ from "../../shared/components/Accordion/AccordionFAQ";
import AskQuestionForm from "../../shared/components/FAQForm/FeedbackForm";
import Footer from "../../shared/layout/Footer";

const FAQ = () => {
  return (
    <>
      <div className="container">
        <div className="faq-container d-flex flex-column justify-center align-items-center">
          <div className="ask-question">
            <AskQuestionForm />
          </div>
          <div className="answered-questions flex-column d-flex align-items-center justify-center">
            <h1
              className="mb-4"
              style={{ fontSize: "30px", fontWeight: "400" }}
            >
              Questions from users
            </h1>
            <AccordionFAQ />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
