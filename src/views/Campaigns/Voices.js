import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
} from "@coreui/react";
import axios from "axios";

const Voices = ({ props }) => {
  const { data, handleView } = props;
  const [voiceData, setVoiceData] = useState({
    name: "",
    audioUrl: null,
    isLoading: false,
  });

  const sendVoiceHandler = async (name) => {
    setVoiceData((prevData) => ({ ...prevData, isLoading: true }));
    console.log(name);

    if (name.trim() === "") {
      alert("Please enter a name.");
      setVoiceData((prevData) => ({ ...prevData, isLoading: false }));
      return;
    }

    try {
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM?optimize_streaming_latency=0&output_format=mp3_44100_128`,
        {
          text: name,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0,
            similarity_boost: 0,
            style: 0,
            use_speaker_boost: true,
          },
        },
        {
          headers: {
            "xi-api-key": "e327fdf320043677a512f1b0dade8403",
            accept: "audio/mpeg",
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );

      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);

      setVoiceData({
        name: name,
        audioUrl: audioUrl,
        isLoading: false,
      });
      //   console.log(voiceData);
    } catch (error) {
      console.log("Error sending voice", error);
      setVoiceData((prevData) => ({ ...prevData, isLoading: false }));
    }
  };

  const playVoice = () => {
    if (voiceData.audioUrl) {
      const audio = new Audio(voiceData.audioUrl);
      audio.play();
    }
  };

  return (
    <div>
      <div className="container">
        <div className="page-title-right d-flex align-items-center justify-content-end">
          <Button
            variant="contained"
            color="secondary"
            style={{
              fontWeight: "bold",
              marginBottom: "1rem",
              textTransform: "capitalize",
              marginRight: "5px",
            }}
            onClick={() => handleView(5)}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{
              fontWeight: "bold",
              marginBottom: "1rem",
              textTransform: "capitalize",
            }}
            onClick={() => handleView(7)}
          >
            Next
          </Button>
        </div>
        <div>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableDataCell scope="col">Name</CTableDataCell>
                <CTableDataCell scope="col">Mobile Number</CTableDataCell>
                <CTableDataCell scope="col">ID</CTableDataCell>
                <CTableDataCell scope="col"></CTableDataCell>
                <CTableDataCell scope="col"></CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data?.recipients?.map((recipient, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{recipient.name}</CTableDataCell>
                  <CTableDataCell>{recipient.contact}</CTableDataCell>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      className="btn btn-primary"
                      onClick={() => sendVoiceHandler(recipient.name)}
                    >
                      {voiceData.isLoading ? "Loading" : "Get Your Voice"}
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      className="btn btn-primary"
                      onClick={() => playVoice(recipient.name)}
                    >
                      Play
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </div>
      </div>
    </div>
  );
};

export default Voices;
