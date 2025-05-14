function CategoryListLoader() {
  return (
    <div className="animate-pulse w-full border border-gray-300 p-5 rounded-md bg-white">
      <div className="flex gap-5 items-center justify-between w-full">
        <div className="flex gap-5 items-center w-6/12">
          <div className="bg-slate-200 h-8 w-8 rounded-full"></div>
          <div className="flex flex-col gap-2">
            <div className="bg-slate-200 h-4 w-32 rounded-md"></div>
            <div className="bg-slate-200 h-4 w-24 rounded-md"></div>
          </div>
        </div>
        <div className="w-6/12 flex gap-3 justify-end">
          <div className="bg-slate-200 h-8 w-16 rounded-md"></div>
          <div className="bg-slate-200 h-8 w-16 rounded-md"></div>
          <div className="bg-slate-200 h-8 w-10 rounded-md"></div>
          <div className="bg-slate-200 h-8 w-10 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

export default CategoryListLoader;
