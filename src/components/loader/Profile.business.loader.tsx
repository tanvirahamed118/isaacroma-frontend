function ProfileBusinessLoader() {
  return (
    <div className="animate-pulse w-full border border-gray-300 p-5 rounded-md">
      <div className="flex gap-5 items-start w-full">
        <div className="bg-slate-200 h-24 w-24 rounded-md"></div>
        <div className="w-full flex flex-col gap-3">
          <div className="bg-slate-200 h-4 w-96 rounded-md"></div>
          <div className="bg-slate-200 h-4 w-52 rounded-md"></div>
          <div className="bg-slate-200 h-8 w-10/12 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBusinessLoader;
