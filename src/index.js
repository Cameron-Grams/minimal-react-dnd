import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import data from './data.js';
import Column from './Column';

class App extends React.Component {
    state = data;

    onDragEnd = result => {
        const { destination, source, draggableId, type } = result;

        if ( !destination ) {
            return;
        } 

        if (
            destination.droppableId === source.droppableId && 
            destination.index === source.index
        ) {
            return;
        }

        if ( type === 'column' ) {
            const newColumnOrder = Array.from( this.state.columnOrder );
            newColumnOrder.splice( source.index, 1 );
            newColumnOrder.splice( destination.index, 0, draggableId );
            const newState = {
                ...this.state,
                columnOrder : newColumnOrder
            }
            this.setState( newState );
            return;
        }

        const column = this.state.columns[ source.droppableId ];
        const newTaskIds = Array.from( column.taskIds );
        newTaskIds.splice( source.index, 1 );
        newTaskIds.splice( destination.index, 0, draggableId );

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        }

        const newState = {
            ...this.state,
            columns : {
                ...this.state.columns,
                [ newColumn.id ] : newColumn
            }
        };

// this is the point to call the endpoint and alert to a change in order
        this.setState( {
            ...newState
        } );


    };


    render() {
        const indexStyle = {
            display : "flex",
            flexDirection : "row"
        }
        return(
           <DragDropContext
               onDragEnd={ this.onDragEnd }
           >
               <Droppable
                   droppableId="allColumns" 
                   direction="horizontal"
                   type="column"
               >
                   { ( provided ) => (
                       <div
                           style={ indexStyle }
                           { ...provided.droppableProps }
                           ref={ provided.innerRef }
                       >
                           { this.state.columnOrder.map( ( columnId, index ) => {
                            const column = this.state.columns[ columnId ];
                            const tasks = column.taskIds.map( taskId => {
                                return this.state.tasks[ taskId ]
                            } );
                            return(
                                    <Column 
                                        key={ column.id } 
                                        index={ index }
                                        column={ column }
                                        title={ column.title }
                                        tasks={ tasks } 
                                    /> 
                            
                            );
                            } )  
                            }
                       { provided.placeholder }
                   </div>
                   ) }    
              </Droppable>
            </DragDropContext>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
