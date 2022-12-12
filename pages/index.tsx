import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { DONATION_IN_CENTS, MAX_DONATION_IN_CENTS } from "../config";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const presets = [1, 3, 5];
  return (
    <div className="h-screen">
      <h1>Buy me coffee</h1>
      {presets.map((preset) => (
        <button key={preset} onClick={() => setQuantity(preset)}>
          {preset}
        </button>
      ))}
      <input
        type="number"
        onChange={(e) => setQuantity(parseFloat(e.target.value))}
        max={MAX_DONATION_IN_CENTS / DONATION_IN_CENTS}
        min={1}
        defaultValue={1}
      />
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
            
          onChange={(e) => setName(e.target.name)} /> 
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(message)}
        />
      </div>
      <button></button>
    </div>
  );
}
