import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { DONATION_IN_CENTS, MAX_DONATION_IN_CENTS } from "../config";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const presets = [1, 3, 5];

  async function handleCheckout() {
    setError(null);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity,
        name,
        message,
      }),
    });
    const res = await response.json();

    if (res.ok) {
      setError(res.error);
      return;
    }
    const url = res.url;
    router.push(url);
  }

  return (
    <div className="flex max-w-2xl m-auto">
      <div className="flex-1">
        <h2>Previous donations</h2>
      </div>

      <div>
        <h1 className="font-bold text-xl p-3">But me a coffee</h1>
        <div className="flex items-center gap-2 py-3">
          <span>
            <Image src="/beer.svg" width="50" height="50" alt="beer" />
          </span>
          <span>X</span>
          {presets.map((preset) => (
            <button
              className="btn btn-primary m-1"
              key={preset}
              onClick={() => setQuantity(preset)}
            >
              {preset}
            </button>
          ))}
          <input
            type="number"
            onChange={(e) => setQuantity(parseFloat(e.target.value))}
            max={MAX_DONATION_IN_CENTS / DONATION_IN_CENTS}
            min={1}
            defaultValue={1}
            value={quantity}
            className="input input-bordered input-primary"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="name" className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <label htmlFor="message" className="label">
            <span className="label-text">Message</span>
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <button onClick={handleCheckout} className="btn btn-primary">
          Donate ${quantity}
        </button>
      </div>
    </div>
  );
}
