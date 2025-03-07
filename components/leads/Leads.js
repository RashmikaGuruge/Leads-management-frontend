"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Leads.module.css";

const Home = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/leads");
        if (response.ok) {
          const data = await response.json();
          setLeads(data);
        } else {
          console.error("Failed to fetch leads");
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lead Management</h1>
      <Link href="/addLead" className={styles.addLeadBtn}>Add New Lead</Link>

      <table className={styles.leadTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {leads.length > 0 ? (
            leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.status}</td>
                <td>{new Date(lead.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No leads found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
