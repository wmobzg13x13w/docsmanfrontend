import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import FilesChart from "../components/dashboard/FilesChart";
import { AuthContext } from "../contexts/AuthContext";
import ArcChart from "../components/dashboard/ArcChart";
import "../assets/scss/styles.css";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}files/getall`,
          config
        );
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [token]);
  return (
    <div className='payment-status-section'>
      <Row className='charts-row'>
        <Col sm='6' lg='6' xl='7' xxl='8' className='chart-col'>
          <FilesChart files={files} />
        </Col>
        <Col sm='6' lg='6' xl='5' xxl='4' className='chart-col'>
          <ArcChart files={files} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
