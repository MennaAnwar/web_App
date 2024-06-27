import React, { DragEvent } from "react";

const Nodes: React.FC = () => {
  // Define the type of nodeType as string to ensure type safety
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div>
        <h5>Instructions:</h5>
        <ul>
          <li>Double click node to change its name.</li>
          <li>
            Click node and press delete from keyboard to delete node or
            connection.
          </li>
        </ul>
      </div>
      <div className="description">
        You can drag these nodes to the panel on the right.
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div>
    </aside>
  );
};

export default Nodes;
