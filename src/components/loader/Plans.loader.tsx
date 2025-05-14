function PlansLoader() {
  return (
    <div className="animate-pulse bg-white border border-[#c7c6f9] rounded-2xl p-10 flex flex-col gap-8">
      <div className="bg-slate-200 h-10 w-full rounded-md"></div>
      <span className="flex flex-col gap-1">
        <div className="bg-slate-200 h-6 w-full rounded-md"></div>
        <div className="bg-slate-200 h-6 w-full rounded-md"></div>
      </span>
      <div className="flex gap-5 items-center">
        <div className="bg-slate-200 h-14 w-full rounded-md"></div>
        <div className="bg-slate-200 h-14 w-full rounded-md"></div>
      </div>
      <div className="bg-slate-200 h-8 w-full rounded-md"></div>
      <div>
        <div className="bg-slate-200 h-8 w-full rounded-md"></div>
        <div className="flex flex-col gap-5 mt-5">
          <span className="flex gap-2 items-center">
            <div className="bg-slate-200 h-4 w-full rounded-md"></div>
          </span>
          <span className="flex gap-2 items-center">
            <div className="bg-slate-200 h-4 w-full rounded-md"></div>
          </span>
          <span className="flex gap-2 items-center">
            <div className="bg-slate-200 h-4 w-full rounded-md"></div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlansLoader;
