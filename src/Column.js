import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';

const Container = styled.div`
    margin : 8px;
    border : 1px solid lightgrey;
    border-radius : 2px;
    background-color : white;
`;

const Title = styled.h3`
    padding : 8px;
`;

const TaskList = styled.div`
    padding : 8px;
`;


export default class Column extends React.Component {
    render() {
        return(
            <Draggable
                draggableId={ this.props.column.id }
                index={ this.props.index }
            >
                { ( provided ) => (
                    <Container
                        { ...provided.draggableProps } 
                        ref={ provided.innerRef }
                    > 
                        <Title
                            { ...provided.dragHandleProps } 
                        >
                            { this.props.title }
                        </Title>
                        <Droppable 
                            droppableId={ this.props.column.id }
                            type="task" 
                        >
                       { provided => (
                            <TaskList
                                ref={ provided.innerRef }
                                { ...provided.droppableProps }
                            >
                                { this.props.tasks.map( ( task, index ) => 
                                    <Task 
                                        key={ task.id } 
                                        task={ task } 
                                        index={ index }
                                    /> 
                                ) }
                                { provided.placeholder }
                            </TaskList>
                       ) }
                    </Droppable>
                </Container>
                ) }
            </Draggable>
        ) 
    }
}
