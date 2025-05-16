import React, { useEffect } from "react";
import "./Statistics.css";
import CountUp from "react-countup";

const Statistics = () => {
  useEffect(() => {
    // Initialize CountUp scrollSpy
    if (typeof CountUp.startAll === 'function') {
      CountUp.startAll();
    }
  }, []);

  return (
    <section className="statistics-section">
      <div className="statistics">
        <div className="statistics-heading">
          <h2>Our Impact in Numbers</h2>
          <p>Discover how we're transforming education worldwide</p>
        </div>
        <div className="wrapper-statistics">
          <div className="container-statistics">
            <div className="icon-container">
              <i className="bi bi-people-fill icon-stats"></i>
            </div>
            <span className="num">
              <CountUp
                start={0}
                end={1150000}
                duration={2.5}
                separator=","
                enableScrollSpy
                scrollSpyDelay={200}
                useEasing={true}
                decimals={0}
              />+
            </span>
            <span className="text">Total Users</span>
          </div>
          <div className="container-statistics">
            <div className="icon-container">
              <i className="bi bi-person-video3 icon-stats"></i>
            </div>
            <span className="num">
              <CountUp
                start={0}
                end={90}
                duration={2}
                enableScrollSpy
                scrollSpyDelay={200}
                useEasing={true}
                decimals={0}
              />+
            </span>
            <span className="text">Expert Mentors</span>
          </div>
          <div className="container-statistics">
            <div className="icon-container">
              <i className="bi bi-book icon-stats"></i>
            </div>
            <span className="num">
              <CountUp
                start={0}
                end={150000}
                duration={2.5}
                separator=","
                enableScrollSpy
                scrollSpyDelay={200}
                useEasing={true}
                decimals={0}
              />+
            </span>
            <span className="text">Active Students</span>
          </div>
          <div className="container-statistics">
            <div className="icon-container">
              <i className="bi bi-star-fill icon-stats"></i>
            </div>
            <span className="num">
              <CountUp
                start={0}
                end={36548}
                duration={2.5}
                separator=","
                enableScrollSpy
                scrollSpyDelay={200}
                useEasing={true}
                decimals={0}
              />
            </span>
            <span className="text">Five-Star Reviews</span>
          </div>
        </div>
        <div className="decoration-dots">
          <span className="dot dot-1"></span>
          <span className="dot dot-2"></span>
          <span className="dot dot-3"></span>
          <span className="dot dot-4"></span>
          <span className="dot dot-5"></span>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
