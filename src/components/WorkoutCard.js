import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import UpdateWorkout from "./UpdateWorkout"
import CompleteWorkout from "./CompleteWorkout"
import DeleteWorkout from "./DeleteWorkout"

export default function WorkoutCard({ workoutData, fetchData }) {

    const [workouts, setWorkouts] = useState([])


    useEffect(() => {
        
        const workoutArr = workoutData.map(workout => {
            return (
                <tr key={workout._id}>
                    <td>{workout.name}</td>
                    <td>{workout.duration}</td>
                    <td className={workout.status === 'completed' ? "text-success" : "text-danger"}>{workout.status}</td>
                    <td><UpdateWorkout workout={workout._id} fetchData={fetchData}/></td>
                    <td><CompleteWorkout workout={workout._id} isCompleted={workout.status} fetchData={fetchData} workoutName={workout.name}/></td>
                    <td><DeleteWorkout workout={workout._id} workoutName={workout.name}/></td>
                </tr>
            )
        })
        setWorkouts(workoutArr)
    },[workoutData, fetchData])

    return (
        <>
            <h1 className="text-center my-4">My Workouts</h1>
            <Table striped bordered hover responsive variant="dark">
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th colSpan="2">Actions</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {workouts}
                </tbody>
            </Table>

        </>
    )
}