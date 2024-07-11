import { useState, useContext, useEffect } from "react"
import UserContext from "../UserContext"
import { Navigate, useNavigate } from "react-router-dom";
import { Form, FloatingLabel, Button } from "react-bootstrap"
import Swal from "sweetalert2";


export default function AddWorkout() {

    const { user } = useContext(UserContext);
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (name !== '' && duration !== '') {
            setIsActive(true)
        }
        else {
            setIsActive(false)
        }
    }, [name, duration])

    const addWorkout = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('token');

        try {
            const response = await fetch('https://fitness-tracker-dcb1.onrender.com/workouts/addWorkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    duration
                })
            });
            const data = await response.json();
            if(data.error === 'Workout already exists'){
                Swal.fire({
                    title: 'Workout already exists',
                    icon: 'error',
                    text: 'This workout already exists'
                  });
            }
            else if(data !== null) {
                Swal.fire({
                    title: 'Workout successfully added',
                    icon: 'success',
                    text: 'Workout successfully added'
                })
                navigate('/workouts')
            }
        }
        catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error in saving the product',
                icon: 'error',
                text: 'Error in saving the product'
            });
        }
    }

    return (
        <>
        <h1 className="text-center pt-5">Add Workout</h1>
        {
            !user.id ?
                <Navigate to='/login' />
                :
                <Form onSubmit={e => addWorkout(e)}>
                    <FloatingLabel controlId="floatingName" label="Name" className="my-3">
                        <Form.Control type="text" placeholder="Name" required value={name} onChange={e => { setName(e.target.value) }} />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingDescription" label="Duration" className="my-3">
                        <Form.Control type="text" placeholder="Description" required value={duration} onChange={e => { setDuration(e.target.value) }} />
                    </FloatingLabel>

                    {
                        isActive ?
                            <Button variant="primary" type="submit" id="submitBtn" className='my-2'>Submit</Button>
                            :
                            <Button variant="danger" type="submit" id="submitBtn" className='my-2' disabled>Submit</Button>
                    }
                </Form>
        }
        </>




    )
}