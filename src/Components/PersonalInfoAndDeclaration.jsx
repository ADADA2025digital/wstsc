import React from "react";
import TextInput from "./Inputs/TextInput.jsx";
import { useEnrolmentForm } from "../Context/EnrolmentFormContext";

export default function PersonalInfoAndDeclaration() {
  const { formData, updateFormData, submitForm, loading, error, success } =
    useEnrolmentForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitForm();
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <section className="container bg-light p-3">
      <div className="row">
        <div className="col-md-6">
          <p className="text-muted">
            The personal information collected on this information form is for
            purposes directly related to your child's attendance at a community
            languages school, including the processing of applications for grant
            funding from the NSW Community Languages Schools Program,
            administered by the NSW Department of Education. <br />
            <br />
            Any information provided to the Department of Education and will be
            used, disclosed and stored consistent with the NSW privacy laws.{" "}
            <br />
            <br />
            Certain information is required by the Department of Education to
            meet its obligations in relation to data collection, reporting and
            the payment of grants. <br />
            <br />
            Information may be disclosed to NSW State and Commonwealth
            government agencies and other organisations for the purposes of
            confirming the eligibility of students for grant funding and as
            authorised or required by law. <br />
            <br />
            Information will be stored on a secure electronic database. You may
            access or correct the information by contacting your child's
            community language school. The community language school is
            responsible for advising the NSW Department of Education and of any
            corrections required to the electronic database. If you have a
            concern or complaint about the information collected or how it has
            been used or disclosed you should contact the community language
            school.
          </p>
        </div>

        <div className="col-md-6">
          <h2 className="h4 mb-3">Your consent and declaration</h2>
          <p className="text-muted">
            I have provided information related to the student in this enrolment
            form. <br /> <br />
            I consent to providing information contained on this enrolment form
            to the Department of Education and to confirm the accuracy of the
            information with other organisations that may also hold information
            related to the student named on page 1. <br /> <br />
            I have read the information on this page concerning the collection
            of personal information. <br /> <br />I declare that the information
            provided in this enrolment form is, to the best of my knowledge and
            belief, accurate and complete. <br /> <br />
            Where I have given personal information about other people I have
            done so with their authorisation. <br /> <br />I am aware that if
            information I have given is false or misleading, any decision made
            as a result of this enrolment form may be changed.
          </p>

          <div className="row">
            <div className="col-md-6">
              <TextInput
                id="firstParentCarerName"
                label="Name of first parent/carer"
                value={formData.personal_declaration.first_parent_carer_name}
                onChange={(value) =>
                  updateFormData(
                    "personal_declaration",
                    "first_parent_carer_name",
                    value
                  )
                }
                required
              />
              <p className="small">
                <i>
                  (at least one of the student's parents/carers must sign the
                  enrolment form)
                </i>
              </p>
            </div>
            <div className="col-md-6">
              <TextInput
                id="declarationDate1"
                label="Date"
                type="date"
                value={
                  formData.personal_declaration.first_parent_carer_name_date
                }
                onChange={(value) =>
                  updateFormData(
                    "personal_declaration",
                    "first_parent_carer_name_date",
                    value
                  )
                }
                required
              />
            </div>
            <div className="col-md-6">
              <TextInput
                id="secondParentCarerName"
                label="Name of second parent/carer (if applicable)"
                value={formData.personal_declaration.second_parent_carer_name}
                onChange={(value) =>
                  updateFormData(
                    "personal_declaration",
                    "second_parent_carer_name",
                    value
                  )
                }
              />
            </div>
            <div className="col-md-6">
              <TextInput
                id="declarationDate2"
                label="Date"
                type="date"
                value={
                  formData.personal_declaration.second_parent_carer_name_date
                }
                onChange={(value) =>
                  updateFormData(
                    "personal_declaration",
                    "second_parent_carer_name_date",
                    value
                  )
                }
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="container mt-5">
          <div className="row">
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
            <div className="col-12  d-flex justify-content-center align-items-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn globalbutton rounded-0 dark-text fw-bold fs-5 position-relative overflow-hidden"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submitting...
                  </>
                ) : (
                  "Submit Enrollment"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
