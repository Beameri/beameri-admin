import { CCard, CCardGroup, CCol, CContainer, CRow } from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isAutheticated } from "src/auth";
import { useNavigate } from "react-router-dom";

const EditFaq = () => {
  const [faqData, setFaqData] = useState({
    question: "",
    answer: "",
  });
  const token = isAutheticated();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const response = await axios.get(`/api/faqs/get/${params.id}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });

        setFaqData({
          question: response.data.faq.question,
          answer: response.data.faq.answer,
        });
      } catch (error) {
        console.log("Error fetching FAQ data:", error);
      }
    };

    fetchFaqData();
  }, [params.id]);

  const handleEdit = async () => {
    try {
      const dataToUpdate = {
        question: faqData.question,
        answer: faqData.answer,
      };

      const response = await axios.put(
        `/api/faqs/update/${params.id}`,
        dataToUpdate,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      swal({
        title: "Added",
        text: response?.data?.message
          ? response?.data?.message
          : "Faq modified successfully!",
        icon: "success",
        button: "Close",
      });
      navigate("/faqs");
      console.log("FAQ updated successfully");
    } catch (error) {
      console.log("Error updating FAQ:", error);
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
                        value={faqData.question}
                        onChange={(e) =>
                          setFaqData({ ...faqData, question: e.target.value })
                        }
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
                        value={faqData.answer}
                        onChange={(e) =>
                          setFaqData({ ...faqData, answer: e.target.value })
                        }
                      />
                    </div>
                    <button className="btn btn-secondary" onClick={handleEdit}>
                      Edit Faq
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

export default EditFaq;
