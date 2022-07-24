import { Box, Button, Grid, GridItem, Text, Toast, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import CreateTask from '../components/CreateTask'
import TaskList from '../components/TaskList'

function Dashboard() {
    const [createTask, setCreateTask] = useState(false)
    const [editTask, setEditTask] = useState(false)
    const [tasksList, setTasksList] = useState([])
    const [task, setTask] = useState({})
    
    const [count, setCount] = useState({"Not Started": 0, "In Progress": 0, "Completed": 0})
    const status = ["Not Started", "In Progress", "Completed"]
    const toast = useToast()
   
    const fetchTasks = async () =>{
        var count1 =0 , count2 =0 ,count3 =0
        let res = await fetch("https://sanukanbanbackend.herokuapp.com/api/tasks/")
        res= await res.json()
        for(const task in res){
            if(res[task].status ==="Not Started") count1++;
            else if(res[task].status === "In Progress") count2++;
            else count3++;
        }
        const counts = {"Not Started": count1, "In Progress": count2, "Completed": count3}
        setCount(counts)
        setTasksList(res)
    }


    const closeModal = () => {
        setCreateTask(false);
        setEditTask(false);
        toast({
          title: 'Task saved successfully',
          description: "We've created your task for you.",
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
    }
    const onEdit = (i) => {
        setEditTask(!editTask);
        setTask(tasksList[i])
    }

    useEffect(() => {
        fetchTasks()
    },[])

  return (
    <div>
    {(editTask || createTask) && 
    < CreateTask createTask={createTask} editTask= {editTask}
     onClose={closeModal} task={editTask && task}
     fetchTasks= {fetchTasks} 
     />}
    <Box mx={20} my={10} >
        <Text  mt={10} fontSize= "5xl">
            Kanban Board
        </Text>
        <Text  fontSize= "3xl">
            Somya Sanu's Tasks
        </Text>
        <Box
            display='flex'
            width='100%'
            py={12}
            mb={2}
        >
            <Button onClick={()=> setCreateTask(!createTask)} colorScheme='blue' >Create</Button>
        </Box>
        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            { status.map( (item, index) => 
                <div key={index}>
                    {`${item}(${count[item]})`}
                <GridItem  bgColor={"#EEEEEE"} w='100%'  borderWidth='1px'>
                    <TaskList key={index} status = {item} 
                    taskList ={tasksList} onClick={onEdit}  
                    />
                </GridItem>
                </div>
            )}
        </Grid>
    </Box>
    </div>
  )
}

export default Dashboard