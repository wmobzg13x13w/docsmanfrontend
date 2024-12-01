import axios from "axios";
import React, { useState, useContext, useEffect, useCallback } from "react";
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

const AddFileModal = ({ isOpen, toggleModal, allEmployees, fetchFiles }) => {
  const [newFile, setNewFile] = useState({
    name: "",
    assignedTo: "",
    isPaid: "",
    paymentType: "En Espèces",
    avance: "",
    totalPrice: "",
    company: "",
    destination: "",
    post: "",
  });

  const { token } = useContext(AuthContext);
  const handleFileChange = (e) => {
    setNewFile({ ...newFile, file: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    setNewFile({ ...newFile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "files/add",
        newFile,
        config
      );
      console.log(response.data);
      fetchFiles();
      toggleModal();
    } catch (error) {
      console.error("Error adding file:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} modalClassName='bg-transparant'>
      <ModalHeader toggle={toggleModal}>Ajouter Document</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='name'>Titre</Label>
            <Input
              type='file'
              name='name'
              id='name'
              onChange={handleFileChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='assignedTo'>Assigned to</Label>
            <Input
              id='assignedTo'
              name='assignedTo'
              type='select'
              value={newFile.assignedTo}
              onChange={handleInputChange}
              required>
              <option value=''>Employé</option>
              {allEmployees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.firstName + " " + employee.lastName}
                </option>
              ))}
            </Input>
          </FormGroup>
          {/* <FormGroup>
            <Label for='status'>Status</Label>
            <Input
              id='isPaid'
              name='isPaid'
              type='select'
              value={newFile.isPaid}
              onChange={handleInputChange}
              required>
              <option value={true}>Paid</option>
              <option value={false}>Not Paid</option>
            </Input>
          </FormGroup> */}
          <FormGroup>
            <Label for='paymentType'>Type du paiement</Label>
            <Input
              id='paymentType'
              name='paymentType'
              type='select'
              value={newFile.paymentType}
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
              value={newFile.avance}
              onChange={handleInputChange}
              required
              onWheel={(e) => e.target.blur()}
            />
          </FormGroup>
          <FormGroup>
            <Label for='totalPrice'>Montant Total</Label>
            <Input
              type='number'
              name='totalPrice'
              id='totalPrice'
              value={newFile.totalPrice}
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
              value={newFile.company}
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
              value={newFile.post}
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
              value={newFile.destination}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={handleSubmit}>
          Ajouter
        </Button>
        <Button color='secondary' onClick={toggleModal}>
          Annuler
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddFileModal;
