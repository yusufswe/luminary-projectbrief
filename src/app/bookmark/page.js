

import { getProjectBriefWithDetailsById } from "./actionGetBrief";
import { Brief } from "./components/briefslist";


const BookmarkPage = async () => {
  const briefs = await getProjectBriefWithDetailsById();

  return (
    <div className="w-full">
      <Brief Briefs={briefs}/>
    </div>
  );
}

export default BookmarkPage;
