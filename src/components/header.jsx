import LogoutButton from "./logout";
import { findUser } from "@/libs/findUser";

export const Header = async() => {
  var src
  const severAuth = await findUser();
  if (severAuth && severAuth.photoUrl) {
    src = `${process.env.R2_PUBLIC_URL}/brief-project-ai/${severAuth.id}/${severAuth.photoUrl}`
  }

  return (
    <div className="">
      <div className="navbar bg-base-100">
        <div className="flex-1 ">
          <a className="btn btn-ghost text-xl" href="/">Brief AI</a>
        </div>
        <div className="flex-none">
          {severAuth ? (
            <div>
              <ul className="menu menu-horizontal px-1">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/bookmark">Bookmark</a>
                </li>
              
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={src ? src : "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_1280.png"}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between" href="profile">
                      Profile {severAuth.name}
                    </a>
                  </li>
                  <LogoutButton />
                </ul>
              </div>
              </ul>
            </div>
          ) : (
            <ul className="menu menu-horizontal px-2">
              <li>
              <a href='/login'>Login</a>
              </li>
              <li>
              <a href='/register'>register</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>

  );
};
