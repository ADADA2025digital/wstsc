import React from "react";
import PageHeader from "../Components/PageHeader";

const Home = () => {
  return (
    <>
      <div className="container-fluid py-5">
        <PageHeader
          breadcrumbs={[
            { label: "Home", href: "/", icon: "bi-house-fill" },
            { label: "Enrolment policy", active: true },
          ]}
        />
        <div className="container pt-5 p-0">
          <div className="row">
            <div className="col-md-12">
              <h1 className="heading dark-text">School Terms and Conditions</h1>

              <h5 className="mt-3 text-decoration-underline">
                Conditions of Enrolment for Western Sydney Tamil Study Centre
              </h5>

              <h6 className="fw-bold mt-4">
                <i>
                  Please read carefully prior to filling out the form online.
                </i>
              </h6>
              <ol>
                <li>
                  <h6 className="fw-bold">GENERAL</h6>
                  <p>
                    The completion of this Application for Enrolment signifies
                    your acceptance and agreement with the conditions relating
                    to the payment of fees and charges and to any other
                    condition or rule which may be implemented by the executive
                    committee or its representatives to ensure the orderly
                    conduct of the school.
                  </p>
                </li>

                <li>
                  <h6 className="fw-bold">CLASSROOM ALLOCATION</h6>
                  <p>
                    The new enrolment will be randomly allocated to a different
                    division of the same class OR to the division with a low
                    number of students if the class has more than one division.
                    The class allocation will also depend on the student's
                    fluency in the Tamil language.
                  </p>
                </li>

                <li>
                  <h6 className="fw-bold">ATTENDANCE AND ABSENCE</h6>
                  <p>
                    A student is expected to attend throughout the school year,
                    which is divided into four terms. Absenteeism may affect the
                    results or outcome of participation in competitions
                    conducted by the school and cultural festivals of the school
                    and other events organized by the school from time to time.
                  </p>
                </li>

                <li>
                  <h6 className="fw-bold">DISCIPLINE</h6>
                  <p>
                    Enrolment signifies agreement with the rules and regulations
                    of the school (as published on the information booklet which
                    is on the WTSC website, common sense, and appropriate
                    behaviour etc.) and intention to abide thereby.
                  </p>
                </li>
              </ol>

              <h6 className="fw-bold mt-3">APPLICATION and DECLARATION</h6>

              <ul className="lh-lg">
                <li>
                  I/We apply to have my/our child admitted to the school as
                  stated in the personal details.
                </li>
                <li>
                  I/We certify that all personal details supplied with this
                  application are true and correct.
                </li>
                <li>
                  I/We acknowledge and accept the rules and regulations as set
                  out in the Information Booklet
                </li>
                <li>
                  I/We have read and understood the School's Duty of Care
                  Policy.
                </li>
                <li>
                  I/We give permission to use my child's details to apply for
                  and monitor funding under the Community Language Program
                  (CLP). It will be used by the Department of Education and
                  Training (DET) to assess eligibility and monitor program
                  implementation.
                </li>
                <li>
                  I/We give permission to use my/our child's photo, video, and
                  work in any school communication in print and/or electronic
                  form, including but not limited to the annual school magazines
                  and publications, the school's official Facebook page, and the
                  school website.
                </li>
                <li>
                  In the event of acceptance by the school, I/we agree to be
                  responsible for the payment of all fees and charges and to be
                  bound by the regulations that may from time to time be made
                  for the smooth operation of the school and the Conditions of
                  Enrolment as stated above.
                </li>
                <li>
                  I/We understand that the school's primary mode of
                  communication with me/us regarding my/our child is via email.
                </li>
              </ul>

              <h6 className="fw-bold mt-3">MEDICAL DECLARATION GENERAL</h6>
              <p>
                In the event of illness or injury to my child while at the
                school or on an excursion, or travelling to or from school, I
                authorize the school senior staff member or a qualified first
                aider, or a qualified medical practitioner, if/where it is
                impossible to contact me for the consent of an emergency medical
                treatment, to provide necessary treatment and/or call an
                ambulance for further assistance if the condition of the child
                becoming worse.
              </p>

              <h6 className="fw-bold mt-3">PRIVACY OF INFORMATION</h6>
              <p>
                The information requested in this form is required for the
                purpose of the enrolment of a student by the school.
                Wentworthville Tamil Study Centre Inc. has a policy that covers
                the security, confidentiality, and privacy of information
                obtained. <br /> <br />
                The enrolment form looks plain, but it does the job. This form
                will be improved continuously over the coming months.
              </p>

              <p className="mt-4">
                If you accept these conditions, you can continue with the online
                enrolment. You will be provided with 2 tokens to resume
                enrolment at any time. Once you complete entering all necessary
                information, you can submit the enrolment for WSTSC
                administration to review and approve. Once submitted, kindly get
                in touch with WSTSC administration team by attending in-person
                at one of the campuses during operating hours or email for next
                steps.
              </p>

              <p className="mt-4">
                NB: You can pay school fees by{" "}
                <strong>Creative Kids Voucher (CKV)</strong>, or cash at the
                counter during school hours. Please send your Creative Kids
                Voucher to accounts@wtsc.org.au if you want to pay by{" "}
                <strong>CKV</strong>.
              </p>

              <p className="mt-4">Thank You</p>

              <p className="fw-bold">WSTSC Administration.</p>
            </div>
            <div className="row border-top">
              <div className="d-flex justify-content-center mt-4">
                <a
                  href="/enrolment"
                  className="badge banner-bg text-white p-3 fs-6 rounded-0 text-decoration-none"
                >
                  I Agree with the above Terms and Conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
