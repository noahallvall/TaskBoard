import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function UpdateTask({ task, onTaskUpdated }) {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(
        task.isDone ? "done" : task.isPending ? "pending" : "undone"
    );

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = () => {
        // convert status string back into boolean flags
        const updatedTask = {
            ...task,
            title,
            description,
            isDone: status === "done",
            isPending: status === "pending"
        };

        fetch(`https://localhost:7114/api/task/${task.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to update task");
                return res.json();
            })
            .then((data) => {
                onTaskUpdated(data);
                handleClose();
            })
            .catch((err) => console.error(err));
    };

    return (
        <>

            <Button variant="primary" size="sm" onClick={handleShow}>
                Edit
            </Button>

            {/* Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTaskTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTaskDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        {/* Dropdown for status */}
                        <Form.Group className="mb-3" controlId="formTaskStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="undone">Undone</option>
                                <option value="pending">Pending</option>
                                <option value="done">Finished</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );
}

export default UpdateTask;
