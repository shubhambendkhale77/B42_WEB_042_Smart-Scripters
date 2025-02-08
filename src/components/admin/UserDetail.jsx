import { useContext } from "react";
import { AuthContext } from "../../context/useAuth";

const UserDetail = () => {
const context = useContext(AuthContext)
  const { getAllUser } = context ;

  console.log("📢 getAllUser Data:", getAllUser); // Debugging

  return (
    <div>
      <div>
        <div className="py-5 flex justify-between items-center">
          <h1 className="text-xl text-pink-300 font-bold">All Users</h1>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
            <tbody>
              <tr>
                <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 bg-slate-100 font-bold">
                  S.No.
                </th>
                <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 bg-slate-100 font-bold">
                  Name
                </th>
                <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 bg-slate-100 font-bold">
                  Email
                </th>
                <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 bg-slate-100 font-bold">
                  UID
                </th>
                <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 bg-slate-100 font-bold">
                  Role
                </th>
                <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 bg-slate-100 font-bold">
                  Date
                </th>
              </tr>

              {getAllUser && getAllUser.length > 0 ? (
                getAllUser.map((value, index) => (
                  <tr key={index} className="text-pink-300">
                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100">
                      {index + 1}
                    </td>
                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100">
                      {value.firstName || "N/A"}
                    </td>
                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100">
                      {value.email || "N/A"}
                    </td>
                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100">
                      {value.uid || "N/A"}
                    </td>
                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100">
                      {value.role || "N/A"}
                    </td>
                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100">
                      {value.date || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-red-500 py-4">
                    🚫 No Users Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
