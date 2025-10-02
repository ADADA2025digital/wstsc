import React, { useState } from "react";
import FamilyDetails from "../Components/FamilyDetails";
import FamilyDetailsPhase2 from "../Components/FamilyDetailsPhase2";
import FamilyDetailsPhase3 from "../Components/FamilyDetailsPhase3";
import PersonalInfoAndDeclaration from "../Components/PersonalInfoAndDeclaration";
import SectionHeader from "../Components/SectionHeader";
import StudentDetails from "../Components/StudentDetails";
import { useEnrolmentForm } from "../Context/EnrolmentFormContext";
import Logo from "../assets/Images/logo.jpg";

const Enrolment = () => {
  const { error, success } = useEnrolmentForm();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { component: StudentDetails, title: "Student details" },
    {
      component: FamilyDetails,
      title: "Family details - Parent/Carer Information",
    },
    {
      component: FamilyDetailsPhase2,
      title: "Family details - Contact Information",
    },
    {
      component: FamilyDetailsPhase3,
      title: "Family details - Additional Details",
    },
    {
      component: PersonalInfoAndDeclaration,
      title: "Personal information and declaration of accuracy",
    },
  ];

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <>
      <div className="container-fluid py-5">
        {/* Form Header */}
        <header className="banner-bg container p-5 d-flex align-items-center">
          <div className="row">
            <div className="col-lg-12 d-flex flex-column align-items-start justify-content-end mt-3">
              <div className="d-flex gap-3 align-items-center">
                <img
                  src={Logo}
                  alt=""
                  style={{ width: "80px", height: "80px" }}
                />{" "}
                <h4 className="text-white">
                  Western Sydney Tamil Study Centre
                </h4>
              </div>
              <h1 className="display-5 fw-bold text-white mb-2">
                NSW Community Languages Schools Program
              </h1>
              <h3 className="text-white-50 mb-0">
                Student enrolment and parent/carer consent form
              </h3>
            </div>
          </div>
        </header>

        {/* Progress Indicator - Numbered Circles */}
        <div className="container py-4">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <div className="d-flex align-items-center">
                  {steps.map((step, index) => {
                    const isCompleted = index <= currentStep;
                    const isCurrent = index === currentStep;

                    return (
                      <React.Fragment key={index}>
                        {/* Step Circle */}
                        <div
                          className={`rounded-circle d-flex align-items-center justify-content-center ${
                            isCompleted
                              ? "banner-bg text-white"
                              : "border border-secondary bg-white text-secondary"
                          }`}
                          style={{
                            width: "40px",
                            height: "40px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            borderWidth: "2px",
                            boxShadow: isCurrent ? "0 0 0 3px #295b66" : "none",
                          }}
                        >
                          {index + 1}
                        </div>

                        {index < steps.length - 1 && (
                          <div
                            className={`mx-2 ${
                              isCompleted ? "banner-bg" : "bg-light"
                            }`}
                            style={{
                              width: "60px",
                              height: "3px",
                              borderRadius: "2px",
                            }}
                          ></div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-4">
          <div className="row">
            <div className="col-lg-10 p-0">
              <h5 className="dark-text text-secondary mb-3">
                This enrolment and parent/carer consent form is to be completed
                in English.
              </h5>
              <p className="text-muted">
                Student details provided on the form should match those provided
                to the student's day school. A separate form is to be completed
                for each student annually.
              </p>
            </div>
          </div>
        </div>

        {/* Global Status Messages */}
        {error && (
          <div className="container">
            <div className="alert alert-danger" role="alert">
              Error: {error}
            </div>
          </div>
        )}

        {success && (
          <div className="container">
            <div className="alert alert-success" role="alert">
              Student enrollment submitted successfully!
            </div>
          </div>
        )}

        {/* Form Body */}
        <div>
          <SectionHeader title={steps[currentStep].title} />
          <CurrentComponent onNext={handleNext} />

          {/* Navigation Buttons */}
          {currentStep > 0 && (
            <div className="container py-3 px-0">
              <div className="row">
                <div className="col-12 d-flex justify-content-between">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="btn globalbutton rounded-0 dark-text fw-bold fs-5 position-relative overflow-hidden"
                  >
                    Previous Step
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Enrolment;