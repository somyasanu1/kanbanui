import { Badge, Grid, GridItem, Text } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import React from 'react';

const deleteTask = async ( index) =>{
  let res = await fetch(`https://sanukanbanbackend.herokuapp.com/api/task/del/${index}`,
  {
    method: 'DELETE',})
}

function TaskList({ status, taskList, onClick }) {
  return (
    <div>
      <Grid templateRows="repeat(5,3fr)" gap={3}>
        {taskList.map((task, index) => {
          if (task.status === status) {
            return (
              <GridItem
                key={index}
                bg={'white'}
                m={2}
                borderWidth="1px"
                onClick={() => { onClick(index)}}
              >
                <Text fontSize={'16px'} fontWeight="semibold" ml={"7px"} mb={3}>
                  {task.summary}
                </Text>
                <Text fontSize="14px" mx={"7px"} mb={3}>
                  {task.description}
                </Text>
                <Grid templateColumns="repeat(2,1fr)" gap={3}>
                  <GridItem textAlign={'left'} m={"7px"} >
                    <span fontSize="12px">{task.deadline}</span>
                  </GridItem>
                  <GridItem textAlign={'right'} m={2}>
                    <span fontSize="12px">
                      <Badge borderRadius="full" px="2" colorScheme={'gray'}>
                        {task.priority}
                      </Badge>
                      {task.priority === 'P1' ? (
                        <ChevronUpIcon color="red.500" />
                      ) : task.priority === 'P2' ? (
                        <ChevronUpIcon color="yellow.400" />
                      ) : task.priority === 'P3' ? (
                        <ChevronDownIcon color="yellow.400" />
                      ) : (
                        <ChevronDownIcon color="green.400" />
                      )}
                    </span>
                  </GridItem>
                </Grid>
              </GridItem>
            );
          }
        })}
      </Grid>
    </div>
  );
}

export default TaskList;
