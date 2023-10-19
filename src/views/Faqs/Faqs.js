import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { isAutheticated } from "src/auth.js";

const Faqs = () => {
  const token = isAutheticated();
  const [loading, setLoading] = useState(true);
  const [faqsData, setFaqsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const navigate = useNavigate();

  const handleShowEntries = (e) => {
    setCurrentPage(1);
    setItemPerPage(e.target.value);
  };

  const formatDate = (inputDate) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get("/api/faqs/getAll", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });
        setFaqsData(response.data.faqs);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching FAQs:", error);
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const handleEdit = (faqId) => {
    navigate(`/faqs/edit/${faqId}`);
  };

  const handleDelete = async (faqId) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:8000/api/faqs/delete/${faqId}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });

        setFaqsData((prevFaqsData) => {
          return prevFaqsData.filter((faq) => faq._id !== faqId);
        });
      } catch (error) {
        console.log("Error deleting FAQ:", error);
        swal({
          title: "Warning",
          text: error.message,
          icon: "error",
          button: "Close",
          dangerMode: true,
        });
      }
    }
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div
                className="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
              >
                <div style={{ fontSize: "22px" }} className="fw-bold">
                  Frequently Asked Questions
                </div>

                <div className="page-title-right">
                  <Link to="/faqs/add">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        fontWeight: "bold",
                        marginBottom: "1rem",
                        textTransform: "capitalize",
                      }}
                    >
                      Add FAQ
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row ml-0 mr-0 mb-10">
                    <div className="col-sm-12 col-md-12">
                      <div className="dataTables_length">
                        <label className="w-100">
                          Show
                          <select
                            style={{ width: "10%" }}
                            name=""
                            onChange={(e) => handleShowEntries(e)}
                            className="select-w custom-select custom-select-sm form-control form-control-sm"
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                          entries
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive table-shoot mt-3">
                    <table
                      className="table table-centered table-nowrap"
                      style={{ border: "1px solid" }}
                    >
                      <thead
                        className="thead-info"
                        style={{ background: "rgb(140, 213, 213)" }}
                      >
                        <tr>
                          <th className="text-start">ID</th>
                          <th className="text-start">Question</th>
                          <th className="text-start">Answer</th>
                          <th className="text-center">Created On</th>
                          <th className="text-center"></th>
                          <th className="text-center"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!loading && faqsData.length === 0 ? (
                          <tr className="text-center">
                            <td colSpan="4">
                              <h5>No Data Available</h5>
                            </td>
                          </tr>
                        ) : (
                          faqsData.map((faq, idx) => {
                            return (
                              <tr key={faq._id}>
                                <td className="text-start">{idx + 1}</td>
                                <td className="text-start">{faq.question}</td>
                                <td className="text-start">{faq.answer}</td>
                                <td className="text-center">
                                  {formatDate(faq.createdAt)}
                                </td>
                                <td className="text-center">
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => handleEdit(faq._id)}
                                  >
                                    Edit
                                  </button>
                                </td>
                                <td className="text-center">
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(faq._id)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="row mt-20">
                    <div className="col-sm-12 col-md-6 mb-20"></div>

                    <div className="col-sm-12 col-md-6">
                      <div className="d-flex">
                        <ul className="pagination ms-auto">
                          <li
                            className={
                              currentPage === 1
                                ? "paginate_button page-item previous disabled"
                                : "paginate_button page-item previous"
                            }
                          >
                            <span
                              className="page-link"
                              style={{ cursor: "pointer" }}
                              onClick={() => setCurrentPage((prev) => prev - 1)}
                            >
                              Previous
                            </span>
                          </li>

                          {!(currentPage - 1 < 1) && (
                            <li className="paginate_button page-item">
                              <span
                                className="page-link"
                                style={{ cursor: "pointer" }}
                                onClick={(e) =>
                                  setCurrentPage((prev) => prev - 1)
                                }
                              >
                                {currentPage - 1}
                              </span>
                            </li>
                          )}

                          <li className="paginate_button page-item active">
                            <span
                              className="page-link"
                              style={{ cursor: "pointer" }}
                            >
                              {currentPage}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
