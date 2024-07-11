import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function UpdateWorkout({ workout, fetchData }) {

    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');

    const [showEdit, setShowEdit] = useState(false);

    const openEdit = (workout) => {
        fetch(`https://fitness-tracker-dcb1.onrender.com/workouts/getMyWorkout/${workout}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                setName(data.workout.name);
                setDuration(data.workout.duration);
            })
        setShowEdit(true);
    }

    const closeEdit = () => {
        setShowEdit(false);
        setName('');
        setDuration('');
    }

    const editWorkout = (e, workout) => {
        e.preventDefault();

        fetch(`https://fitness-tracker-dcb1.onrender.com/workouts/updateWorkout/${workout}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name,
                duration
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Workout updated successfully') {
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: 'Workout Successfully Updated'
                    })

                    closeEdit();
                    fetchData();
                }
                else {
                    Swal.fire({
                        title: 'Error!',
                        icon: 'error',
                        text: 'Please try again'
                    })
                    closeEdit();
                    fetchData();
                }
            })
    }

    return (

        <>
            <Button variant="primary" size="sm" onClick={() => openEdit(workout)}>
                Edit
            </Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={(e) => editWorkout(e, workout)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => closeEdit()}>
                            Close
                        </Button>
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}