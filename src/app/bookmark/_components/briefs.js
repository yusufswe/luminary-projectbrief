"use client";

import { useState } from "react";
import { ProjectBrief } from "@/components/projectBrief";
import { CopyButton } from "@/components/copyButton";
import { deleteProjectBrief } from "../actionDeleteBrief";

export const Brief = ({ Briefs }) => {
  const [projectBriefs, setProjectBriefs] = useState(Briefs);

  const handleDelete = async (brief_id) => {
    try {
      console.log(projectBriefs);
      const new_id = await deleteProjectBrief(brief_id);
      const list = projectBriefs.filter(
        (projectBrief) => projectBrief.brief_id !== new_id
      );
      setProjectBriefs(list);
      console.log("Project brief deleted successfully");
      console.log(projectBriefs);
    } catch (error) {
      console.error("Error fetching project briefs:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-6 lg:mt-10">
      {projectBriefs && projectBriefs.length > 0 ? (
        <div>
          {projectBriefs.map((projectBrief, index) => (
            <div key={projectBrief.brief_id} className="mx-6">
              <ProjectBrief
                nameApp={projectBrief.name}
                description={projectBrief.description}
                objective={projectBrief.objective}
                keyFeatures={projectBrief.features}
                userStories={projectBrief.userStories}
              />
              <div className="flex flex-row justify-end gap-4 w-full py-4">
                <CopyButton
                  nameApp={projectBrief.name}
                  description={projectBrief.description}
                  objective={projectBrief.objective}
                  keyFeatures={projectBrief.features}
                  userStories={projectBrief.userStories}
                />
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
      ) : (
        <p className="text-center">No project briefs Saved</p>
      )}
    </div>
  );
};
