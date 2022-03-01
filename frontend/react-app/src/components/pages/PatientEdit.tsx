import React, { useState, useEffect } from "react"
import { patientShow } from "lib/api/patient"
import { PatientProfileType } from "types/patient"


const PatientEdit: React.FC = () => {
  const [profile, setProfile] = useState<PatientProfileType>({
    id: 0,
    image: { url: "" },
    roomNumber: 0,
    phoneNumber: "",
    emergencyAddress: "",
    address: "",
    building: "",
    userId: 0,
  });

  const getProfils = async () => {
    try {
      const res = await patientShow();
      console.log(res.data);
      setProfile(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProfils();
  }, []);



  return (
    <>edittest</>
  )
}

export default PatientEdit
