
import React, { useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";

function Pessoa({ id, text, position, onChangeName }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    position: "absolute",
    left: (transform ? position.x + transform.x : position.x) + "px",
    top: (transform ? position.y + transform.y : position.y) + "px",
    backgroundColor: "#4F46E5",
    color: "white",
    borderRadius: "8px",
    cursor: "grab",
    padding: "4px",
    userSelect: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <input
        type="text"
        value={text}
        onChange={(e) => onChangeName(id, e.target.value)}
        style={{ background: "transparent", color: "white", border: "none", outline: "none", width: "80px", textAlign: "center" }}
      />
    </div>
  );
}

export default function CirculosRelacionamentos() {
  const [pessoas, setPessoas] = useState([
    { id: "pessoa-1", text: "Daniel", position: { x: 250, y: 250 } },
  ]);

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    setPessoas((prev) =>
      prev.map((p) =>
        p.id === active.id ? { ...p, position: { x: p.position.x + delta.x, y: p.position.y + delta.y } } : p
      )
    );
  };

  const adicionarPessoa = () => {
    const nova = { id: `pessoa-${pessoas.length + 1}`, text: "Nome", position: { x: 250, y: 250 } };
    setPessoas([...pessoas, nova]);
  };

  const handlePrint = () => window.print();

  const handleChangeName = (id, newName) => {
    setPessoas((prev) => prev.map((p) => (p.id === id ? { ...p, text: newName } : p)));
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Círculo de Relacionamentos</h1>
      <button onClick={adicionarPessoa}>+ Adicionar Pessoa</button>
      <button onClick={handlePrint} style={{ marginLeft: "20px" }}>Imprimir</button>

      <DndContext onDragEnd={handleDragEnd}>
        <div style={{ position: "relative", width: "700px", height: "700px", margin: "2rem auto", backgroundColor: "white" }}>
          <svg viewBox="-350 -350 700 700" style={{ position: "absolute" }}>
            <circle r="100" stroke="black" strokeWidth="2" fill="orange" fillOpacity="0.3" />
            <circle r="200" stroke="black" strokeWidth="2" fill="gold" fillOpacity="0.3" />
            <circle r="300" stroke="black" strokeWidth="2" fill="khaki" fillOpacity="0.3" />
            <line x1="-350" y1="0" x2="350" y2="0" stroke="black" strokeWidth="2" />
            <line x1="0" y1="-350" x2="0" y2="350" stroke="black" strokeWidth="2" />
            <text x="-280" y="-280">Amizades</text>
            <text x="280" y="-280">Família</text>
            <text x="-280" y="300">Comunitárias</text>
            <text x="280" y="300">Trabalho</text>
            <text x="0" y="0" fontWeight="bold">Íntimos</text>
            <text x="0" y="-120">Intermediários</text>
            <text x="0" y="-220">Ocasional</text>
          </svg>
          {pessoas.map((p) => (
            <Pessoa key={p.id} id={p.id} text={p.text} position={p.position} onChangeName={handleChangeName} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
