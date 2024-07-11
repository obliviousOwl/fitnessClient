import { Button } from "react-bootstrap";
import Swal from "sweetalert2";


export default function DeleteWorkout({workout, workoutName}) {

    const deleteWorkout = (workout) =>{
        Swal.fire({
            title: `You are about to delete this workout - ${workoutName}`,
            text: "Are you sure you want to proceed?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if(result.isConfirmed){
                executeDelete(workout)
            }
        })
    }

    const executeDelete = async (workout) => {
        try{
            const response = await fetch(`https://fitness-tracker-dcb1.onrender.com/workouts/deleteWorkout/${workout}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await response.json();
            if(data.error === 'Workout not found'){
                Swal.fire({
                    title: 'Workout not found',
                    icon: 'error',
                    text: 'The Workout you are trying to delete could not be found'
                })
            }
            else if(data.error === 'error in deleting workout'){
                Swal.fire({
                    title: 'Something went wrong',
                    icon: 'error',
                    text: 'Please try again'
                })
            }
            else if(data.message === 'Workout deleted successfully'){
                Swal.fire({
                    title: 'Workout has been deleted',
                    icon: 'success'
                })
            }
        }
        catch(err) {
            console.log('Error in deleting workout: ', err)
            Swal.fire({
                title: 'Something went wrong',
                icon: 'error',
                text: 'Please try again'
            })
        }

    }

    return(
        <Button variant="danger" size="sm" onClick={() => deleteWorkout(workout)}>
            Delete
        </Button>
    )
}