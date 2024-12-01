import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useContext } from "react";

const FileDetailsModal = ({ isOpen, toggleModal, file }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      modalClassName='bg-transparant'
      className='d-block ' // This will make the modal appear only on sm and md screens
    >
      <ModalHeader toggle={toggleModal}>Détails</ModalHeader>
      <ModalBody>
        <div>
          <p>
            <strong>Titre:</strong> {file.name}
          </p>
          <p>
            <strong>Employé:</strong> {file.assignedTo.firstName}{" "}
            {file.assignedTo.lastName}
          </p>

          <p>
            <strong>Type de Paiement:</strong> {file.paymentType}
          </p>
          <p>
            <strong>Avance:</strong> {file.avance} DT
          </p>
          <p>
            <strong>Montant Total :</strong> {file.totalPrice} DT
          </p>
          <p>
            <strong>Reste à Payer :</strong> {file.totalPrice - file.avance} DT
          </p>
          <p>
            <strong>Société:</strong> {file.company}
          </p>
          <p>
            <strong>Destination:</strong> {file.destination}
          </p>
          <p>
            <strong>Post:</strong> {file.post}
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' onClick={toggleModal}>
          Fermer
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FileDetailsModal;
