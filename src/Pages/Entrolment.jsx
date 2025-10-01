import React from 'react';
import FamilyDetails from "../Components/FamilyDetails";
import FamilyDetailsPhase2 from "../Components/FamilyDetailsPhase2";
import FamilyDetailsPhase3 from "../Components/FamilyDetailsPhase3";
import PersonalInfoAndDeclaration from "../Components/PersonalInfoAndDeclaration";
import SectionHeader from "../Components/SectionHeader";
import StudentDetails from "../Components/StudentDetails";
import { useEnrolmentForm } from '../Context/EnrolmentFormContext';

const Enrolment = () => {
  const { submitForm, loading, error, success } = useEnrolmentForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitForm();
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <>
      <div className="container-fluid py-5">
        {/* Form Header */}
        <header className="banner-bg container p-5 d-flex align-items-center">
          <div className="row">
            <div className="col-lg-12 d-flex flex-column align-items-start justify-content-end mt-5">
              <h1 className="display-5 fw-bold text-white mb-2">
                NSW Community Languages Schools Program
              </h1>
              <h3 className="text-white-50 mb-0">
                Student enrolment and parent/carer consent form
              </h3>
            </div>
          </div>
        </header>

        <div className="container py-4">
          <div className="row">
            <div className="col-lg-10 p-0">
              <h5 className="dark-text text-secondary mb-3">
                This enrolment and parent/carer consent form is to be completed in English.
              </h5>
              <p className="text-muted">
                Student details provided on the form should match those provided to the student's day school. A separate form is to be completed for each student annually.
              </p>
            </div>
          </div>
        </div>

        {/* Status Messages */}
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
        <form onSubmit={handleSubmit}>
          <SectionHeader title="Student details" />
          <StudentDetails />

          <SectionHeader title="Family details - Parent/Carer Information" className="mt-5" />
          <FamilyDetails />

          <SectionHeader title="Family details - Contact Information" className="mt-5" />
          <FamilyDetailsPhase2 />

          <SectionHeader title="Family details - Additional Details" className="mt-5" />
          <FamilyDetailsPhase3 />

          <SectionHeader
            title="Personal information and declaration of accuracy"
            className="mt-5"
          />
          <PersonalInfoAndDeclaration />
        </form>
      </div>
    </>
  );
};

export default Enrolment;