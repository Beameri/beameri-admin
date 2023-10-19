import React, { useState } from "react";
import { CCard, CCardGroup, CCol, CContainer, CRow } from "@coreui/react";
import { isAutheticated } from "src/auth";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const AddFaqs = () => {
  const token = isAutheticated();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    WebsiteURL: "https://bolo.ai.in/",
    question: "",
    answer: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAddFaq = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (data.question === "" || data.answer === "") {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/faqs/add",
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log("FAQ added successfully");
        setLoading(false);
        swal({
          title: "Added",
          text: response?.data?.message
            ? response?.data?.message
            : "Faq added successfully!",
          icon: "success",
          button: "Close",
        });
        navigate("/faqs");
      }
    } catch (error) {
      console.log("Error adding FAQ:", error);
      setLoading(false);
      swal({
        title: "Warning",
        text: error.message,
        icon: "error",
        button: "Close",
        dangerMode: true,
      });
    }
  };

  return (
    <CContainer>
      <CRow className="mt-3">
        <CCol md={12}>
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <div style={{ fontSize: "22px" }} className="fw-bold">
              Add Faqs
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol md={9} className="mt-1">
          <CCardGroup>
            <CCard className="p-4 mb-3">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 my-1">
                  <div className="card-body px-5">
                    <div className="mb-3">
                      <label htmlFor="question" className="form-label">
                        Question
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="question"
                        maxLength="50"
                        value={data.question}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="answer" className="form-label">
                        Answer
                      </label>
                      <textarea
                        className="form-control"
                        id="answer"
                        maxLength="500"
                        value={data.answer}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      className="btn btn-secondary"
                      onClick={handleAddFaq}
                    >
                      Add Faq
                    </button>
                  </div>
                </div>
              </div>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AddFaqs;
