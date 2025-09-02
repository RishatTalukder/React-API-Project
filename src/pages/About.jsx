// About.jsx
import React, { memo } from "react";
import noice from '../noice.png';
const About = () => {
  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        {/* Top Image Section */}
        <div className="text-center mb-3">
          <img
            src={noice}
            className="img-fluid rounded-circle"
            style={{ width: "300px", height: "300px", objectFit: "cover" }}
            alt="Profile"
          />
        </div>

        {/* Name Section */}
        <h2 className="text-center fw-bold mb-4">
          Md Rishat Talukder <br />
          <small className="text-muted">
            AKA ITVAYA (<span className="text-danger">The Bug Creator</span>)
          </small>
        </h2>

        {/* Intro Section */}
        <p className="lead text-center">
          Hi, I’m <strong>The Bug Creator</strong>… oh wait, I mean Programmer.  
        </p>

        {/* Daily Life Section */}
        <div className="mt-4">
          <h3>📅 My Daily Life</h3>
          <ul className="list-group">
            <li className="list-group-item">☕ Wake up, open laptop</li>
            <li className="list-group-item">💻 Code... break things</li>
            <li className="list-group-item">🔧 Google how to fix things I broke</li>
            <li className="list-group-item">🍕 Forget to eat until VS Code crashes</li>
            <li className="list-group-item">
              😴 Sleep? Ops... <em>I’m a programmer, I don’t have a life</em>
            </li>
          </ul>
        </div>

        {/* Meme Section */}
        <div className="mt-4">
          <h3>😂 Fun Facts</h3>
          <div className="alert alert-primary" role="alert">
            I write <strong>“temporary”</strong> code that survives in production forever.
          </div>
          <div className="alert alert-primary" role="alert">
            If life gives you <i>lemonade</i>, make a <strong>Lemon</strong>, Life will like <b>'WHAAAT?!!'</b> 
          </div>
          <div className="alert alert-danger" role="alert">
            Relationship status: <em>Clearly I should be married But single by choice</em>.
          </div>
          <div className="alert alert-danger" role="alert">
            Job status: <em>Clearly I'm should be unemployed But still I'm unemployed by choice </em>.
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-4">
          <button className="btn btn-dark">
            🚀 Hire me (this page is totally not made with AI)
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(About);
