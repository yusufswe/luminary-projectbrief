"use client";

import React from "react";

export const ProjectBrief = ({ nameApp, description, objective, keyFeatures, userStories }) => {
    return (
        <div>
            <div className="space-y-4">
              <div>
                <span className="font-bold mr-2">Name:</span>{" "}
                {nameApp}
              </div>
              <div>
                <p className="font-bold mr-2">Description:</p>{" "}
                <p className="indent-8">{description}</p>
              </div>
            </div>
            {objective && objective.length > 0 && (
                <div>
                  <span className="font-bold block mb-2">Objective:</span>
                  <ul className="list-disc pl-4">
                    {objective.map((item, index) => (
                      <li key={index}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            {keyFeatures && keyFeatures.length > 0 && (
                <div>
                  <span className="font-bold block mb-2">Key Features:</span>
                  <ul className="list-disc pl-4">
                    {keyFeatures.map((item, index) => (
                      <li key={index}>
                        {item.name}: {item.detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {userStories && userStories.length > 0 && (
                <div>
                  <span className="font-bold block mb-2">User Stories:</span>
                  <ul className="list-disc pl-4">
                    {userStories.map((item, index) => (
                      <li key={index}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              )}
        </div>
    );
}