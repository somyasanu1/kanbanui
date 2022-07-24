import { Box,
  Text,
   FormControl,
  FormHelperText,
  Textarea,
  FormLabel, 
  Input,
  Modal, 
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  Select,
  ModalCloseButton,
  ModalBody, 
  Grid,
  GridItem} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'



function CreateTask({editTask, createTask, onClose, task, fetchTasks}) {
  let [description, setDescription] = useState('')
  let [summary, setSummary] = useState('')
  let [priority, setPriority] = useState('P1')
  let [deadline, setDeadline] = useState(new Date().toISOString().split('T')[0])
  const [users, setUsers] = useState([])
  const [assignee, setAssignee] = useState("")
  const [status, setStatus] = useState("Not Started")
  const [errorMsg, setErrorMsg] = useState(null)

  const Priority = ["P1", "P2", "P3", "P4"]
  const Status = ["Not Started", "In Progress", "Completed"]

  const handleInputChange = (e) => {
    let inputValue = e.target.value
    setDescription(inputValue)
  }
  const handleSummaryChange = (e) => {
    let inputValue = e.target.value
    setSummary(inputValue)
  }
  const handleDateChange = (e) => {
    let inputValue = e.target.value
    setDeadline(inputValue)
  }
  const handlePriorityChange = (e) => {
    let inputValue = e.target.value
    setPriority(inputValue)
  }

  const handleAssigneeChange = (e) => {
    let inputValue = e.target.value
    setAssignee(inputValue)
  }

  const handleStatusChange = (e) => {
    let inputValue = e.target.value
    console.log(inputValue)
    setStatus(inputValue)
  }

  const isFormValid = (data) => {
    var error = null;
    if(data.description === undefined || data.description.length === 0 )
    {
      error ="Please Fill Description"
    }
    else if(!data.summary  || data.summary.length === 0 )
    {
      error ="Please Fill Title"
    }
    else if(!data.priority || data.priority.length === 0 )
    {
      error ="Please Choose priority"
    }
    else if(!data.assignee || data.assignee.length === 0 )
    {
      error ="Please Choose Assignee"
    }
    else{
      error =null;
    }
    return error;
  }

  const addTask = async () =>{
    let data = {
      description,
      summary,
      priority,
      deadline,
      status ,
      assignee 
    }
    let msg = isFormValid(data);
    if(msg === null){
    let res = await fetch("https://sanukanbanbackend.herokuapp.com/api/task/add",
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
  
      body: JSON.stringify(data)})
    res= await res.json()
    onClose();
    fetchTasks();
    }
    else{
      setErrorMsg(msg);
    }
}

const saveTask = async () =>{
  let data = {
    description,
    summary,
    priority,
    deadline,
    status ,
    assignee 
  }
  let msg = isFormValid(data);
  if(msg === null){
  let id = task.id;
  let res = await fetch(`https://sanukanbanbackend.herokuapp.com/api/task/${id}`,
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(data)})
  res= await res.json()
  onClose();
  fetchTasks();
  }else{
    setErrorMsg(msg);
  }
}

const onSave = () => {
  if(editTask)
  {
    saveTask();
  }
  else{
    addTask();
  }
  
}

const getAllUsers = async () =>{
  let res = await fetch("https://sanukanbanbackend.herokuapp.com/api_user/user/")
      res= await res.json()
      setUsers(res);
}

const editDetails = () =>{
  setAssignee(task.assignee);
  setDeadline(new Date(task.deadline).toISOString().split('T')[0]);
  setDescription(task.description);
  setPriority(task.priority);
  setStatus(task.status);
  setSummary(task.summary);
}

useEffect(() =>{
  getAllUsers();
  editTask && editDetails();
},[])

  return (    
          <Modal isOpen={createTask || editTask} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent >
              <ModalHeader ml={"7px"}>{createTask? "Add Task" : "Edit Task"}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
              <Grid templateColumns= {"60% 30%"} gap="41px">
                <GridItem>
                <FormControl isRequired height={"90%"}>
                <FormLabel fontWeight={"hairline"} >Description</FormLabel>
                <Textarea 
                  value={description}
                  onChange={handleInputChange}
                  placeholder='Enter Description'
                  height={"100%"}
                />
                </FormControl>
                </GridItem>
                <GridItem>
                <FormControl isRequired >
                  <FormLabel fontSize={"15px"} fontWeight={"hairline"} >Title</FormLabel>
                  <Input mb="12px" size="sm" isRequired type='text' value={summary} onChange= {handleSummaryChange}/>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize={"15px"} fontWeight={"hairline"} >Priority</FormLabel>
                  <Select mb="12px" size="sm" placeholder='Priority'  value={priority} onChange={handlePriorityChange}>
                    { Priority.map( item => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize={"15px"} fontWeight={"hairline"}>Deadline</FormLabel>
                  <Input mb="12px" size="sm" type='date' value={deadline} onChange= {handleDateChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontSize={"15px"} fontWeight={"hairline"} >Assignee</FormLabel>
                    <Select mb="12px" size="sm" placeholder='Assignee'  value={assignee} onChange= {handleAssigneeChange}>
                      { users.map( item => (
                        <option key={item.id} value={item.id}>{item.username}</option>
                      ))}
                    </Select>
                </FormControl>
                {editTask && <FormControl isRequired>
                    <FormLabel fontSize={"15px"} fontWeight={"hairline"} >Status</FormLabel>
                    <Select mb="12px" size="sm" placeholder='Status'  value={status} onChange= {handleStatusChange}>
                      { Status.map( item => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </Select>
                </FormControl>}
                  </GridItem>
                </Grid> 
              </ModalBody>
    
              <ModalFooter >
                  <Button variant='ghost' mr={3} onClick={() => onClose()}>
                  Close
                  </Button>
                  <Button colorScheme='blue' onClick={onSave}>Save</Button>
              </ModalFooter>
              {errorMsg!== null && <Text ml={"5"} mb="5" align={"left"} color={"red"}>{ errorMsg}</Text>}
            </ModalContent>
          </Modal>
      )
    }

export default CreateTask