import React from "react";
import TextInput from "./Inputs/TextInput.jsx";
import RadioGroup from "./Inputs/RadioGroup.jsx";
import { useEnrolmentForm } from "../Context/EnrolmentFormContext";
import SelectInput from "./Inputs/SelectInput.jsx";

export default function StudentDetails({ onNext }) {
  const { formData, updateFormData, validateField, getError, validateSection } =
    useEnrolmentForm();

  const handleInputChange = (section, field, value) => {
    updateFormData(section, field, value);
  };

  const handleBlur = (section, field) => {
    const value = formData[section][field];
    validateField(section, field, value);
  };

  const handleNext = () => {
    // Validate the entire student section
    const isValid = validateSection("student");

    if (isValid && onNext) {
      onNext();
    }
  };

  return (
    <section className="container bg-light p-3">
      <h4 className="dark-text mb-3">A. Student details</h4>

      <div className="row">
        <div className="col-md-3">
          <TextInput
            id="studentFamilyName"
            label="Family name"
            value={formData.student.family_name}
            onChange={(value) =>
              handleInputChange("student", "family_name", value)
            }
            onBlur={() => handleBlur("student", "family_name")}
            error={getError("student", "family_name")}
            required
          />
        </div>
        <div className="col-md-3">
          <TextInput
            id="studentFirstName"
            label="First given name"
            value={formData.student.first_given_name}
            onChange={(value) =>
              handleInputChange("student", "first_given_name", value)
            }
            onBlur={() => handleBlur("student", "first_given_name")}
            error={getError("student", "first_given_name")}
            required
          />
        </div>
        <div className="col-md-3">
          <TextInput
            id="studentSecondName"
            label="Second given name"
            value={formData.student.second_given_name}
            onChange={(value) =>
              handleInputChange("student", "second_given_name", value)
            }
            onBlur={() => handleBlur("student", "second_given_name")}
            error={getError("student", "second_given_name")}
            required
          />
        </div>
        <div className="col-md-3">
          <TextInput
            id="studentPreferredName"
            label="Preferred first name"
            value={formData.student.preferred_first_name}
            onChange={(value) =>
              handleInputChange("student", "preferred_first_name", value)
            }
            onBlur={() => handleBlur("student", "preferred_first_name")}
            error={getError("student", "preferred_first_name")}
            required
          />
        </div>
      </div>

      <div className="row align-items-end">
        <div className="col-md-6">
          <TextInput
            id="dob"
            label="Date of birth"
            type="date"
            value={formData.student.date_of_birth}
            onChange={(value) =>
              handleInputChange("student", "date_of_birth", value)
            }
            onBlur={() => handleBlur("student", "date_of_birth")}
            error={getError("student", "date_of_birth")}
            required
          />
        </div>
        <div className="col-md-4">
          <RadioGroup
            name="gender"
            label="Gender"
            value={formData.student.gender}
            onChange={(value) => handleInputChange("student", "gender", value)}
            onBlur={() => handleBlur("student", "gender")}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
            error={getError("student", "gender")}
            required
          />
        </div>
      </div>

      <div className="row align-items-end">
        <div className="col-md-6">
          <SelectInput
            id="daySchoolYear"
            label="Year enrolled in day school"
            note="(K-12)"
            placeholder="Select grade level"
            value={formData.student.enrollment_year}
            onChange={(value) =>
              handleInputChange("student", "enrollment_year", value)
            }
            onBlur={() => handleBlur("student", "enrollment_year")}
            error={getError("student", "enrollment_year")}
            required
            options={[
              { value: "K1", label: "K1" },
              { value: "K2", label: "K2" },
              { value: "K3", label: "K3" },
              { value: "K3", label: "K3" },
              { value: "K5", label: "K5" },
              { value: "K6", label: "K6" },
              { value: "K7", label: "K7" },
              { value: "K8", label: "K8" },
              { value: "K9", label: "K9" },
              { value: "K10", label: "K10" },
              { value: "K11", label: "K11" },
              { value: "K12", label: "K12" },
            ]}
          />
        </div>
        <div className="col-md-4">
          <RadioGroup
            name="overseasFeePaying"
            label="Overseas full fee paying student?"
            value={
              formData.student.overseas_student === null
                ? ""
                : formData.student.overseas_student
                ? "yes"
                : "no"
            }
            onChange={(value) =>
              handleInputChange("student", "overseas_student", value === "yes")
            }
            onBlur={() => handleBlur("student", "overseas_student")}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            error={getError("student", "overseas_student")}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <TextInput
            id="communitySchoolName"
            label="Community language school name"
            value={formData.student.community_school_name}
            onChange={(value) =>
              handleInputChange("student", "community_school_name", value)
            }
            onBlur={() => handleBlur("student", "community_school_name")}
            error={getError("student", "community_school_name")}
            required
          />
        </div>
        <div className="col-md-4">
          <TextInput
            id="daySchoolLocation"
            label="Location of day school"
            note="(suburb/town)"
            value={formData.student.day_school_location}
            onChange={(value) =>
              handleInputChange("student", "day_school_location", value)
            }
            onBlur={() => handleBlur("student", "day_school_location")}
            error={getError("student", "day_school_location")}
            required
          />
        </div>
        <div className="col-md-4">
          <TextInput
            id="enrolmentDate"
            label="Date of enrolment at this school"
            type="date"
            value={formData.student.enrolment_date}
            onChange={(value) =>
              handleInputChange("student", "enrolment_date", value)
            }
            onBlur={() => handleBlur("student", "enrolment_date")}
            error={getError("student", "enrolment_date")}
            required
          />
        </div>
      </div>

      <h4 className="fw-bold mt-3">Day school attended</h4>
      <p>
        <i>
          Please provide details of the day school where the student is
          currently enrolled.
        </i>
      </p>

      <div className="row">
        <div className="col-md-6">
          <TextInput
            id="daySchoolName"
            label="Name of day school attended"
            value={formData.student.day_school_name}
            onChange={(value) =>
              handleInputChange("student", "day_school_name", value)
            }
            onBlur={() => handleBlur("student", "day_school_name")}
            error={getError("student", "day_school_name")}
            required
          />
        </div>
        <div className="col-md-6">
          <TextInput
            id="daySchoolLocationOptional"
            label="Location of day school"
            note="(suburb/town)"
            value={formData.student.day_school_location_optional}
            onChange={(value) =>
              handleInputChange(
                "student",
                "day_school_location_optional",
                value
              )
            }
            onBlur={() => handleBlur("student", "day_school_location_optional")}
            error={getError("student", "day_school_location_optional")}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <TextInput
            id="daySchoolDatesFrom"
            label="Dates of attendance"
            note="(from)"
            type="month"
            help="Select month and year"
            value={formData.student.attendance_from}
            onChange={(value) =>
              handleInputChange("student", "attendance_from", value)
            }
            onBlur={() => handleBlur("student", "attendance_from")}
            error={getError("student", "attendance_from")}
            required
          />
        </div>
        <div className="col-md-6">
          <TextInput
            id="daySchoolDatesTo"
            label="Dates of attendance"
            note="(to)"
            type="month"
            help="Select month and year"
            value={formData.student.attendance_to}
            onChange={(value) =>
              handleInputChange("student", "attendance_to", value)
            }
            onBlur={() => handleBlur("student", "attendance_to")}
            error={getError("student", "attendance_to")}
            required
          />
        </div>
      </div>

      {/* Next Button */}
      <div className="container py-3 py-lg-5">
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center z-2">
            <button
              type="button"
              onClick={handleNext}
              className="btn globalbutton rounded-0 dark-text fw-bold fs-5 position-relative overflow-hidden"
            >
              Move to next step
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
