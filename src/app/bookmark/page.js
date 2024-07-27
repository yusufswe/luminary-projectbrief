"use client";

import { getProjectBriefWithDetailsById } from "./actionGetBrief";
import { useState, useEffect } from "react";
import { ProjectBrief } from "@/components/projectBrief";
import { deleteProjectBrief } from "./actionDeleteBrief";

export default function BorkmarkPage() {
  const [projectBriefs, setProjectBriefs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
      const list = await getProjectBriefWithDetailsById();
      console.log(list);
      setProjectBriefs(list);
      } catch (error) {
        console.error("Error fetching project briefs:", error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (brief_id) => {
    try {
      const new_id = await deleteProjectBrief(brief_id);
      if (new_id) {
        const list = projectBriefs.filter((projectBrief) => projectBrief.brief_id !== new_id);
        setProjectBriefs(list);
      }
    } catch (error) {
      console.error("Error fetching project briefs:", error);
    }
  }
 
  return (
    <main className="w-full">
      <div className="max-w-3xl bg-red-40 mx-auto pt-24 pb-6 lg:mt-52">
        
        {projectBriefs && projectBriefs.length > 0 && (
          <div>
            {projectBriefs.map((projectBrief) => (
              <div key={projectBrief.brief_id} className="mx-6">
                <ProjectBrief
                  nameApp={projectBrief.name}
                  description={projectBrief.description}
                  objective={projectBrief.objective}
                  keyFeatures={projectBrief.features}
                  userStories={projectBrief.userStories}
                />
                <div className="flex flex-row justify-end gap-4 w-full py-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded flex-grow-0"
                  
                >
                  Copy
                </button>
      
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded flex-grow-0"
                
              >
                Save
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded flex-grow-0"
                onClick={() => handleDelete(projectBrief.brief_id)}
              >
                Delete
              </button>
            </div>
              </div>
            ))}
          </div>
        )}
        {!projectBriefs && (
          <p className="text-center">No project briefs Saved</p>
        )}
      </div>
    </main>
  );
}
