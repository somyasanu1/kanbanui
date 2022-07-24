import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function Task() {
  const [taskDetail ,setTaskDetail] = useState([]);

  const fetchTask = async () =>{
    let res = await fetch("https://sanukanbanbackend.herokuapp.com/api/task/4")
    res= await res.json();
    setTaskDetail(res)
}

  useEffect(() => {
    fetchTask();
  }, [])
  console.log(taskDetail);
  return (
    <Box m={2} display={'flex'} borderWidth={2} bg= "gray.100">
        <Box width={"50%"}>
        <Text size={"2xl"}>Summary </Text>
        <Text m={3}>
          {taskDetail.summary}
        </Text>
        <Text size={"2xl"}> Description </Text>
        <Text m={4}>
          {taskDetail.description}
        </Text>
        </Box>
        <Box width={"50%"}>
        <Text size={"2xl"}>Priority </Text>
        <Text m={3}>
          {taskDetail.priority}
        </Text>
        <Text size={"2xl"}>Status </Text>
        <Text m={4}>
          {taskDetail.status}
        </Text>
        </Box>
    </Box>
  )
}

export default Task