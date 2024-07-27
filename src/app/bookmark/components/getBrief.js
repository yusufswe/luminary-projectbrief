import { getProjectBriefWithDetailsById } from "../actionGetBrief";
import { Brief } from "./briefslist";


const GetBrief = async() => {
  const briefs = await getProjectBriefWithDetailsById();
  if (!briefs) {
    redirect("/");
  }

  return (
    <div className="w-full">
      <Brief Briefs={briefs}/>
    </div>
  );
}

export default GetBrief;