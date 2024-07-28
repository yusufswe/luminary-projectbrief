import { Brief } from "./_components/briefs";
import { getProjectBriefs } from "./actionGetBriefs";

export default async function BookmarkPage() {
    const briefs = await getProjectBriefs();

    return (
        <div className="w-full">
            <Brief Briefs={briefs} />
        </div>
    );
}