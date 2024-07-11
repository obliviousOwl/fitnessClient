import { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext";
import WorkoutCard from "../components/WorkoutCard";
import { Container, Nav } from "react-bootstrap";
import { Navigate } from "react-router-dom";


export default function Workouts() {

    const { user } = useContext(UserContext);

    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch('https://fitness-tracker-dcb1.onrender.com/workouts/getMyWorkouts', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await response.json();
            if (data.workouts !== null) {
                setWorkouts(data.workouts);
                setLoading(false)
            }
            else {
                setWorkouts([]);
                setLoading(false)
            }
        }
        catch (err) {
            console.log('Error in fetching data', err)
        }
    }



    useEffect(() => {

        fetch('https://fitness-tracker-dcb1.onrender.com/workouts/getMyWorkouts', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setWorkouts(data.workouts)
                setLoading(false);
            })
    })

    if (loading) return <div>Loading...</div>;

    return (
        user.id ?
            <Container>
                <WorkoutCard workoutData={workouts} fetchData={fetchData} />
            </Container>
            :
            <Navigate to={'/login'} />
    )
}