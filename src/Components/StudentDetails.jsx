import React from 'react';
import TextInput from "./Inputs/TextInput.jsx";
import RadioGroup from "./Inputs/RadioGroup.jsx";
import { useEnrolmentForm } from '../Context/EnrolmentFormContext';

export default function StudentDetails() {
  const { formData, updateFormData } = useEnrolmentForm();

  return (
    <section className="container bg-light p-3">
      <h4 className="dark-text mb-3">A. Student details</h4>

      <div className="row">
        <TextInput 
          id="studentFamilyName" 
          label="Family name" 
          value={formData.student.family_name}
          onChange={(value) => updateFormData('student', 'family_name', value)}
          required
        />
        <TextInput 
          id="studentFirstName" 
          label="First given name" 
          value={formData.student.first_given_name}
          onChange={(value) => updateFormData('student', 'first_given_name', value)}
          required
        />
        <TextInput 
          id="studentSecondName" 
          label="Second given name" 
          value={formData.student.second_given_name}
          onChange={(value) => updateFormData('student', 'second_given_name', value)}
        />
        <TextInput 
          id="studentPreferredName" 
          label="Preferred first name" 
          value={formData.student.preferred_first_name}
          onChange={(value) => updateFormData('student', 'preferred_first_name', value)}
        />
      </div>

      <div className="row align-items-end">
        <div className="col-md-6">
          <TextInput 
            id="dob" 
            label="Date of birth" 
            type="date" 
            value={formData.student.date_of_birth}
            onChange={(value) => updateFormData('student', 'date_of_birth', value)}
            required
          />
        </div>
        <div className="col-md-4">
          <RadioGroup
            name="gender"
            label="Gender"
            value={formData.student.gender}
            onChange={(value) => updateFormData('student', 'gender', value)}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
            required
          />
        </div>
      </div>

      <div className="row align-items-end">
        <div className="col-md-6">
          <TextInput
            id="daySchoolYear"
            label="Year enrolled in day school"
            note="(K-12)"
            placeholder="e.g., 7"
            value={formData.student.enrollment_year}
            onChange={(value) => updateFormData('student', 'enrollment_year', value)}
            required
          />
        </div>
        <div className="col-md-4">
          <RadioGroup
            name="overseasFeePaying"
            label="Overseas full fee paying student?"
            value={formData.student.overseas_student ? 'yes' : 'no'}
            onChange={(value) => updateFormData('student', 'overseas_student', value === 'yes')}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <TextInput
            id="communitySchoolName"
            label="Community language school name"
            value={formData.student.community_school_name}
            onChange={(value) => updateFormData('student', 'community_school_name', value)}
            required
          />
        </div>
        <div className="col-md-6">
          <TextInput
            id="daySchoolLocation"
            label="Location of day school"
            note="(suburb/town)"
            value={formData.student.day_school_location}
            onChange={(value) => updateFormData('student', 'day_school_location', value)}
            required
          />
        </div>
        <div className="col-md-6">
          <TextInput
            id="enrolmentDate"
            label="Date of enrolment at this school"
            type="date"
            value={formData.student.enrolment_date}
            onChange={(value) => updateFormData('student', 'enrolment_date', value)}
          />
        </div>
      </div>

      <h4 className="fw-bold mt-3">Day school attended</h4>
      <p>
        <i>
          Please provide details of the day school where the student is currently enrolled.
        </i>
      </p>

      <div className="row">
        <div className="col-md-12">
          <TextInput 
            id="daySchoolName" 
            label="Name of day school attended" 
            value={formData.student.day_school_name}
            onChange={(value) => updateFormData('student', 'day_school_name', value)}
          />
        </div>
        <div className="col-md-12">
          <TextInput
            id="daySchoolLocation"
            label="Location of day school"
            note="(suburb/town)"
            value={formData.student.day_school_location}
            onChange={(value) => updateFormData('student', 'day_school_location', value)}
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
            onChange={(value) => updateFormData('student', 'attendance_from', value)}
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
            onChange={(value) => updateFormData('student', 'attendance_to', value)}
          />
        </div>
      </div>
    </section>
  );
}