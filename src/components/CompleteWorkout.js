import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export default function CompleteWorkout({workout, isCompleted, fetchData, workoutName}) {

    const [isPending, setIsPending] = useState(false);

    useEffect(()=> {
        if(isCompleted === 'completed'){
            setIsPending(true)
        }
        else{
            setIsPending(false)
        }
    },[fetchData, isCompleted])

    const completeWorkout = (workout) => {
        Swal.fire({
            title: `Complete this workout - ${workoutName}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if(result.isConfirmed){
                executeComplete(workout)
            }
        })
    }

    const executeComplete = async (workout) => {  
        try{
            const response = await fetch(`https://fitness-tracker-dcb1.onrender.com/workouts/completeWorkoutStatus/${workout}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await response.json();
            if(data.error === 'Workout not found'){
                Swal.fire({
                    title: 'Workout not found',
                    icon: 'error',
                    text: 'The Workout you are trying to complete could not be found'
                })
                fetchData();
            }
            else if(data.error === 'error in completing workout'){
                Swal.fire({
                    title: 'Something went wrong',
                    icon: 'error',
                    text: 'Please try again'
                })
                fetchData();
            }
            else if(data.message === 'Workout status updated successfully'){
                Swal.fire({
                    title: 'Workout has been completed',
                    icon: 'success'
                })
                fetchData();
            }
        }
        catch(err) {
            console.log('Error in completing workout: ', err)
            Swal.fire({
                title: 'Something went wrong',
                icon: 'error',
                text: 'Please try again'
            })
        }
    }

    return(
        <Button variant="success" size="sm" disabled={isPending ?  true : false} onClick={() => completeWorkout(workout)}>
            Mark as complete
        </Button>
    )
}