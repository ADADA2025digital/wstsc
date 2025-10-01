import React from "react";
import TextInput from "./Inputs/TextInput.jsx";
import RadioGroup from "./Inputs/RadioGroup.jsx";
import TextArea from "./Inputs/TextArea.jsx";
import { useEnrolmentForm } from "../Context/EnrolmentFormContext";

export default function FamilyDetailsPhase3() {
  const { formData, updateFormData } = useEnrolmentForm();

  return (
    <section className="container bg-light p-3">
      <div className="row">
        <TextInput
          id="notLivingEmail"
          label="Preferred email address for correspondence"
          value={formData.parent_not_living.email}
          onChange={(value) =>
            updateFormData("parent_not_living", "email", value)
          }
        />
        <TextArea
          id="notLivingResidentialAddress"
          label="Residential address"
          rows={2}
          note="(eg 1 High Street, Sydney, NSW, 2000)"
          value={formData.parent_not_living.residential_address}
          onChange={(value) =>
            updateFormData("parent_not_living", "residential_address", value)
          }
        />
        <div className="col-md-6">
        <RadioGroup
          name="doesStudentResideHere"
          label="Does the student sometimes reside at this address?"
          value={
            formData.parent_not_living.does_student_reside_here ? "yes" : "no"
          }
          onChange={(value) =>
            updateFormData(
              "parent_not_living",
              "does_student_reside_here",
              value === "yes"
            )
          }
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        </div>

        <TextArea
          id="notLivingCorrespondenceAddress"
          label="Correspondence address"
          rows={2}
          note="(If different from residential address)"
          value={formData.parent_not_living.correspondence_address}
          onChange={(value) =>
            updateFormData("parent_not_living", "correspondence_address", value)
          }
        />
        <p>
          <i>
            If you have a correspondence address that is different to your
            residential address please write it below (eg PO Box 51, Sydney,
            NSW, 2001).
          </i>
        </p>
      </div>

      <div className="row mt-4">
        <h2 className="h4 dark-text mb-3">E. Additional emergency contacts</h2>
        <p className="mb-3">
          <i>
            Please nominate two people over the age of 18 years who may be
            contacted in the event of an emergency if the community language
            school is unable to contact the parents/carers listed in Section C.
            Please ensure that you have discussed with these people their
            willingness to be emergency contacts.
          </i>
        </p>

        <h6>
          <span className="fw-bold">CONTACT DETAILS</span>{" "}
          <i>(first preference)</i>
        </h6>

        <TextInput
          id="firstEmergencyFamilyName"
          label="Family name"
          value={formData.first_emergency_contact.family_name}
          onChange={(value) =>
            updateFormData("first_emergency_contact", "family_name", value)
          }
        />

        <TextInput
          id="firstEmergencyGivenName"
          label="Given name"
          value={formData.first_emergency_contact.given_name}
          onChange={(value) =>
            updateFormData("first_emergency_contact", "given_name", value)
          }
        />

        <TextInput
          id="firstEmergencyRelationship"
          label="Relationship to student"
          note="(eg neighbour/aunt/uncle)"
          value={formData.first_emergency_contact.relationship_to_student}
          onChange={(value) =>
            updateFormData(
              "first_emergency_contact",
              "relationship_to_student",
              value
            )
          }
        />

        <p>
          <i>
            If there are any special conditions or times relevant to any contact
            number, please include these in the comment box next to the number
            (eg Mondays and Tuesdays only)
          </i>
        </p>
        <TextInput
          id="firstEmergencyMobile"
          label="Phone number"
          note="(mobile)"
          value={formData.first_emergency_contact.mobile_phone}
          onChange={(value) =>
            updateFormData("first_emergency_contact", "mobile_phone", value)
          }
        />
        <TextInput
          id="firstEmergencyHome"
          label="Phone number"
          note="(home)"
          value={formData.first_emergency_contact.home_phone}
          onChange={(value) =>
            updateFormData("first_emergency_contact", "home_phone", value)
          }
        />

        <TextInput
          id="firstEmergencyWork"
          label="Phone number"
          note="(work)"
          value={formData.first_emergency_contact.work_phone}
          onChange={(value) =>
            updateFormData("first_emergency_contact", "work_phone", value)
          }
        />

        <h6 className="mt-4">
          <span className="fw-bold">CONTACT DETAILS</span>{" "}
          <i>(second preference)</i>
        </h6>

        <TextInput
          id="secondEmergencyFamilyName"
          label="Family name"
          value={formData.second_emergency_contact.family_name}
          onChange={(value) =>
            updateFormData("second_emergency_contact", "family_name", value)
          }
        />

        <TextInput
          id="secondEmergencyGivenName"
          label="Given name"
          value={formData.second_emergency_contact.given_name}
          onChange={(value) =>
            updateFormData("second_emergency_contact", "given_name", value)
          }
        />

        <TextInput
          id="secondEmergencyRelationship"
          label="Relationship to student"
          note="(eg neighbour/aunt/uncle)"
          value={formData.second_emergency_contact.relationship_to_student}
          onChange={(value) =>
            updateFormData(
              "second_emergency_contact",
              "relationship_to_student",
              value
            )
          }
        />

        <p>
          <i>
            If there are any special conditions or times relevant to any contact
            number, please include these in the comment box next to the number
            (eg Mondays and Tuesdays only)
          </i>
        </p>
        <TextInput
          id="secondEmergencyMobile"
          label="Phone number"
          note="(mobile)"
          value={formData.second_emergency_contact.mobile_phone}
          onChange={(value) =>
            updateFormData("second_emergency_contact", "mobile_phone", value)
          }
        />

        <TextInput
          id="secondEmergencyHome"
          label="Phone number"
          note="(home)"
          value={formData.second_emergency_contact.home_phone}
          onChange={(value) =>
            updateFormData("second_emergency_contact", "home_phone", value)
          }
        />

        <TextInput
          id="secondEmergencyWork"
          label="Phone number"
          note="(work)"
          value={formData.second_emergency_contact.work_phone}
          onChange={(value) =>
            updateFormData("second_emergency_contact", "work_phone", value)
          }
        />
      </div>
    </section>
  );
}
