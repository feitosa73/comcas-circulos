import React, { useState } from "react";
import { DndContext, useDraggable, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";

function Pessoa({ id, text, position, onChangeName }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    position: "absolute",
    left: (transform ? position.x + transform.x : position.x) + "px",
    top: (transform ? position.y + transform.y : position.y) + "px",
    minWidth: 60,
    backgroundColor: "#4F46E5",
    color: "white",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "grab",
    userSelect: "none",
    padding: "4px 8px",
    whiteSpace: "nowrap",
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
          width: "100%",
        }}
      />
    </div>
  );
}

export default function CirculosRelacionamentos() {
  const [pessoas, setPessoas] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    setPessoas((prev) =>
      prev.map((p) =>
        p.id === active.id
          ? {
              ...p,
              position: {
                x: Math.min(Math.max(p.position.x + delta.x, 0), 720),
                y: Math.min(Math.max(p.position.y + delta.y, 0), 720),
              },
            }
          : p
      )
    );
  };

  const adicionarPessoa = () => {
    const nova = {
      id: `pessoa-${pessoas.length + 1}`,
      text: "",
      position: { x: 380, y: 380 },
    };
    setPessoas([...pessoas, nova]);
  };

  const handleChangeName = (id, newName) => {
    setPessoas((prev) =>
      prev.map((p) => (p.id === id ? { ...p, text: newName } : p))
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Círculo de Relacionamentos</h1>

      <div className="flex gap-2 mb-4">
        <button
          onClick={adicionarPessoa}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Adicionar Pessoa
        </button>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          🖨️ Imprimir
        </button>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="relative w-[800px] h-[800px] border rounded-full bg-white">
          <svg viewBox="-400 -400 800 800" className="absolute">
            <circle r="133" stroke="black" strokeWidth="2" fill="none" />
            <circle r="266" stroke="black" strokeWidth="2" fill="none" />
            <circle r="400" stroke="black" strokeWidth="2" fill="none" />

            <line x1="-400" y1="0" x2="400" y2="0" stroke="black" strokeWidth="2" />
            <line x1="0" y1="-400" x2="0" y2="400" stroke="black" strokeWidth="2" />

            <text x="-320" y="-320" textAnchor="middle" fontSize="16">Amizades</text>
            <text x="320" y="-320" textAnchor="middle" fontSize="16">Família</text>
            <text x="-320" y="320" textAnchor="middle" fontSize="14">Comunitárias</text>
            <text x="320" y="320" textAnchor="middle" fontSize="14">Trabalho</text>

            <text x="0" y="10" textAnchor="middle" fontSize="16" fontWeight="bold">Íntimos</text>
            <text x="0" y="-160" textAnchor="middle" fontSize="14">Intermediários</text>
            <text x="0" y="-280" textAnchor="middle" fontSize="14">Ocasional</text>
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
