import React, { useState, useEffect } from "react";

import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";

import { isAutheticated } from "src/auth";
import BasicDetaiils from "./BasicDetaiils.js";
import ContactDetails from "./ContactDetails.js";
import Preview from "./Preview.js";
import Videos from "./Video.js";
import TestLaunch from "./TestLaunch.js";
import Status from "./Status.js";
import VideoTemplate from "./VideoTemplate.js";
import Voices from "./Voices.js";

const AddCampaign = () => {
  const token = isAutheticated();
  const [viewState, setViewState] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    WebsiteURL: "https://bolo.ai.in/",
    campaignName: "",
    language: "",
    campaignType: "",
    video: null,
    spreadSheet: null,
    videos: [null, null],
    recipients: [{ name: "", contact: "" }],
    testRecipents: [
      {
        name: "",
        phoneNumber: "",
        email: "",
        status: ["delivered"],
      },
    ],
    voiceID: "",
  });

  // console.log(data)

  const handleView = (n) => {
    if (viewState === n) return;
    setViewState(n);
  };
  return (
    <CContainer>
      <CRow className="mt-3">
        <CCol md={12}>
          <div
            className="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
          >
            <div style={{ fontSize: "22px" }} className="fw-bold">
              Add Campaign
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol md={9} className="mt-1">
          <CCardGroup>
            <CCard className="p-4 mb-3">
              <CCardBody>
                {viewState === 1 && (
                  <BasicDetaiils
                    props={{ data, setData, handleView }}
                    setData={setData}
                    handleView={handleView}
                  />
                )}

                {viewState === 2 && (
                  <VideoTemplate props={{ data, setData, handleView }} />
                )}
                {viewState === 3 && (
                  <ContactDetails props={{ data, setData, handleView }} />
                )}

                {viewState === 4 && (
                  <Preview props={{ data, setData, handleView }} />
                )}
                {viewState === 5 && (
                  <Voices props={{ data, setData, handleView }} />
                )}
                {viewState === 6 && (
                  <Videos props={{ data, setData, handleView }} />
                )}
                {viewState === 7 && (
                  <TestLaunch props={{ data, setData, handleView }} />
                )}
                {viewState === 8 && (
                  <Status props={{ data, setData, handleView }} />
                )}
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
        <CCol md={3} className="mt-1">
          <CCardGroup>
            <CCard>
              <CCardBody>
                <div className="d-grid gap-2">
                  <button
                    className={
                      viewState === 1
                        ? "btn btn-light"
                        : "btn btn-info text-white"
                    }
                    type="button"
                    onClick={() => handleView(1)}
                  >
                    Basic Details
                  </button>
                  <button
                    className={
                      viewState === 2
                        ? "btn btn-light"
                        : "btn btn-info text-white"
                    }
                    type="button"
                    onClick={() => handleView(2)}
                  >
                    Video Template
                  </button>
                  <button
                    className={
                      viewState === 3
                        ? "btn btn-light"
                        : "btn btn-info text-white"
                    }
                    type="button"
                    onClick={() => handleView(3)}
                  >
                    Contact Details
                  </button>
                  <button
                    className={
                      viewState === 4
                        ? "btn btn-light"
                        : "btn btn-info text-white"
                    }
                    type="button"
                    onClick={() => handleView(4)}
                  >
                    Preview
                  </button>
                  <button
                    className={
                      viewState === 5
                        ? "btn btn-light"
                        : "btn btn-info text-white"
                    }
                    type="button"
                    onClick={() => handleView(5)}
                  >
                    Voices
                  </button>
                  <button
                    className={
                      viewState === 6
                        ? "btn btn-light"
                        : "btn btn-info text-white"
                    }
                    type="button"
                    onClick={() => handleView(6)}
                  >
                    Videos (Internal Process)
                  </button>
                  <button
                    className={
                      viewState === 7
                        ? "btn btn-light"
                        : "btn btn-info text-white"
                    }
                    type="button"
                    onClick={() => handleView(7)}
                  >
                    Test & Launch
                  </button>
                  <button
                    className={
                      viewState === 8
                        ? "btn btn-light"
                        : "btn btn-info text-white"
                    }
                    type="button"
                    onClick={() => handleView(8)}
                  >
                    Status
                  </button>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AddCampaign;
