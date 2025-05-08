
import React, { useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";

function Pessoa({ id, text, position, onChangeName }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    position: "absolute",
    left: (transform ? position.x + transform.x : position.x) + "px",
    top: (transform ? position.y + transform.y : position.y) + "px",
    width: 100,
    backgroundColor: "#4F46E5",
    color: "white",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "grab",
    userSelect: "none",
    padding: "5px",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <input
        type="text"
        value={text}
        onChange={(e) => onChangeName(id, e.target.value)}
        style={{
          backgroundColor: "transparent",
          color: "white",
          border: "none",
          outline: "none",
          textAlign: "center",
          width: "80px",
          userSelect: "text",
          cursor: "text"
        }}
      />
    </div>
  );
}

export default function CirculosRelacionamentos() {
  const [pessoas, setPessoas] = useState([
    { id: "pessoa-1", text: "Rose", position: { x: 250, y: 250 } },
    { id: "pessoa-2", text: "Daniel", position: { x: 300, y: 300 } },
  ]);

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    setPessoas((prev) =>
      prev.map((p) =>
        p.id === active.id
          ? {
              ...p,
              position: {
                x: Math.min(Math.max(p.position.x + delta.x, 0), 520),
                y: Math.min(Math.max(p.position.y + delta.y, 0), 520),
              },
            }
          : p
      )
    );
  };

  const adicionarPessoa = () => {
    const nova = {
      id: `pessoa-${pessoas.length + 1}`,
      text: "Nome",
      position: { x: 280, y: 280 },
    };
    setPessoas([...pessoas, nova]);
  };

  const handleChangeName = (id, newName) => {
    setPessoas((prev) =>
      prev.map((p) => (p.id === id ? { ...p, text: newName } : p))
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Círculo de Relacionamentos</h1>

      <button
        onClick={adicionarPessoa}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Adicionar Pessoa
      </button>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="relative w-[600px] h-[600px] border rounded-full bg-gray-100">
          <svg viewBox="-300 -300 600 600" className="absolute">
            <circle r="100" stroke="black" strokeWidth="2" fill="red" fillOpacity="0.2" />
            <circle r="200" stroke="black" strokeWidth="2" fill="orange" fillOpacity="0.2" />
            <circle r="300" stroke="black" strokeWidth="2" fill="yellow" fillOpacity="0.2" />

            <line x1="-300" y1="0" x2="300" y2="0" stroke="black" strokeWidth="2" />
            <line x1="0" y1="-300" x2="0" y2="300" stroke="black" strokeWidth="2" />

            <text x="-250" y="-250" textAnchor="middle" fontSize="16">Amizades</text>
            <text x="250" y="-250" textAnchor="middle" fontSize="16">Família</text>
            <text x="-250" y="250" textAnchor="middle" fontSize="14">Comunitárias</text>
            <text x="250" y="250" textAnchor="middle" fontSize="14">Trabalho</text>

            <text x="0" y="10" textAnchor="middle" fontSize="16" fontWeight="bold">Íntimos</text>
            <text x="0" y="-120" textAnchor="middle" fontSize="14">Intermediários</text>
            <text x="0" y="-220" textAnchor="middle" fontSize="14">Ocasional</text>
          </svg>

          {pessoas.map((p) => (
            <Pessoa
              key={p.id}
              id={p.id}
              text={p.text}
              position={p.position}
              onChangeName={handleChangeName}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
