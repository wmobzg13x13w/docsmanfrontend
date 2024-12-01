import { useCallback, useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
const EditFileModal = ({
  isOpen,
  toggleModal,
  selectedFile,
  updateFile,
  allEmployees,
  setSelectedFile,
  fetchFiles,
}) => {
  console.log(selectedFile);

  const { token } = useContext(AuthContext);

  const [file, setfile] = useState({
    name: "",
    assignedTo: "",
    isPaid: "",
    paymentType: "",
    avance: "",
    totalPrice: "",
    company: "",
    destination: "",
    post: "",
  });

  const fetchFile = useCallback(async () => {
    if (!token) {
      return; // Wait for the token to be initialized
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + `files/${selectedFile}`,
        config
      );
      const file = response.data;
      setfile(file);
    } catch (error) {
      console.error("Error fetching file:", error);
      throw error;
    }
  }, [token]);

  useEffect(() => {
    fetchFile();
  }, [fetchFile]);

  const handleInputChange = (e) => {
    setfile({ ...file, [e.target.name]: e.target.value });
  };

  const toggletoggle = () => {
    toggleModal();
    setSelectedFile(null);
  };

  const handleSubmit = async () => {
    setSelectedFile(null);
    toggleModal();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}files/${selectedFile}`,
        file,
        config
      );
      console.log(response.data);
      toggleModal();
    } catch (error) {
      console.error("Error adding file:", error);
    }
    fetchFiles();
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggletoggle}
      modalClassName='bg-transparant'>
      <ModalHeader toggle={toggletoggle}>Edit File</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <p>
              <strong>Titre:</strong> {file.name}
            </p>
          </FormGroup>
          <FormGroup>
            <Label for='assignedTo'>Employé</Label>
            <Input
              id='assignedTo'
              name='assignedTo'
              type='select'
              value={file.assignedTo._id}
              onChange={handleInputChange}
              required>
              <option hidden>Employé</option>
              {allEmployees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.firstName + " " + employee.lastName}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for='status'>Status</Label>
            <Input
              id='isPaid'
              name='isPaid'
              type='select'
              value={file.isPaid}
              onChange={handleInputChange}
              required>
              <option value={true}>Payé</option>
              <option value={false}>Non Payé</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for='paymentType'>Type du paiement</Label>
            <Input
              id='paymentType'
              name='paymentType'
              type='select'
              value={file.paymentType}
              onChange={handleInputChange}
              required>
              <option value='En Espèces'>En Espèces</option>
              <option value='Virement'>Virement</option>
              <option value='Chèque'>Chèque</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for='avance'>Avance</Label>
            <Input
              type='number'
              name='avance'
              id='avance'
              value={file.avance}
              onChange={handleInputChange}
              required
              onWheel={(e) => e.target.blur()}
            />
          </FormGroup>
          <FormGroup>
            <Label for='totalPrice'>Total Price</Label>
            <Input
              type='number'
              name='totalPrice'
              id='totalPrice'
              value={file.totalPrice}
              onChange={handleInputChange}
              required
              onWheel={(e) => e.target.blur()}
            />
          </FormGroup>
          <FormGroup>
            <Label for='company'>Société</Label>
            <Input
              type='text'
              name='company'
              id='company'
              value={file.company}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='post'>Post</Label>
            <Input
              type='text'
              name='post'
              id='post'
              value={file.post}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='destination'>Destination</Label>
            <Input
              type='text'
              name='destination'
              id='destination'
              value={file.destination}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={handleSubmit}>
          Save
        </Button>
        <Button color='secondary' onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default EditFileModal;
