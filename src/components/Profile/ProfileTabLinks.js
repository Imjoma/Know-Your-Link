const ProfileTabLinks = ({ meetings }) => {
  const extractedData = meetings.map((item, idx) => ({
    Subject: item.subject,
    Schedule: item.schedule,
    Guest: item.guest,
    Link: item.link,
  }));

  const tableHead = Object.keys(extractedData[0]);

  return (
    <div className="relative overflow-hidden overflow-x-auto rounded-lg">
      <table className="w-full text-sm text-left text-gray-400 ">
        <thead className="text-xs text-gray-400 uppercase">
          <tr>
            {tableHead.map((item, idx) => {
              const isOdd = idx % 2 === 0 && "bg-gray-800";
              return (
                <th key={idx} scope="col" className={`${isOdd} px-6 py-3 `}>
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {extractedData.map((item, idx) => (
            <tr key={idx} className="border-b border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-white bg-gray-800 "
              >
                <div className="w-48 truncate">{item.Subject}</div>
              </th>
              <td className="px-6 py-4">
                <div className="w-48 truncate">{item.Schedule}</div>
              </td>
              <td className="px-6 py-4 bg-gray-800">
                <div className="w-48 truncate">{item.Guest}</div>
              </td>
              <td className="px-6 py-4">
                <div className="w-48 truncate">{item.Link}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileTabLinks;
