"use client";

import React, { useState } from "react";
import styles from "./addLead.module.css";
import { useRouter } from "next/navigation";

const AddLead = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("New");
  const [emailError, setEmailError] = useState(""); // State for email validation error
  const router = useRouter();

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(""); // Clear error if valid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Name and email are required.");
      return;
    }

    if (emailError) {
      alert("Please fix errors before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, status }),
      });

      if (response.ok) {
        alert("Lead added successfully!");
        router.push("/"); // Redirect to home or lead list
      } else {
        alert("Failed to add lead.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.addLead}>
      <label className={styles.label}>Name</label>
      <input
        type="text"
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label className={styles.label}>Email</label>
      <input
        type="email"
        className={styles.input}
        value={email}
        onChange={handleEmailChange}
        required
      />
      {emailError && <p className={styles.error}>{emailError}</p>}

      <label className={styles.label}>Status</label>
      <select
        className={styles.input}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="New">New</option>
        <option value="Engaged">Engaged</option>
        <option value="Proposal Sent">Proposal Sent</option>
        <option value="Closed-Won">Closed-Won</option>
        <option value="Closed-Lost">Closed-Lost</option>
      </select>

      <button className={styles.addLeadBtn} onClick={handleSubmit} disabled={!!emailError}>
        Add Lead
      </button>
    </div>
  );
};

export default AddLead;
